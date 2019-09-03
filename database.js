import mongodb, { ObjectID } from 'mongodb';
import axios from 'axios';

const CONNCTION_STRING = 'mongodb://localhost:27017';

const apiUrl = `https://hacker-news.firebaseio.com/v0`;


const getObjectId = () => {
  const objectID = new ObjectID();
  return objectID.toHexString();
};

class Database {
  async getDb() {
    if (this.db) {
      return this.db;
    }
    const connection = await mongodb.MongoClient.connect(CONNCTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('connected!');
    this.db = connection.db('hackernews');
    return this.db;
  }

  async insertStories() {
    const db = await this.getDb();
    const maxItem = (await axios.get(`${apiUrl}/maxitem.json`)).data;
    const ids = [];
    for (let i = Number(maxItem) - 100; i < Number(maxItem); i++) {
      ids.push(i);
    }
    const promises = ids.map((id) => axios.get(`${apiUrl}/item/${id}.json`));
    const result = await Promise.all(promises);
    const stories = result.map((item) => item.data);
    const items = await db.collection('stories').insertMany(stories);
    return items.ops;
  }


  async searchItems(input) {
    const db = await this.getDb();
    const items = await db.collection('stories').find({
      $or: [
        { title: { $regex: `.* ${input}.*` } },
        { by: { $regex: `.*${input}.*` } },
        { text: { $regex: `.*${input}.*` } },
      ],
    }).toArray();
    return items;
  }

  async getStories() {
    const db = await this.getDb();
    const result = await db.collection('stories').find().toArray();
    return result;
  }
}

export default Database;


