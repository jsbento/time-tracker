import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { TimeEvent, TimeTableProps } from "../../types/TimeEvent";
import dynamic from "next/dynamic";
const TimeTable = dynamic(() => import("../../components/time_table/TimeTable"), {ssr: false});

const TimeEvents: NextPage = () => {
    const [data, setData] = React.useState<TimeEvent[]>([]);

    const fetchData = async () => {
        const username = window.sessionStorage.getItem('user');
        return await fetch(`/api/timeevents/find?username=${username}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err));
    }
    
    React.useEffect(() => {
        fetchData().then(data => setData(data));
        console.log(data);
        
    }, []);

    return (
        <div className="w-4/6 text-center">
            <h1 className="font-bold text-lg p-2">Your Time Events</h1>
            <div>
                <p>Filter</p>
                <button onClick={() => window.location.href='/timeevents/create'}>Add Event</button>
            </div>
            <TimeTable  events={data}/>
        </div>
    );
}

export default TimeEvents;