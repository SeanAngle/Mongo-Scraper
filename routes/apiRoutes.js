var db = require("../models");
var request = require("request");
var cheerio = require("cheerio");

module.exports = function (app) {
    app.get("/scrape", function(req, res) {
        request("https://www.yahoo.com/news/", function (error, response, html) {
            if(error){
                console.log(error);
                return res.json(error);
            }
            var $ = cheerio.load(html);
            $("h3 a").each(function(i, element) {
                // Save an empty result object
                var result = {};

                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(element)
                  .text();
                result.link = "https://www.yahoo.com" + $(element)
                  .attr("href");

                  console.log("results: " + JSON.stringify(result));
                // Create a new Article using the `result` object built from scraping
                db.Article.create(result)
                  .then(function(dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                  })
                  .catch(function(err) {
                    // If an error occurred, send it to the client
                    return res.json(err);
                  });
              });
            // Reload the page when articles are all scraped
            res.redirect("/");
        })
    });

    // Save an article
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