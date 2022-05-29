import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'DELETE') {
        res.status(405).end('Method not allowed');
        return;
    }
    // Delete by owner, id, or date
    // All by date, all by owner
    const { owner, date, id, all } = req.body;
}