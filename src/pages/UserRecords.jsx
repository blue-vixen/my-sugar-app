import React from 'react'
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { RecordList } from "../cmps/RecordList";
import { RecordFilter } from "../cmps/RecordFilter";
import { loadRecords, setFilterBy, removeRecord } from '../store/actions/recordActions'

export function UserRecords(props) {
    const { currentUser } = useSelector(state => state.userModule)
    const { records } = useSelector(state => state.recordModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadRecords(currentUser))
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
        <div>
            <RecordFilter onChangeFilter={onChangeFilter} />
            <Link to='/record/edit'><span className="material-icons add-btn">
                add
            </span></Link>
            <RecordList records={records} removeRecord={onRemoveRecord} />
        </div>
    )
}
