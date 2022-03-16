import { recordService } from "../../services/record.service";
import { firestore } from '../../firebase/firebase.utils'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'

export function loadRecords(currentUser) {
    return async (dispatch, getState) => {
        const { filterBy } = getState().recordModule
        try {
            let q
            if (filterBy && filterBy.type !== '') {
                q = query(collection(firestore, 'records'), where('userId', '==', 'm9LX6uP8dKN9P4pKQnReNDeBAH43'), where('type', '==', filterBy.type), orderBy('measuredAt'))
            } else {
                q = query(collection(firestore, 'records'), where('userId', '==', 'm9LX6uP8dKN9P4pKQnReNDeBAH43'), orderBy('measuredAt'))
            }
            const querySnapshot = await getDocs(q)
            const records = querySnapshot.docs.map(doc => {
                const { level, type, userId, measuredAt } = doc.data();
                return {
                    id: doc.id,
                    level: +level,
                    type,
                    userId,
                    measuredAt
                }
            })
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

export function saveRecord(record, userId) {
    record.measuredAt = new Date(record.measuredAt).getTime()
    console.log(record)
    return async (dispatch) => {
        try {
            let savedRecord = await recordService.save(record, userId)
            if (record.id) {
                dispatch({ type: 'UPDATE_RECORD', savedRecord })
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