const express = require(`express`);

const app = express();

app.use(express.json());

const { ObjectId } = require(`mongodb`);

const mongoose = require(`mongoose`);

require("dotenv").config();

const port = process.env.PORT;
const mongoURL = process.env.MONGO_URL;

mongoose
  .connect(mongoURL, {})

  .then(() => console.log("Connected to MongoDB!"))

  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.get(`/sentences`, (req, res) => {
  //Current page
  const page = req.query.p || 0;
  const sentencePerPage = 3;

  let Sentences = [];
  const db = mongoose.connection.db;
  db.collection(`Sentences`)
    .find()
    .sort({ author: 1 })
    .skip(page * sentencePerPage)
    .limit(sentencePerPage)
    .forEach((Sentence) => Sentences.push(Sentence))
    .then(() => {
      res.status(200).json(Sentences);
    })
    .catch(() => {
      res.status(500).json({ error: `Could not fetch the documents` });
    });
});

app.get(`/get/sentences/:id`, (req, res) => {
  const db = mongoose.connection.db;
  db.collection(`Sentences`)
    .findOne({ _id: new ObjectId(req.params.id) })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: `Could not fetch the document` });
    });
});
app.delete(`/api/sentence/delete/:id`, (req, res) => {
  const db = mongoose.connection.db;
  db.collection(`Sentences`)
    .deleteOne({ _id: new ObjectId(req.params.id) })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: `Could not delete the document` });
    });
});

app.post("/api/sentences/add", async (req, res) => {
  try {
    const sentence = req.body;
    const db = mongoose.connection.db;
    const result = await db.collection("Sentences").insertOne(sentence);
    res.status(201).json(result);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Could not create a new document",
        details: error.message,
      });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
