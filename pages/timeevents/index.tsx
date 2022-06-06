import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { TimeEvent, TimeTableProps } from "../../types/TimeEvent";
import dynamic from "next/dynamic";
const TimeTable = dynamic(() => import("../../components/time_table/TimeTable"), {ssr: false});

const TimeEvents: NextPage = () => {
    const [data, setData] = React.useState<TimeEvent[]>([]);
    const [dateFilter, setDateFilter] = React.useState<string>('');

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
        
    }, []);

    return (
        <div className="w-4/6 text-center">
            <h1 className="font-bold text-lg p-2">Your Time Events</h1>
            <div className="p-2 flex justify-between">
                <div className="flex flex-row">
                    Filter by date:
                    <img className="w-7 ml-2" src="/calendar.png" alt="Calendar"/>
                    <input id="date_filter" className="pl-2 border rounded"
                        onFocus={() => {(document.getElementById('date_filter') as HTMLInputElement).type="date"}}
                        onBlur={() => {(document.getElementById('date_filter') as HTMLInputElement).type="text"}}
                        onChange={e => {setDateFilter(e.target.value);}}
                    />
                </div>
                <button className="border rounded p-1" onClick={() => window.location.href='/timeevents/create'}>Add Event</button>
            </div>
            <TimeTable  events={data} filter={{date: dateFilter}}/>
        </div>
    );
}

export default TimeEvents;