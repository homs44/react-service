import firebase from 'firebase'
import uuid from 'uuid';

const INIT_ADD_MOVIE_STATE = 'INIT_ADD_MOVIE_STATE'

export const initAddMovieState = () => {
    return {
        type: INIT_ADD_MOVIE_STATE
    }
}


const ADD_MOVIE_VALIDATION_FAILED = 'ADD_MOVIE_VALIDATION_FAILED';

export const addMovieValidationFailed = (error) => {
    return {
        type: ADD_MOVIE_VALIDATION_FAILED,
        payload: error,
    }
}

const ADD_MOVIE_REQUEST = 'ADD_MOVIE_REQUEST';
const ADD_MOVIE_SUCCESS = 'ADD_MOVIE_SUCCESS';
const ADD_MOVIE_FAILED = 'ADD_MOVIE_FAILED';

function addMovieRequest() {
    return {
        type: ADD_MOVIE_REQUEST,
    }
}
function addMovieSuccess() {
    return {
        type: ADD_MOVIE_SUCCESS,
    }
}
function addMovieFailed(error) {
    return {
        type: ADD_MOVIE_FAILED,
        payload: error
    }
}

export function addMovie(name, director, openedAt, description, file) {
    return (dispatch, getState) => {
        dispatch(addMovieRequest());

        // 이미지는 이미지 스토어에 저장하고

        // 데이터는 데이터베이스에 저장해요 

        // images/filename.jpg

        // 게시글의 소유주를 등록하기 위해서
        // 사용자 Id 가져오는 방법
        // 첫번 째 방법 firebase.auth().currentUser
        // const userId = firebase.auth().currentUser.uid;
        // 두번 째 방법 redux-state에서 userId를 가져오는 방법
        const userId = getState().auth.user.uid

        if (file) {
            // 이미지 저장하고 이미지 다운로드 URL 가지고와서
            // 데이터베이스에 같이 저장
            const filename = uuid.v1();
            const extension = file.name.split('.').pop();
            const url = `movies/${filename}.${extension}`;
            const movieRef = firebase.storage().ref().child(url);
            movieRef.put(file)
                .then((snapshot) => {
                    return snapshot.ref.getDownloadURL();
                })
                .then((downloadURL) => {
                    return firebase.firestore().collection('movies').add({
                        name: name,
                        imageURL: downloadURL,
                        userId: userId,
                        director: director,
                        openedAt: openedAt,
                        description: description,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    })
                })
                .then(() => {
                    dispatch(addMovieSuccess());
                })
                .catch((error) => {
                    dispatch(addMovieFailed(error));
                })

        } else {
            firebase.firestore().collection('movies').add({
                name: name,
                director: director,
                openedAt: openedAt,
                description: description,
                createdAt: new Date(),
                updatedAt: new Date(),
            }).then(() => {
                dispatch(addMovieSuccess());
            }).catch((error) => {
                dispatch(addMovieFailed(error));
            })
        }


    }
}



const initialState = {
    error: null,
    isLoading: false,
    isSuccess: false,
    isFailed: false
}

export default function addMovieReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_MOVIE_VALIDATION_FAILED:
            return Object.assign({}, state, {
                error: action.payload
            })
        case ADD_MOVIE_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                isSuccess: false,
                isFailed: false,
                error: null,
            })
        case ADD_MOVIE_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: true,
                isFailed: false,
            })
        case ADD_MOVIE_FAILED:
            const error = action.payload
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: false,
                isFailed: true,
                error: error,
            })
        case INIT_ADD_MOVIE_STATE:
            return Object.assign({}, initialState);
        default:
            return state;

    }
}