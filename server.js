const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/todo", function (request, response) {
  response.sendFile(path.join(__dirname, "./public/todo.html"));
});

app.get("/homework", function (request, response) {
  response.sendFile(path.join(__dirname, "./public/hw.html"));
});

app.use(express.static("public"));

let TODOS = [];

app.get("/getTodos", function (req, res) {
  res.json(TODOS);
});

app.post("/removeTodo", function (req, res) {
  const todo = req.body.todo;
  TODOS = TODOS.filter((t) => t != todo);
  res.send("OK");
});

app.post("/addTodo", function (req, res) {
  console.log(req.body);
  const body = req.body;
  TODOS.push(body.todo);
  res.send("OK");
});

app.listen(8000);
