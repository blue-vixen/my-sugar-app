import React from 'react'
import { useForm } from '../hooks/useForm'

export const RecordFilter = (props) => {

    const [filterBy, handleChange] = useForm({
        type: ''
    }, props.onChangeFilter)

    const { type } = filterBy
    return (
        <div>
            <form className='record-filter'>
                <section className='input-container'>
                    <label htmlFor="type">Filter by type:
                        <select name="type" id="type" onChange={handleChange} value={type}>
                            <option value="">All</option>
                            <option value="fasting">Fasting</option>
                            <option value="before meal">Before Meal</option>
                            <option value="after meal">After Meal</option>
                        </select>
                    </label>
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
