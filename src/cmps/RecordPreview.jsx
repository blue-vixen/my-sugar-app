import { Link } from "react-router-dom"

export function RecordPreview({ record }) {

    const displayTime = (time) => {
        return new Date(time).toLocaleString('en-US', {
            hour12: false,
        })
    }

    function onRemoveRecord(ev) {
        ev.stopPropogation()
        console.log('remove')
    }

    return (
        <article className="record-preview">
            <section className="info">
                <h2>{record.type} glucose level: {record.level}</h2>
                <h2> measured at: {displayTime(record.time)}</h2>
            </section>
            <section className="actions">
                <Link to={`/record/edit/${record._id}`}>Edit Record</Link>
                <button onClick={onRemoveRecord}>X</button>
            </section>
        </article>
    )
}