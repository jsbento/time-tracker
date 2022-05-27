import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST') {
        res.status(405).end('Method not allowed');
    }
    if(!req.body) {
        res.status(400).end('No data provided');
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db();
    const usersCollection = db.collection('users');

    try {
        let result = await usersCollection.insertOne(JSON.parse(req.body));
        res.status(201).json({"message": "User created successfully", "insertedId":result.insertedId});
    } catch (error) {
        console.log(error);
        res.status(500).end('Error inserting data');
    } finally {
        await client.close();
    }
}