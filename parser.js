"use strict"

class Person {
    constructor(obj) {
        this.id = obj['id'];
        this.firstName = obj['firstName'];
        this.lastName = obj['lastName'];
        this.email = obj['email'];
        this.phone = obj['phone'];
        this.createdAt = obj['createdAt'];
    }
}

class PersonParser {
    constructor(file) {
        this._file = file
        this._people = [];
        this.fs = require('fs');
    }

    get people() {
        let data = [];
        let file = this.fs.readFileSync(this._file, 'utf-8').split('\n');

        for (let i = 0; i < file.length; i++) {
            data[i] = file[i].split(',');
        }
        for (let i = 1; i < file.length; i++) {
            let date = new Date(data[i][5]);
            let person = new Person({
                id: data[i][0],
                firstName: data[i][1],
                lastName: data[i][2],
                email: data[i][3],
                phone: data[i][4],
                createdAt: date.toUTCString()
            });
            this._people.push(person);
        }
        return this._people;
    }

    get size() {
        // return this._people.length;
        return this.fs.readFileSync(this._file, 'utf-8').split('\n').length - 2;
    }

    addPerson(obj) {
        // console.log(this._people.length);
        let date = new Date(obj['createdAt']);
        obj['createdAt'] = date;
        this._people.push(obj);
        // console.log(this._people[201]);
    }

    save() {
        let tempInd = this._people.length - 1;
        let str = `${this._people[tempInd].id},${this._people[tempInd].firstName},${this._people[tempInd].lastName},${this._people[tempInd].email},${this._people[tempInd].phone},${this._people[tempInd].createdAt}\n`;
        this.fs.appendFileSync('people.csv', str);
    }
}

let parser = new PersonParser('people.csv');
parser.addPerson(new Person({
    id: '201',
    firstName: 'Zulfikar Annur',
    lastName: 'Ahmad',
    email: 'zulfikaraa@mail.com',
    phone: '0381739827',
    createdAt: new Date()
}));
parser.save();
console.log(`There are ${parser.size} people in the file '${parser._file}'.`);
console.log(JSON.stringify(parser._people[parser._people.length - 1]));
