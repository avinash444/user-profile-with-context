import React from 'react';

const DataList = ({ list, index }) => {
    return (
        <div className={`list-item-container ${((index + 1) % 2) === 0 ? 'even': 'odd'}`}>
            <div className='img-circle'/>
            <div className='list-item-name font_14 ml_60_sm'>
                <div>{list.username}</div>
                <div>{list.name}</div>
            </div>
            <div className='font_14 cornflowerblue ml_60_sm'>{list.email}</div>
        </div>
    )
}

export default DataList;