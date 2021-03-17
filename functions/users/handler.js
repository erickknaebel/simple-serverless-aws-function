const MongoClient = require("mongodb").MongoClient;

const COLLECTION = "COLECTION_NAME"
const DATABASE = "MONGO_DATABASE_NAME";
const MONGODB_URI = "MONGO_CONNECTION_STRING";

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(MONGODB_URI);

  const db = await client.db(DATABASE);

  cachedDb = db;

  return db;
}
module.exports.users = async (event, context) => {

  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase();

  const data = await db.collection(COLLECTION).find({}).limit(20).toArray();

  const response = {
    statusCode: 200,
    body: JSON.stringify(data),
  };

  return response;
};
