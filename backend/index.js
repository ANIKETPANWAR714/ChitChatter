const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://twitter_admin14:bFuzt6ghTf*3*Hr@cluster0.ij1pj30.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const postCollection = client.db("database").collection("posts"); //this is post collection
    const userCollection = client.db("database").collection("users"); //this is user collection

    app.get("/post", async (req, res) => {
      const post = await postCollection.find().toArray();
      res.send(post);
    });
    app.get("/user", async (req, res) => {
      const user = await userCollection.find().toArray();
      res.send(user);
      
    });
    app.get("/loggedInUser", async (req, res) => {
      const email = req.query.email;
      const user = await userCollection.find({email:email}).toArray();
      res.send(user);
      
    });
    //post
    app.post("/post", async (req, res) => {
      const post = req.body;
      const result = await postCollection.insertOne(post);
      res.send(result);
    });
    app.post("/register", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  } finally {
    // Ensures that the client will close when you finish/error
    console.log("connected");
    //await client.close();
  }
}
run().catch(console.dir);

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send("Hello from Twitter!");
});

app.listen(port, () => {
  console.log(`Twitter listening on port ${port}`);
});
