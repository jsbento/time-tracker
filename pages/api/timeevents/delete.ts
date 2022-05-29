import { NextApiRequest, NextApiResponse } from "next";
import { Collection, MongoClient, ObjectId } from "mongodb";

const deleteByID = async (collection: Collection, id: ObjectId) => {
    await collection.deleteOne({ _id: id });
}

const deleteByDate = async (collection: Collection, username: string, date: Date) => {
    await collection.deleteMany({ username: username, date: date });
}

const deleteByUser = async (collection: Collection, username: string) => {
    await collection.deleteMany({ username: username });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'DELETE') {
        res.status(405).end('Method not allowed');
        return;
    }
    
    const { owner, date, id } = req.body;
    if(!owner && !date && !id) {
        res.status(400).end('Missing required fields');
        return;
    }

    const client = await MongoClient.connect(process.env.MONGO_URL!);
    const db = client.db("time-tracker");
    const timeEventsCollection = db.collection("time-events");

    if(id) {
        await deleteByID(timeEventsCollection, new ObjectId(id));
        res.status(200).end('Time event deleted successfully');
    } else if(owner && date) {
        await deleteByDate(timeEventsCollection, owner, new Date(date.toString()));
        res.status(200).end('Time events deleted successfully');
    } else {
        await deleteByUser(timeEventsCollection, owner);
        res.status(200).end('Time events deleted successfully');
    }

    await client.close();
}