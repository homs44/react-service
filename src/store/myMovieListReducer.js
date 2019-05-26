import firebase from 'firebase';

const GET_MY_MOVIE_LIST_REQUEST = 'GET_MY_MOVIE_LIST_REQUEST';
const GET_MY_MOVIE_LIST_SUCCESS = 'GET_MY_MOVIE_LIST_SUCCESS';
const GET_MY_MOVIE_LIST_FAILED = 'GET_MY_MOVIE_LIST_FAILED';

function getMyMovieListRequest() {
    return {
        type: GET_MY_MOVIE_LIST_REQUEST
    }
}
function getMyMovieListSuccess(list, last) {
    return {
        type: GET_MY_MOVIE_LIST_SUCCESS,
        payload: {
            list: list,
            last: last,
        }
    }
}
function getMyMovieListFailed(error) {
    return {
        type: GET_MY_MOVIE_LIST_FAILED,
        payload: error
    }
}

export function getMyMovieList(last) {
    return (dispatch, getState) => {
        dispatch(getMyMovieListRequest());
        let query = null;

        const userId = getState().auth.user.uid;
        // 현재 로그인한 유저 정보 가지고 와서
        // 해당 유저가 등록한 영화 목록만 가져오기

        if (last) {
            query = firebase.firestore().collection('movies')
                .where('userId', '==', userId)
                .orderBy('createdAt')
                .startAfter(last)
                .limit(20)
        } else {
            query = firebase.firestore().collection('movies')
                .where('userId', '==', userId)
                .orderBy('createdAt')
                .limit(20)
        }

        query.get()
            .then((snapshot) => {
                dispatch(getMyMovieListSuccess(snapshot.docs, last));
            }).catch((error) => {
                console.log(error);
                dispatch(getMyMovieListFailed(error));
            })
    }
}

const initialState = {
    list: [],
    isLoading: false,
    isSuccess: false,
    isFailed: false,
    error: null
}

export default function myMovieListReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MY_MOVIE_LIST_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                isSuccess: false,
                isFailed: false,
            })
        case GET_MY_MOVIE_LIST_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: true,
                isFailed: false,
                list: action.payload.last ? [...state.list, ...action.payload.list] : [...action.payload.list]
            })
        case GET_MY_MOVIE_LIST_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: false,
                isFailed: true,
                error: action.payload
            })

        default:
            return state;
    }
}