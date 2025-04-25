import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URI as string);

const db = client.db();

export { db }