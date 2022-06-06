import { ObjectId } from "mongodb";

export type TimeEvent = {
    _id?: ObjectId;
    owner: string;
    start: string;
    end: string;
    description: string;
    date: Date;
}

export type TimeTableProps = {
    events: TimeEvent[];
    filter?: TimeEventFilter;
}

export type TimeEventFilter = {
    date: string;
}