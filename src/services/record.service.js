import { storageService } from "./storage.service";
import { makeId } from "./util.service";

export const recordService = {
    query,
    save,
    remove,
    getById,
    getEmptyRecord
}

const STORAGE_KEY = 'records'

const gDefaultRecords = [
    { _id: 'r1', time: 1608439067, type: 'fasting', level: 96 },
    { _id: 'r2', time: 1608445007, type: 'before meal', level: 108 },
    { _id: 'r3', time: 1608448607, type: 'after meal', level: 103 },
    { _id: 'r4', time: 1608462000, type: 'before meal', level: 87 },
    { _id: 'r5', time: 1608465600, type: 'after meal', level: 108 },
    { _id: 'r6', time: 1608487200, type: 'before meal', level: 88 },
    { _id: 'r7', time: 1608490800, type: 'after meal', level: 105 },
]

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
    const record = gRecords.find(record => record._id === id)
    return Promise.resolve({ ...record })
}

function remove(id) {
    const idx = gRecords.findIndex(record => record._id === id)
    gRecords.splice(idx, 1)
    if (!gRecords.length) gRecords = gDefaultRecords.slice()
    storageService.store(STORAGE_KEY, gRecords)
    return Promise.resolve()
}

function save(recordToSave) {
    if (recordToSave._id) {
        const idx = gRecords.findIndex(record => record._id === recordToSave._id)
        gRecords.splice(idx, 1, recordToSave)
    } else {
        recordToSave._id = makeId()
        recordToSave.time = Date.now()
        gRecords.push(recordToSave)
    }
    storageService.store(STORAGE_KEY, gRecords)
    return Promise.resolve(recordToSave)
}

function getEmptyRecord() {
    return {
        level: 0,
        type: '',
    }
}


function _loadRecords() {
    let records = storageService.load(STORAGE_KEY)
    if (!records || !records.length) records = gDefaultRecords
    storageService.store(STORAGE_KEY, records)
    return records
}