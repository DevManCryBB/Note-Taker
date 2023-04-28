const util = require("util")
const fs = require("fs")
const { v4: uuidv4 } = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileAsync("db/db.json")
  }
  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note))
  }
  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }
      return parsedNotes;
    });
  }
  addNotes(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }

    const newNote = { title, text, id: uuidv4() };

    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }
  // deleteNotes(id)
  // return this.getNotes
  // this will return a promise object w notes
  // filter the notes by id
  // .then write to the notes
  // router.delete(/notes/id) (in api routes)
}

module.exports = new Store()