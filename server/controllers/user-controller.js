const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(process.env.DB_URL, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

class UserController {
    async registration(req, res, next) {
      try {
        const {role} = req.body

        if (role === 'Студент') {
          return res.status(200).json({"text": `${role}`})
        }
      } catch (e) {
        console.log(e)
      }
    }

    async getListOfUniver(req, res) {
      try {
          await client.connect();
          const db = client.db('University');
          const collection = db.collection('ListOfUniver');
          const universities = await collection.find().toArray();
          res.json(universities);
        } catch (error) {
          res.status(500).send('Internal Server Error');
        } finally {
          await client.close();
        }
  }
}

module.exports = new UserController()