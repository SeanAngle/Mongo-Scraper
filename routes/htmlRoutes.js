var db = require("../models");

module.exports = function (app) {
    // Route to display all scraped articles
    app.get("/", function (req, res) {
        db.Article.find({}, function(err, data) {
            if(err){
                console.log(err);
                res.status(500).send(err);
            }else{
                res.render("index", {
                    title: "Mongo Scraper",
                    article: data
                })
            }
        })
    });

    // Route to display all saved articles
    app.get("/saved", function (req, res) {
        db.Article.find({saved: true}, function(err, data) {
            if(err){
                console.log(err);
                res.status(500).send(err);
            }else{
                res.render("saved", {
                    title: "Saved Articles",
                    article: data
                })
            }
        })
    });

    app.get("/comment/:id", function(req, res) {
        db.Article.find({id: req.params.id}, function(err, data) {

        })
    })
};