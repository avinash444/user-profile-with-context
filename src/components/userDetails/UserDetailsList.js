import React from 'react';

const UserDetailsList = ({ data }) => {
    return (
        <div className='card-container'>
            <div className='card-block'>
                <h2>Conatact Info</h2>
                <div className='font_12'>
                    <label>Username: </label>
                    <span>{data.username}</span>
                </div>
                <div className='font_12'>
                    <label>Email: </label>
                    <span className='cornflowerblue'>{data.email}</span>
                </div>
                <div className='font_12'>
                    <label>Phone: </label>
                    <span className='cornflowerblue'>{data.phone}</span>
                </div>
                <div className='font_12'>
                    <label>Website: </label>
                    <span className='cornflowerblue'>{data.website}</span>
                </div>
            </div>
            <div className='card-block'>
                <h2>Address</h2>
                <div>
                    <div className='font_12'>{data.address.suite}</div>
                    <div className='font_12'>{data.address.street}</div>
                    <div className='font_12'>{data.address.city}</div>
                    <div className='font_12'>{data.address.zipCode}</div>
                </div>
            </div>
            <div className='card-block'>
                <h2>Company</h2>
                <div>
                    <div className='font_12'>{data.company.name}</div>
                    <div className='font_12'>{data.company.bs}</div>
                    <div className='font_12'>{data.company.catchPhrase}</div>
                </div>
            </div>
        </div>
    )
}

export default UserDetailsList;