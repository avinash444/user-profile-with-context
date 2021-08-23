import * as React from "react";
import axios from 'axios';
import * as actions from '../components/actions';
const UserDetailsContext = React.createContext();
UserDetailsContext.displayName = 'UserDetailsContext';

const BASE_URL = 'http://jsonplaceholder.typicode.com';

const userDetailsPostsReducer = (state, action) => {
    switch (action.type) {
        case actions.DETAILS_PENDING: {
            return {
                ...state,
                status: 'PENDING',
            }
        }
        case actions.DETAILS_FULFILLED: {
            const { payload = {}} = action;
            const { data = []} = payload;
            return {
                ...state,
                status: 'FULFILLED',
                userDetails: data,
                userName: data.name
            }
        }
        case actions.DETAILS_REJECTED: {
            const { payload = {}} = action;
            const { errorMessage } = payload;
            return {
                ...state,
                status: 'REJECTED',
                error: errorMessage
            }
        }
        case actions.USER_POSTS_PENDING: {
            return {
                ...state,
                postsStatus: 'PENDING',
            }
        }
        case actions.USER_POSTS_FULFILLED: {
            const { payload = {}} = action;
            const { data = []} = payload;
            return {
                ...state,
                postsStatus: 'FULFILLED',
                postsData: data,
            }
        }
        case actions.USER_POSTS_REJECTED: {
            const { payload = {}} = action;
            const { errorMessage } = payload;
            return {
                ...state,
                postsStatus: 'REJECTED',
                postsError: errorMessage
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}
const UserDetailsProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(userDetailsPostsReducer, {
        status: null,
        error: null,
        userDetails: {},
        postsError: null,
        postsData: [],
        postsStatus: null,
        userName: null,
    })

    const value = [state, dispatch] ;
    return <UserDetailsContext.Provider value={value}>{children}</UserDetailsContext.Provider>
}

const useDetails = () => {
    const context = React.useContext(UserDetailsContext);
    if (context === undefined) {
        throw new Error('userDetails must be used within userdashboard provider');
    }
    return context;
}

const fetchUserDetails = async (dispatch, id) => {
    try {
        dispatch({type: actions.DETAILS_PENDING});
        const userDetails = await axios.get(`${BASE_URL}/users/${id}`)
        dispatch({ type: actions.DETAILS_FULFILLED, payload: userDetails})
    }catch (e) {
        dispatch({ type: actions.DETAILS_REJECTED, payload: { errorMessage: 'sorry could not fetch user-details'}})
    }
}
const fetchUserPosts = async (dispatch, id) => {
    try {
        dispatch({ type: actions.USER_POSTS_PENDING});
        const userPosts = await axios.get(`${BASE_URL}/posts`, { params: { userId: id}});
        dispatch({ type: actions.USER_POSTS_FULFILLED, payload: userPosts})
    } catch (e) {
        dispatch({ type: actions.USER_POSTS_REJECTED, payload: { errorMessage: 'sorry could not fetch user-posts'}})
    }
}
export  {
    fetchUserDetails,
    UserDetailsProvider,
    fetchUserPosts,
    useDetails,
}

