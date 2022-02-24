import { Link } from "react-router-dom"

export function RecordPreview({ record, removeRecord }) {

    const displayTime = (time) => {
        return new Date(time).toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
        })
    }

    function onRemoveRecord(ev) {
        ev.stopPropagation()
        removeRecord(record.id)
    }

    return (
        <article className="record-preview">
            <section className="info">
                <h2>{record.type} glucose level: {record.level}</h2>
                <h2> measured at: {displayTime(record.measuredAt)}</h2>
            </section>
            <section className="actions">
                <Link to={`/record/edit/${record.id}`}>Edit Record</Link>
                <button onClick={onRemoveRecord}>X</button>
            </section>
        </article>
    )
}