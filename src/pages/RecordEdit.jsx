import React from 'react'
import { useEffect } from 'react'
import { useForm } from '../hooks/useForm'
import { recordService } from '../services/record.service'



export const RecordEdit = (props) => {
    const [record, handleChange, setRecord] = useForm(null)

    useEffect(() => {
        (async () => {
            try {
                const recordId = props.match.params.id
                const record = recordId ? await recordService.getById(recordId) : recordService.getEmptyRecord()
                setRecord(record)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])

    const onSaveRecord = async (ev) => {
        ev.preventDefault()
        await recordService.save({ ...record })
        props.history.push('/')
    }

    if (!record) return <div>Loading...</div>
    return (
        <div className='record-edit'>
            <h1>{record._id ? 'Edit' : 'Add'} Record:</h1>
            <form onSubmit={onSaveRecord}>
                <label htmlFor="type">Type:
                    <select onChange={handleChange} value={record.type} name="type" id="type">
                        <option value="fasting">Fasting</option>
                        <option value="before meal">Before Meal</option>
                        <option value="after meal">After Meal</option>
                    </select>
                </label>
                <label htmlFor='level'>Glucose Level:
                    <input type="number" name='level' id='level' onChange={handleChange} value={record.level} />
                </label>
                <button>Save</button>
            </form>

        </div>
    )
}
