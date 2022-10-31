const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://notes-app-full:${password}@cluster1.lvvbt.mongodb.net/?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (!process.argv[3]) {
  // print the database persons
  mongoose
    .connect(url)
    .then((result) => {
      Person.find({}).then((result) => {
        console.log("phonebook:");
        result.forEach((person) => {
          console.log(`${person.name} ${person.number}`);
        });
        return mongoose.connection.close();
      });
    })
    .catch((err) => console.log(err));
} else if (process.argv[3] && process.argv[4]) {
  // add a new person to the database
  mongoose
    .connect(url)
    .then((result) => {
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      });

      return person.save();
    })
    .then((person) => {
      console.log(
        `added ${person.name} number ${person.number} to the phonebook`
      );
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
} else {
  console.log("Please provide a name and a number");
}
