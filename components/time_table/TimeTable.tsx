import React from "react";
import { TimeTableProps } from "../../types/TimeEvent";
import dynamic from "next/dynamic";
const TimeRow = dynamic(() => import("./TimeRow"), { ssr: false });

const TimeTable: React.FC<TimeTableProps> = ({ events }: TimeTableProps) => {
    return (
        <table className="table-auto w-full">
            <thead>
                <tr>
                    <th className="w-1/5">Date</th>
                    <th className="w-1/5">Start Time</th>
                    <th className="w-1/5">End Time</th>
                    <th className="w-2/5">Description</th>
                </tr>
            </thead>
            <tbody>
                {events && events.length > 0 ? events.map(event => <TimeRow {...event} />) : null}
            </tbody>
        </table>
    );
}

export default TimeTable;