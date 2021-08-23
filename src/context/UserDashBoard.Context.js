import * as React from "react";
import axios from 'axios';
import { sortData } from '../components/utils';
import * as actions from "../components/actions";
const UserDashBoardContext = React.createContext();
UserDashBoardContext.displayName = 'UserDashBoardContext';

const BASE_URL = 'http://jsonplaceholder.typicode.com';
const userReducer = (state, action) => {
    switch (action.type) {
        case actions.USER_DATA_PENDING: {
            return {
                ...state,
                status: 'PENDING',
            }
        }
        case actions.USER_DATA_FULFILLED: {
            const { payload = {}} = action;
            const { data = []} = payload;
            return {
                ...state,
                status: 'FULFILLED',
                userData: sortData(data, state.sortBy),
                allData: data,
            }
        }
        case actions.USER_DATA_REJECTED: {
            const { payload = {}} = action;
            const { errorMessage } = payload;
            return {
                ...state,
                status: 'REJECTED',
                error: errorMessage
            }
        }
        case actions.SEARCH_BY_TEXT: {
            const { payload = {}} = action;
            const { searchText } = payload;
            const text = searchText.trim().toLowerCase();
            return {
                ...state,
                userData: state.allData.filter((data) => data.name.toLowerCase().indexOf(text) !== -1 || data.username.toLowerCase().indexOf(text) !== -1  || data.email.toLowerCase().indexOf(text) !== -1 )
            }
        }
        case actions.SORT_BY_VALUE: {
            const { payload = {}} = action;
            const { sortVal } = payload;
            return {
                ...state,
                userData: sortData(state.userData, sortVal),
                sortBy: sortVal
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}
const UserDashBoardProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(userReducer, {
        status: null,
        error: null,
        userData: [],
        allData: [],
        sortBy: 'name'
    })

    const value = [state, dispatch] ;
    return <UserDashBoardContext.Provider value={value}>{children}</UserDashBoardContext.Provider>
}

const useDashboard = () => {
    const context = React.useContext(UserDashBoardContext);
    if (context === undefined) {
        throw new Error('userdashboard must be used within userdashboard provider');
    }
    return context;
}

const fetchUserDashBoard = async (dispatch) => {
    try {
        dispatch({type: actions.USER_DATA_PENDING});
        const userData = await axios.get(`${BASE_URL}/users`)
        dispatch({ type: actions.USER_DATA_FULFILLED, payload: userData})
    }catch (e) {
        dispatch({ type: actions.USER_DATA_REJECTED, payload: {errorMessage: 'sorry failed to fetch user details'}})
    }
}

export  {
    fetchUserDashBoard,
    UserDashBoardProvider,
    useDashboard,
}

