import React from "react";
import { TimeEvent, TimeTableProps } from "../../types/TimeEvent";
import TimeRow from "./TimeRow";

const TimeTable: React.FC<TimeTableProps> = ({ events }: TimeTableProps) => {
    return (
        <table className="table-auto w-full">
            <tr>
                <th className="w-1/4">Date</th>
                <th className="w-1/4">Start Time</th>
                <th className="w-1/4">End Time</th>
                <th className="w-1/2">Description</th>
            </tr>
            {events.length > 0 ? events.map(event => <TimeRow {...event} />) : null}
        </table>
    );
}

export default TimeTable;