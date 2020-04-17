const express = require("express");
const knex = require("../connection");
const router = express.Router();

// Router Team GET function.
router.get("/new", (request, response) => {
  response.render("new");
});
// Router Team POST function in DB.
router.post("/", (request, response) => {
  const { name, logoUrl, members } = request.body;
  knex("cohorts")
    .insert({
      name: name,
      members: members,
      logoUrl: logoUrl
    })
    .returning("*")
    .then(response.redirect("/team/new"));
});

// Get for Home Page
router.get("/", (request, response) => {
  knex("cohorts")
    .orderBy("createdAt", "desc")
    .then(teams => {
      //   response.send();
      response.render("teams", { teams });
    });
});

// get for :id page
router.get("/:id", (request, response) => {
  const ids = request.params.id;
  const query = undefined;
  const obj = {};
  console.log(ids);
  knex("cohorts")
    .where("id", ids)
    .first()
    .then(team => {
      if (team) {
        response.render("show", { team, query, obj });
      } else {
        response.redirect("/team/new");
      }
    });
});

// router POST
router.get("/:id/method", (request, response) => {
  const query = request.query;
  const ids = request.params.id;
  let x1 = query.x;
  let obj = {};

  console.log(request.query);
  knex("cohorts")
    .where("id", ids)
    .first()
    .then(team => {
      if (x1 == "1") {
        let y = team.members.split(",");
        let arr = [];
        let length = y.length;

        for (let i = 0; i < length; i++) {
          arr.push(...y.splice(Math.floor(Math.random() * y.length - 1), 1));
        }
        let num = Math.ceil(arr.length / parseInt(query.number));
        for (let i = 0; i < parseInt(query.number); i++) {
          obj[`${i}`] = [];
        }
        let j = 0;
        let i = 0;
        while (arr.length > 0) {
          for (let value in obj) {
            if (arr.length == 0) {
              break;
            } else {
              obj[value][i] = arr.pop();
            }
          }
          i++;
        }
        if (team) {
          console.log(team);
          console.log(obj);
          response.render("show", { team, query, obj });
        } else {
          response.redirect("/team/new");
        }
      }
      if (x1 == "2") {
        let y = team.members.split(",");
        let arr = [];
        let length = y.length;

        for (let i = 0; i < length; i++) {
          arr.push(...y.splice(Math.floor(Math.random() * y.length - 1), 1));
        }
        console.log(arr);
        let num = Math.floor(arr.length / parseInt(query.number));
        for (let i = 0; i < arr.length; ) {
          let team = new Array();
          for (let j = i; j < i + parseInt(query.number); j++) {
            if (arr[j] != undefined) team.push(arr[j].trim());
          }
          obj[`${i}`] = team;
          i = i + parseInt(query.number);
        }
        console.log(obj);
      }
      if (team) {
        console.log(team);
        console.log(obj);
        response.render("show", { team, query, obj });
      } else {
        response.redirect("/team/new");
      }
    });
});

// Edit : Patch
router.patch("/:id/edit", (request, response) => {
  const { name, logoUrl, members } = request.body;
  //   const updatedNote = { content };
  knex("cohorts")
    .where("id", request.params.id)
    .update({ name: name, logoUrl: logoUrl, members: members })
    .then(() => {
      response.redirect("/team");
    });
});
router.get("/:id/edit", (request, response) => {
  knex("cohorts")
    .where("id", request.params.id)
    .first()
    .then(team => {
      response.render("edit", { team });
    });
});

// // A route to delete a note at DELETE /notes/:id
router.delete("/:id", (request, response) => {
  knex("cohorts")
    .where("id", request.params.id)
    .del()
    .then(response.redirect("/team/new"));
});

// // A route to update an edited note at PATCH /notes/:id
// router.patch("/:id", (request, response) => {
//   const updatedNote = { content: request.body.content };
//   //   const updatedNote = { content };
//   knex("notes")
//     .where("id", request.params.id)
//     .update(updatedNote)
//     .then(() => {
//       response.redirect("/notes");
//     });
// });
module.exports = router;
