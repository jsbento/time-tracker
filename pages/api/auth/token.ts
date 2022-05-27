import { NextApiRequest, NextApiResponse } from "next";
import { Token } from "../../../types/Token";
import { MongoClient } from "mongodb";

const DAY_IN_MS = 86400000;

const generateToken = (): Token => {
    return {
        token: Math.random().toString(36).substring(2, 15),
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 5 * DAY_IN_MS)
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST') {
        res.status(405).json({message: 'Method not allowed'});
    }
    if(!req.body) {
        res.status(400).json({message: 'No data provided'});
    }

    const { username, password, status } = req.body;
    const client = await MongoClient.connect(process.env.MONGO_URL!);
    const db = client.db('time-tracker');
    const usersCollection = db.collection('users');
    const token = generateToken();

    if(status === "signup") {
        await usersCollection.findOneAndUpdate({username: username}, {$set: {token: token}});
        res.status(200).json(token);
    } else {
        const user = await usersCollection.findOne({username: username});
        if(!user) {
            res.status(404).json({message: 'User not found'});
        } else {
            if(user.password === password) {
                await usersCollection.findOneAndUpdate({username: username}, {$set: {token: token}});
                res.status(200).json(token);
            } else {
                res.status(401).json({message: 'Invalid credentials'});
            }
        }
    }
}