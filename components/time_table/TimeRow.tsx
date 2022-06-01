import React from "react";
import { TimeEvent } from "../../types/TimeEvent";

const TimeRow: React.FC<TimeEvent> = ({ date, start, end, description }: TimeEvent) => {
    const parseDate = (date: Date) => {
        const d = new Date(date);
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const year = d.getFullYear();
        return `${month}/${day}/${year}`;
    }

    return (
        <tr>
            <td>{parseDate(date)}</td>
            <td>{start}</td>
            <td>{end}</td>
            <td>{description}</td>
        </tr>
    );
}

export default TimeRow;