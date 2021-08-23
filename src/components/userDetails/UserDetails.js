import React, { useEffect } from 'react';
import { useDetails, fetchUserDetails, fetchUserPosts } from "../../context/UserDetails.Context";
import UserDetailsList from './UserDetailsList';

const UserDetails = ({ match, history }) => {
    const [{ status, userDetails, error, postsData, postsStatus}, dispatch] = useDetails();
    useEffect(() => {
        const { id } = match.params;
        fetchUserDetails(dispatch, id)
        fetchUserPosts(dispatch, id)
    },[])
    const renderData = () => {
        if (status === null || status === 'PENDING') {
            return <div>Please wait we are fetching data for you</div>
        }
        if (status === 'REJECTED') {
            return <div>`Oops Something Went Wrong ${error}`</div>
        }
        if (status === 'FULFILLED') {
            return (
                <>
                    <div className='mb_4 font_16 nav-bar'>
                        <div className='pointer cornflowerblue' onClick={() => { history.push('/')}}>Users</div>
                        <div> > </div>
                        <div>{userDetails.name}</div>
                    </div>
                    <UserDetailsList data={userDetails}/>
                </>

            )
        }
    }

    return (
        <div className='list-container'>
            {renderData()}
        </div>

    )
}

export default UserDetails;