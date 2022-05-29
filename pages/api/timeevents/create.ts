import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { TimeEvent } from "../../../types/TimeEvent";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "POST") {
        res.status(405).end("Method not allowed");
        return;
    }
    if(!req.body) {
        res.status(400).end("No data sent");
        return;
    }
    const { owner, start, end, description, date } = req.body;
    if(!owner || !start || !end || !description) {
        res.status(400).end("Missing required fields");
        return;
    }

    const time_event: TimeEvent = {
        owner: owner,
        start: start,
        end: end,
        description: description,
        date: date
    }

    const client = await MongoClient.connect(process.env.MONGO_URL!);
    const db = client.db("time-tracker");
    const timeEventsCollection = db.collection("time-events");

    try {
        let result = await timeEventsCollection.insertOne(time_event);
        res.status(201).json({"message": "Time event created successfully", "insertedId":result.insertedId});
    } catch (err) {
        console.log(err);
        res.status(500).end("Error inserting data");
    } finally {
        await client.close();
    }
}