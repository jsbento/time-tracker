import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { User } from "../../../types/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST') {
        res.status(405).end('Method not allowed');
        return;
    }
    if(!req.body) {
        res.status(400).end('No data provided');
        return;
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db('time-tracker');
    const usersCollection = db.collection('users');

    try {
        const {username, email, password} = req.body;
        const user: User = {
            username: username,
            email: email,
            password: password, // Encrypt before sending here
            token: ""
        }
        let result = await usersCollection.insertOne(user);
        res.status(201).json({"message": "User created successfully", "insertedId":result.insertedId});
    } catch (error) {
        console.log(error);
        res.status(500).end('Error inserting data');
    } finally {
        await client.close();
    }
}