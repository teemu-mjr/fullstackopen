const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const PORT = process.env.port || 3001;
const baseUrl = "/api/persons";

morgan.token("body", (req) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
});

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateID = () => {
  return Math.floor(Math.random() * 10000);
};

app.use(express.static("build"));

app.get(baseUrl, (req, res) => {
  res.json(persons);
});

app.get(`${baseUrl}/:id`, (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.post(baseUrl, (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number is missing",
    });
  }

  if (persons.find((person) => person.name === body.name)) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const newPreson = {
    id: generateID(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(newPreson);

  res.json(newPreson);
});

app.delete(`${baseUrl}/:id`, (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

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
