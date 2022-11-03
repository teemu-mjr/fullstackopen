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

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

app.use(express.static("build"));

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((notes) => {
      res.json(notes);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((note) => {
      response.json(note);
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({ error: "content missing" });
  }

  const person = new Person({
    id: generateID(),
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id) //
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
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
