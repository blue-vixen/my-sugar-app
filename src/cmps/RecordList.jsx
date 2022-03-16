import { RecordPreview } from "./RecordPreview";

export function RecordList({ records, removeRecord }) {
    return (
        <section className="record-list">
            {records.map(record =>
                <RecordPreview record={record} key={record.id} removeRecord={removeRecord} />
            )}
        </section>
    )
}