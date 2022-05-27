import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'DELETE') {
        res.status(405).end('Method not allowed');
    }
    if(!req.body) {
        res.status(400).end('No username provided');
    }

    const { username } = req.body;
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db();
    const usersCollection = db.collection('users');

    try {
        const user = await usersCollection.findOneAndDelete({username: username});

        if(!user)
            res.status(404).end('User not found');
        else
            res.status(200).json(user);
    } catch (error) {
        res.status(500).end(error);
    } finally {
        await client.close();
    }
}