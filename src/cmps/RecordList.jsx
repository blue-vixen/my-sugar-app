import { RecordPreview } from "./RecordPreview";

export function RecordList({ records }) {
    return (
        <section className="record-list  simple-cards-grid">
            {records.map(record =>
                <RecordPreview record={record} key={record._id} />
            )}
        </section>
    )
}