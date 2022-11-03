const express = require("express");
const app = express();
require("dotenv").config();
const Person = require("./models/person");

const morgan = require("morgan");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const PORT = process.env.port || 3001;

morgan.token("body", (req) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
});

const generateID = () => {
  return Math.floor(Math.random() * 10000);
};

app.use(express.static("build"));

app.get("/api/persons", (req, res) => {
  Person.find({}).then((notes) => {
    res.json(notes);
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((note) => {
    response.json(note);
  });
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({ error: "content missing" });
  }

  const person = new Person({
    id: generateID(),
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndDelete(req.params.id) //
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => {
      console.log(error);
    });
});

// TODO ?
app.get("/info", (req, res) => {
  res.send(`
  <div>
    <div>
      phonebook has ${persons.length} people
    </div>
    <br>
    <div>
      ${new Date()}
    </div>
  </div>
`);
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
