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

export function setFilterBy(filterBy) {
    return async (dispatch) => {
        dispatch({ type: 'SET_FILTER_BY', filterBy })
    }
}