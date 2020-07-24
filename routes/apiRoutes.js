const db = require("../db/db.json");
const fs = require("fs");
//routing
module.exports = function(app) {
  //API GET request
  app.get("/api/notes", function(req, res) {
    res.json(db);
  });

  //API POST request
  app.post("/api/notes", function(req, res) {
    //receive new note to save on reqest body, addd it to db.json
    db.push(req.body);
    //add unique id to each note
    db.forEach((obj, i) => {
        obj.id = i + 1;
    })
    //return new note to client
    fs.writeFile("./db/db.json", JSON.stringify(db), function (){
        res.json(db);
    })
  });

  //API DELETE request
  app.delete("/api/notes/:id", function(req, res) {
    var id = req.params.id;
    //splice deletes selected note from the db array
    db.splice(id - 1, 1);
    //reassign id for each note object
    db.forEach((obj, i) => {
        obj.id = i + 1;
    });
    //return remaining notes to client
    fs.writeFile("./db/db.json", JSON.stringify(db), function (){
        res.json(db);
    });
  });
};
