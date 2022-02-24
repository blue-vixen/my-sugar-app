import React from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DateTimePicker } from '@mui/lab';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveRecord } from '../store/actions/recordActions';
import { recordService } from '../services/record.service'



export const RecordEdit = (props) => {
    const [record, setRecord] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            try {
                console.log('here')
                const recordId = props.match.params.id
                const record = recordId ? await recordService.getById(recordId) : recordService.getEmptyRecord()
                setRecord({ ...record })
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])

    const onSaveRecord = async (ev) => {
        ev.preventDefault()
        dispatch(saveRecord({ ...record }))
        props.history.push('/')
    }

    const handleChange = event => {
        const { value, name } = event.target
        setRecord({ ...record, [name]: value })
    }


    if (!record) return <div>Loading...</div>
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className='record-edit'>
                <h1>{record.id ? 'Edit' : 'Add'} Record:</h1>
                <form onSubmit={onSaveRecord}>
                    <FormControl fullWidth>
                        <InputLabel id='type'>type</InputLabel>
                        <Select labelId='type' id='type' value={record.type} label='Type' onChange={handleChange} name='type'>
                            <MenuItem value='fasting'>Fasting</MenuItem>
                            <MenuItem value='before meal'>Before Meal</MenuItem>
                            <MenuItem value='after meal'>After Meal</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField id='level' name='level' label='Glucose Level' variant='outlined' onChange={handleChange} value={record.level} type='number' />
                    </FormControl>
                    <DateTimePicker
                        renderInput={(props) => <TextField fullWidth {...props} />}
                        label='Measured at:'
                        value={record.measuredAt}
                        onChange={handleChange}
                    />
                    <Button variant='contained' type='submit'>Save</Button>

                </form>
            </div >
        </LocalizationProvider>
    )
}
