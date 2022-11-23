"use strict";
import express, { response } from "express";
import fs from "fs";
import mongoose from "mongoose";
import {quotesCollection} from "./public/quotes.js";
import { Quote } from "./models/quote.js";

const db = "mongodb+srv://rukundo20:<Olivier078++>@quotesapp.zj5bb8t.mongodb.net/test";

mongoose.connect(db).then((result) => app.listen(3000), console.log("connected to DB")).catch((err) => console.log(err));

const app = express();
app.use(express.static("public"));
const port = 8000;

app.set("view engine", "ejs");

app.listen(port, () => {
    console.log(`The port is being listened to ${port}.`);
    //console.log(quotesCollection);
})

app.get("/", (request, response) =>{
    response.send("Your random quotes app is running!");
})

app.get("/", (request, response) =>{
    //response.send("Your random quotes app is running!");
    const quotes = [
        {
            author: "Jean Paul",
            snippet: "You wanna know...."
        }
    ]
    response.render("index.ejs", {quotes: quotes});
})
app.get("/about", (request, response) =>{
    response.render("about.ejs");
})
app.get("/404", (request, response) =>{
    response.render("404.ejs");
})

app.get("/quotes/create", (req, res) => {
    res.render("create.ejs");
  });
  // Quotes testing
  app.post("/quotes", (req, res) => {
    console.log(req.body);
    const newQuote = new Quote(req.body);
    newQuote
      .save()
      .then((result) => {
        // res.send(result)
        res.redirect("/quotes");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.get("/quotes", (req, res) => {
    Quote.find().then((result) => {
      res.render("index", { quotes: result });
    });
  });

  // Quotes SHOW action
app.get("/quotes/:id", (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;
    Quote.findById(id).then((result) => {
      console.log(result);
      res.render("details", { quote: result });
    });
  });
// Delete handler
  app.delete("/quotes/:id", (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;
    Quote.findByIdAndDelete(id).then((result) => {
      console.log(result);
      res.json({ redirect: "/quotes" });
    });
  });

app.get("/randomJS", (request, response) =>{
    const randomNumber = Math.floor(Math.random() * quotesCollection.length);
    console.log(randomNumber);
    let randomQuote = quotesCollection[randomNumber];
    response.send(randomQuote);
})

app.use((request, response) => {
    response.status(404).sendFile('./views/404.html', { root: "."});
});