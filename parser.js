"use strict"

let fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(identitas) {
    this.id = identitas.id;
    this.firstName = identitas.firstName;
    this.lastName = identitas.lastName;
    this.email = identitas.email;
    this.phone = identitas.phone;
    this.createdAt = Date();
  }
}

class PersonParser {

  constructor(file) {
    this._file=file;
    this._people = [];
  }

   get people() {

    let file = fs.readFileSync(this._file, 'utf-8').split("\n");
    let personData;
    for(let i = 1; i < file.length-1; i++) {
      personData = file[i].split(',');
      this._people.push(new Person({
        'id': personData[0],
        'firstName': personData[1],
        'lastName': personData[2],
        'email': personData[3],
        'phone': personData[4],
        'createdAt': personData[5]
      }));
    }
    return this._people;
  }

  addPerson(personData) {

    this._people.push(new Person({
      'id': this._people.length + 1,
      'firstName': personData.firstName,
      'lastName': personData.lastName,
      'email': personData.email,
      'phone': personData.phone,
      'createdAt': personData.createdAt
    }))
  }

  save() {
      for(let i = 0; i < this._people.length; i++) {
        this._people[i] = `${this._people[i].id},${this._people[i].firstName},${this._people[i].lastName},${this._people[i].email},${this._people[i].phone},${this._people[i].createdAt}`;
      }
      let csvWithRowName = "id,first_name,last_name,email,phone,created_at\n";
      csvWithRowName += this._people.join('\n')
      fs.writeFile(this._file, csvWithRowName, 'utf-8', (err, data) => {
        if(!err) {
          return data;
        } else {
          console.log(err.message);
        }
      });
    }

}

let parser = new PersonParser('people.csv');

console.log(parser.people.length);

parser.addPerson(new Person({
  'id': '',
  'firstName': 'aan',
  'lastName': 'supratman',
  'email': 'aan@gmail.com',
  'phone': '1-456-478-321',
}))

parser.addPerson(new Person({
  'id': '',
  'firstName': 'rere',
  'lastName': 'kaka',
  'email': 'rere@gmail.com',
  'phone': '1-353-123-6789',
}))

parser.save();

console.log(`New person has been inserted`)
console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
