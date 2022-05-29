import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'GET') {
        res.status(405).end('Method not allowed');
        return;
    }
    if(!req.query.username || !req.query.date) {
        res.status(400).end('Missing required fields');
        return;
    }

    const { username, date } = req.query;

    const client = await MongoClient.connect(process.env.MONGO_URL!);
    const db = client.db("time-tracker");
    const timeEventsCollection = db.collection("time_events");

    const results = await timeEventsCollection.find({username: username, date: new Date(date.toString())}).toArray();

    if(!results)
        res.status(404).end('No time events found');
    else
        res.status(200).json(results);
    await client.close();
}