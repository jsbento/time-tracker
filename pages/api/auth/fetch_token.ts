import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'GET') {
        res.status(405).json({message: 'Method not allowed'});
        return;
    }
    if(!req.query.username) {
        res.status(400).json({message: 'No username provided'});
        return;
    }

    const { username } = req.query;
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db('time-tracker');
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({username: username});
    if(!user) {
        res.status(404).json({message: 'User not found'});
        return;
    }
    if(user.token.expiresAt < new Date()) {
        res.status(401).json({message: 'Token expired'});
    } else {
        res.status(200).json(user.token);
    }
    await client.close();
}