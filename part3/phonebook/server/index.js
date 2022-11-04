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

app.use(express.static("build"));

morgan.token("body", (req) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
});

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      return res.json(persons);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((note) => {
      res.json(note);
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  const person = new Person({
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
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

// TODO ?
app.get("/info", (req, res, next) => {
  Person.find({}) //
    .then((result) => {
      res.send(`
    <div>
      <div>
        phonebook has ${result.length} people
      </div>
      <br>
      <div>
        ${new Date()}
      </div>
    </div>
  `);
    })
    .catch((error) => next(error));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
