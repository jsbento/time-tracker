import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'GET') {
        res.status(405).end('Method not allowed');
    }
    const { username } = req.query;
    if(!username) {
        res.status(400).end('No username provided');
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db();
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({username: username});

    if(!user)
        res.status(404).end('User not found');
    else
        res.status(200).json(user);
    await client.close();
}