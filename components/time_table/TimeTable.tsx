import React from "react";
import { TimeTableProps } from "../../types/TimeEvent";
import dynamic from "next/dynamic";
const TimeRow = dynamic(() => import("./TimeRow"), { ssr: false });

const ONE_DAY_MS = 1000 * 86400;

const compareDates = (d1: Date, d2: string) => {
    if(!d2)
        return true;
    let a: Date = new Date(d1)
    let b: Date = new Date(new Date(d2).getTime() + ONE_DAY_MS);
    
    if(a.getMonth() === b.getMonth() && a.getDate() === b.getDate() && a.getFullYear() === b.getFullYear())
        return true;
    return false;
}

const TimeTable: React.FC<TimeTableProps> = ({ events, filter }: TimeTableProps) => {
    const filteredEvents = filter ? events.filter(event => compareDates(event.date, filter.date)) : events;

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
                {events && events.length > 0 ? filteredEvents.map(event => <TimeRow {...event} />) : null}
            </tbody>
        </table>
    );
}

export default TimeTable;