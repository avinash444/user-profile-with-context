import React, {useEffect} from 'react';
import { Link } from 'react-router-dom'
import { useDashboard, fetchUserDashBoard } from "../../context/UserDashBoard.Context";
import DataList from "./DataList";
import Filters from './Filters';
import * as actions from '../actions';
const UserDashBoard = () => {
    const [{ status, error, userData}, dispatch] = useDashboard();
    useEffect(() => {
        fetchUserDashBoard(dispatch)
    }, [])

    const handleSearchValue = (value) => {
        dispatch({ type: actions.SEARCH_BY_TEXT, payload: { searchText: value }});
    }
    const onSortByValue = (value) => {
        dispatch({ type: actions.SORT_BY_VALUE, payload: { sortVal: value }});
    }
    const renderData = () => {
        if(status === null || status === 'PENDING') {
            return <div>Please wait we are fetching data for you</div>
        }
        if(status === 'REJECTED') {
            return <div>`Oops Something Went Wrong ${error}`</div>
        }
        if(status === 'FULFILLED') {
            const data =  userData.map((data,index) => {
                return (
                    <Link to={`/user-details/${data.id}`}>
                        <DataList list={data} key={data.id} index={index} />
                    </Link>
                )
            })
            return (
                <>
                    <Filters onSearchValue={handleSearchValue} onSortByValue={onSortByValue}/>
                    {data}
                </>
            )
        }
    }
    return (
        <div className='list-container pointer'>
            {renderData()}
        </div>
    )
}
export default UserDashBoard;