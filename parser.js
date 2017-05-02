"use strict"
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(arr) {
    this.id = arr[0];
    this.first_name = arr[1];
    this.last_name = arr[2];
    this.email =  arr[3];
    this.phone = arr[4];
    this.createdAt = (new Date(arr[5]).toUTCString());
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
    this._text = null
  }

  parsingpeople() {
    var fs = require('fs');
    var filename = this._file;
    this._text = fs.readFileSync(filename, 'utf-8');
    this._baris = this._text.split('\n');
    this._people = this._baris.map(x => x.split(','))
  }

  get people() {

    let output = []

    for (let  i=1; i<this._people.length; i++) {
      var person = new Person(this._people[i])
      output.push(person);
    }

    return output

  }

  get file() {
    return this._file
  }

  addPerson(arr) {
    var anakBaru = new Person(arr);
    this._baris.push(arr.join(','));
    this._people.push(anakBaru);
  }

  save() {
    var textBaru = this._baris.join('\n');
    var fs = require('fs');

    fs.writeFileSync(this._file, textBaru, 'utf-8');

    return 'Save berhasil!!'
  }

}

let parser = new PersonParser('people.csv')

parser.parsingpeople();
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`);
parser.addPerson([201, 'Sidik', 'Hidayatullah', 'sidik@sidik.com', '021-456987984', '22.30 24-05-17']);
console.log(parser.people);
console.log(parser.save());
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`);
// let orang = new Person ([201, 'Sidik', 'Riders', 'sidik@sidik.com', '021-79594654', '2017-07-15T12:06:16-07:00'])
// console.log(orang);
