import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { RecordList } from "../cmps/RecordList";
import { RecordFilter } from "../cmps/RecordFilter";
import { loadRecords, setFilterBy, removeRecord } from '../store/actions/recordActions'

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
        }, [])

    const onRemoveRecord = (recordId) => {
        dispatch(removeRecord(recordId))
    }



    if (!records) return <div>Loading...</div>
    return (
        <div className='sugar-app'>
            <RecordFilter onChangeFilter={onChangeFilter} />
            <Link to='/record/edit'>Add a new record</Link>
            <RecordList records={records} removeRecord={onRemoveRecord} />
        </div>
    )
}