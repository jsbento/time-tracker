import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'GET') {
        res.status(405).end('Method not allowed');
        return;
    }
    const { username } = req.query;
    if(!username) {
        res.status(400).end('Missing required fields');
        return;
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db("time-tracker");
    const timeEventsCollection = db.collection("time-events");
    const results = await timeEventsCollection.find({owner: username}).toArray();

    if(!results)
        res.status(404).end('No time events found');
    else
        res.status(200).json(results);
    await client.close();
}