import { Link } from "react-router-dom"

export function RecordPreview({ record, removeRecord }) {

    const displayTime = (time) => {
        return new Date(time).toLocaleString('en-GB', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
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
                <section className="data-display">
                    <h2>{displayTime(record.measuredAt)}</h2>
                    <h2>{record.type}</h2>
                </section>
            </section>
            <section className="level-display">
                <h2 className={`level ${record.level > 100 ? 'red' : 'green'}`}>{record.level}</h2>
                <h3>mg/dL</h3>
            </section>
            <section className="actions">
                <Link to={`/record/edit/${record.id}`}>Edit Record</Link>
                <button onClick={onRemoveRecord}>X</button>
            </section>
        </article>
    )
}