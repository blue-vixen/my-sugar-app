import { storageService } from "./storage.service";
import { makeId } from "./util.service";
import { gDefaultRecords } from './records'

export const recordService = {
    query,
    save,
    remove,
    getById,
    getEmptyRecord
}

const STORAGE_KEY = 'records'



var gRecords = _loadRecords()

function query(filterBy) {
    let recordsToReturn = gRecords
    if (filterBy) {
        let { type } = filterBy
        recordsToReturn = gRecords.filter(record => record.type.includes(type))
    }
    return Promise.resolve([...recordsToReturn])
}

function getById(id) {
    const record = gRecords.find(record => record.id === id)
    return Promise.resolve({ ...record })
}

function remove(id) {
    const idx = gRecords.findIndex(record => record.id === id)
    gRecords.splice(idx, 1)
    if (!gRecords.length) gRecords = gDefaultRecords.slice()
    storageService.store(STORAGE_KEY, gRecords)
    return Promise.resolve()
}

function save(recordToSave) {
    if (recordToSave.id) {
        const idx = gRecords.findIndex(record => record.id === recordToSave.id)
        gRecords.splice(idx, 1, recordToSave)
    } else {
        recordToSave.id = makeId()
        gRecords.push(recordToSave)
    }
    storageService.store(STORAGE_KEY, gRecords)
    return Promise.resolve(recordToSave)
}

function getEmptyRecord() {
    return {
        level: 0,
        type: '',
        measuredAt: new Date().toLocaleString()
    }
}


function _loadRecords() {
    let records = storageService.load(STORAGE_KEY)
    if (!records || !records.length) records = gDefaultRecords
    storageService.store(STORAGE_KEY, records)
    return records
}