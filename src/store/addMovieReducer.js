import firebase from 'firebase'

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

export function addMovie(name, director, openedAt, description) {
    return (dispatch) => {
        dispatch(addMovieRequest());

        firebase.firestore().collection('movies').add({
            name: name,
            director: director,
            openedAt: openedAt,
            description: description,
        }).then(() => {
            dispatch(addMovieSuccess());
        }).catch((error) => {
            dispatch(addMovieFailed(error));
        })

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