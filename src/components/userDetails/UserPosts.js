import React, { useEffect } from 'react';
import {useDetails, fetchUserPosts } from "../../context/UserDetails.Context";
import UserPostsList from "./UserPostsList";
const UserPosts = ({ match }) => {
    const [{ postsData, postsStatus, postsError,userName}, dispatch] = useDetails();
    useEffect(() => {
        const { id } = match.params;
        fetchUserPosts(dispatch, id)
    },[])

    const renderPosts = () => {
        if (postsStatus === null || postsStatus === 'PENDING') {
            return <div>Please wait we are fetching data for you</div>
        }
        if (postsStatus === 'REJECTED') {
            return <div>`Oops Something Went Wrong ${postsError}`</div>
        }
        if (postsStatus === 'FULFILLED') {
            const data = postsData.map((post) => <UserPostsList id={post.id} postData={post} />)
            return (
                <>
                    <h1 className='user-title'>{`Posts by ${userName}`}</h1>
                    <div className='card-container'>
                        {data}
                    </div>
                </>
            )
        }
    }

    return (
        <div className='list-container'>
            {renderPosts()}
        </div>
    )
}
export default UserPosts;