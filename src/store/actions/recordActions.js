import { recordService } from "../../services/record.service";

export function loadRecords() {
    return async (dispatch, getState) => {
        const { filterBy } = getState().recordModule
        try {
            const records = await recordService.query(filterBy)
            dispatch({ type: 'SET_RECORDS', records })
        } catch (err) {
            console.log(err)
        }
    }
}

export function removeRecord(recordId) {
    return async (dispatch) => {
        try {
            await recordService.remove(recordId)
            dispatch({ type: 'REMOVE_RECORD', recordId })
        } catch (err) {
            console.log(err);
        }
    }
}
export function getRecordById(recordId) {
    return async () => {
        return await recordService.getById(recordId)
    }
}

export function saveRecord(record) {
    return async (dispatch) => {
        try {
            let savedRecord = await recordService.save(record)
            if (record.id) {
                dispatch({ type: 'UPDATED_RECORD', savedRecord })
            } else {
                dispatch({ type: 'ADD_RECORD', savedRecord })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export function setFilterBy(filterBy) {
    return async (dispatch) => {
        dispatch({ type: 'SET_FILTER_BY', filterBy })
    }
}