import React from 'react'
import { useForm } from '../hooks/useForm'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const RecordFilter = (props) => {

    const [filterBy, handleChange] = useForm({
        type: ''
    }, props.onChangeFilter)

    const { type } = filterBy
    return (
        <div>
            <form className='record-filter'>
                <section className='input-container'>
                    <FormControl fullWidth>
                        <InputLabel id='type'>Filter By Type:</InputLabel>
                        <Select labelId='type' id='type' value={type} label='Filter By Type:' onChange={handleChange} name='type'>
                            <MenuItem value=''>All</MenuItem>
                            <MenuItem value='fasting'>Fasting</MenuItem>
                            <MenuItem value='before meal'>Before Meal</MenuItem>
                            <MenuItem value='after meal'>After Meal</MenuItem>
                        </Select>
                    </FormControl>
                    {/* <label htmlFor="timespan">Show records from:</label>
                    <select name="timespan" id="timespan">
                        <option value="day">The Last Day</option>
                        <option value="week">The Last Week</option>
                        <option value="month">The Last Month</option>
                    </select> */}
                </section>
            </form>
        </div>
    )
}
