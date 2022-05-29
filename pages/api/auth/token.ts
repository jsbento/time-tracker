import { NextApiRequest, NextApiResponse } from "next";
import { Token } from "../../../types/Token";
import { MongoClient } from "mongodb";
import CryptoJS from "crypto-js";

const DAY_IN_MS = 86400000;

const decrypt = (password: string): string => {
    return CryptoJS.AES.decrypt(password, process.env.NEXT_PUBLIC_CRYPTO_KEY!).toString(CryptoJS.enc.Utf8);
}

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
        return;
    }
    if(!req.body) {
        res.status(400).json({message: 'No data provided'});
        return;
    }

    const { username, password } = req.body;
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db('time-tracker');
    const usersCollection = db.collection('users');
    const token = generateToken();

    const user = await usersCollection.findOne({username: username});
    
    if(!user) {
        res.status(404).json({message: 'User not found'});
    } else {
        if(decrypt(user.password) === decrypt(password)) {
            const result = await usersCollection.findOneAndUpdate({username: username}, {$set: {token: token}}, {returnDocument: "after"});
            res.status(200).json(result);
        } else {
            res.status(401).json({message: 'Invalid credentials'});
        }
    }
    await client.close();
}