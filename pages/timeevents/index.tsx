import { NextPage } from "next";
import TimeTable from "../../components/time_table/TimeTable";
import { TimeEvent, TimeTableProps } from "../../types/TimeEvent";

const TimeEvents: NextPage = () => {

    const t1: TimeEvent = {
        owner: "test",
        date: new Date(),
        start: "12:00",
        end: "13:00",
        description: "Worked on the project"
    }

    const events: TimeEvent[] = [t1];

    const rprops: TimeTableProps = {
        events: events
    }

    return (
        <div className="w-4/6 text-center">
            <h1 className="font-bold">Your Time Events</h1>
            <TimeTable  {...rprops}/>
        </div>
    );
}

export default TimeEvents;