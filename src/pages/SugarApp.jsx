import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadRecords, setFilterBy } from '../store/actions/recordActions'
import { RecordList } from "../cmps/RecordList";
import { RecordFilter } from "../cmps/RecordFilter";

export const SugarApp = (props) => {
    const { records } = useSelector(state => state.recordModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadRecords())
    }, [])

    const onChangeFilter = useCallback(
        (filterBy) => {
            dispatch(setFilterBy(filterBy))
            dispatch(loadRecords())
        },
        [],
    )

    if (!records) return <div>Loading...</div>
    return (
        <div className='sugar-app'>
            <RecordFilter onChangeFilter={onChangeFilter} />
            <Link to='/record/edit'>Add a new record</Link>
            <RecordList records={records} />
        </div>
    )
}