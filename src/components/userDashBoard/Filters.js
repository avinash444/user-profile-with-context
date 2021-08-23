import React, { useState, useCallback } from 'react';
import _debounce from 'lodash.debounce';
const Filters = ({ onSearchValue, onSortByValue }) => {
    const options = [{ label: 'Name', value: 'name'}, { label: 'UserName', value:'username'}, { label: 'Email', value:'email'}]
    const [searchInput, onInputChange] = useState('');
    const [selectInput,onSelectChange] = useState('name');
    const handleInputChange = (e) => {
        const { value } = e.target;
        console.log('value', e.target);
        onInputChange(value);

        debounceHandleChange(value)
    }
    const handleSelectChange = (e) => {
        const { value } = e.target;
        onSelectChange(value);
        onSortByValue(value);
    }
    const debounceHandleChange = useCallback( _debounce((nextvalue) => onSearchValue(nextvalue), 300), [])
    return (
        <div className='filter-container'>
            <div className='mb_4 font_14'>
                <div>Search</div>
                <input
                    type='text'
                    placeholder='search...'
                    onChange={handleInputChange}
                    value={searchInput}
                    className='p_5'
                />
            </div>
            <div className='mb_4 font_14'>
                <div>SortBy</div>
                <select value={selectInput} onChange={handleSelectChange} className='p_5'>
                    { options.map(({value, label}) => <option key={value} value={value}>{label}</option>)}
                </select>
            </div>
        </div>
    )
}

export default Filters