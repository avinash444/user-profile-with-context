import React from 'react';

const UserPostsList = ({ postData }) => {
    return (
                <div className='card-block font_12 border-bottom-sm'>
                    <h2>{postData.title}</h2>
                    <p>{postData.body}</p>
                </div>
    )
}

export default UserPostsList;