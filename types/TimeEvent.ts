import { ObjectId } from "mongodb";

export type TimeEvent = {
    _id?: ObjectId;
    owner: string;
    start: string;
    end: string;
    description: string;
    date: Date;
}