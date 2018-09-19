var db = require("../models");
var request = require("request");
var cheerio = require("cheerio");

module.exports = function (app) {
    app.get("/scrape", function(req, res) {
        request("https://news.google.com/", function (error, response, html) {
            if(error){
                console.log(error);
                return res.json(error);
            }
            var $ = cheerio.load(html);
            $("article a").each(function(i, element) {
                // Save an empty result object
                var result = {};

                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(element)
                  .text();
                result.link = "https://news.google.com" + $(element)
                  .attr("href");

                  console.log("results: " + JSON.stringify(result));
                // Creates a new article from scraping 
                db.Article.create(result)
                  .then(function(dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                  })
                  .catch(function(err) {
                    // If an error occurres send it to the client
                    return res.json(err);
                  });
              });
            // Reloads the page when the articles are scraped
            res.redirect("/");
        })
    });

    // Saves an article
    app.post("/save/:id", function(req, res) {
        db.Article.findOneAndUpdate(
            {_id: req.params.id},
            { saved: true },
        ).then(function(dbArticle){
            res.json(dbArticle);
        })
        .catch(function(err) {
        res.json(err);
        })
    })


    // Remove Article from Saved list
    app.post("/remove/:id", function(req, res) {
        db.Article.findOneAndUpdate(
            {_id: req.params.id},
            { saved: false },
        ).then(function(dbArticle){
            res.redirect("/saved");
        })
        .catch(function(err) {
            res.json(err);
        })
    })
    //Creates a comment for the article
    app.post("/articles/:id", function(req, res) {
        db.Comment.create(req.body)
          .then(function(dbComment){
            return db.Article.findOneAndUpdate(
                {_id: req.params.id},
                { note: dbNote._id },
                { new: true }
              );
          })
          .then(function(dbArticle){
            res.json(dbArticle);
          })
          .catch(function(err) {
            res.json(err);
          })
      });




};