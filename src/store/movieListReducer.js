import firebase from 'firebase';

const GET_MOVIE_LIST_REQUEST = 'GET_MOVIE_LIST_REQUEST';
const GET_MOVIE_LIST_SUCCESS = 'GET_MOVIE_LIST_SUCCESS';
const GET_MOVIE_LIST_FAILED = 'GET_MOVIE_LIST_FAILED';

function getMovieListRequest() {
    return {
        type: GET_MOVIE_LIST_REQUEST
    }
}
function getMovieListSuccess(list) {
    return {
        type: GET_MOVIE_LIST_SUCCESS,
        payload: list
    }
}
function getMovieListFailed(error) {
    return {
        type: GET_MOVIE_LIST_FAILED,
        payload: error
    }
}

export function getMovieList() {
    return (dispatch) => {
        dispatch(getMovieListRequest());
        firebase.firestore().collection('movies')
            .limit(10)
            .get()
            .then((snapshot) => {
                dispatch(getMovieListSuccess(snapshot.docs));
            }).catch((error) => {
                dispatch(getMovieListFailed(error));
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

export default function movieListReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MOVIE_LIST_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                isSuccess: false,
                isFailed: false,
            })
        case GET_MOVIE_LIST_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: true,
                isFailed: false,
                list: [...action.payload]
            })
        case GET_MOVIE_LIST_FAILED:
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