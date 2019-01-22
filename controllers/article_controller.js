var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");
//require all models
var db = require("../models");
// Connect to the Mongo DB
//mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

router.get("/",function(req,res){
    db.Article.find({saved:false}).then(function(dbArticle){
        //console.log(dbArticle);
        var unsaved = {
            scrapes : dbArticle
        };
        //console.log("dbarticle",dbArticle)
        res.render("articles",unsaved);
    }).catch(function(err){
        console.log(err.message);
    })
        
        
});

router.get("/savedarticles",function(req,res){
    db.Article.find({saved:true}).then(function(dbArticle){
        //console.log(dbArticle);
        var savedArticle = {
            scrapes : dbArticle
        };
        //console.log("dbarticle",dbArticle)
        res.render("articles",savedArticle);
    }).catch(function(err){
        console.log(err.message);
    })



})

router.get("/newscrape",function(req,res){
    // console.log("url",req.originalUrl);
    axios.get("https://www.washingtonpost.com/").then(function(response){   
        var ch = cheerio.load(response.data);
        var scrapes = [];
        //var dataAttr = $("div").attr("data-feature-id");
        //console.log($("div").attr("data-feature-id").child)
        // data-pb-content-id
  ch(".headline").each(function(i, element) {

    // var title = $(dataAttr.headline).text();
    // var link = $(element).find("a").attr("href");
    var newArticle = {}
    newArticle.headline = ch(element).text();
    newArticle.description = ch(element).next().text();
    //console.log(newArticle);
    scrapes.push(newArticle);
    // db.Article.create(newArticle).then(function(dbArticle){
    //     //res.redirect("/");
    //     //console.log(dbArticle)
    // }).catch(function(err){
    //     console.log(err);
    // })
   // res.send("Scrape Complete");

});
  console.log("scrapes length",scrapes.length);
  db.Article.insertMany(scrapes).then(function(dbArticle){
    console.log("new scrapes saved!");
        res.send("Scrape Complete");
        //res.redirect("/");
        //console.log(dbArticle)
    }).catch(function(err){
        console.log(err);
    });

     

}).catch(function(err){
    console.log(err)
});

});


router.delete("/deleteallscrape",function(req,res){
    db.Article.deleteMany({},function(err){
        if(err) throw err;
        res.end("Removed all articles!")
    });
    db.Note.deleteMany({},function(err){
        if(err) throw err;
        res.end("Removed all articles!")
    })

})

router.put("/savestatus/:id",function(req,res){
    console.log(req.body);
    //console.log(req.body.saved);
    var dbUpdateSave = { saved : true};
    if(req.body.saved == "false"){
        dbUpdateSave.saved = false;
    }
    console.log(req.body.saved,req.params.id);
    db.Article.findOneAndUpdate({_id: req.params.id},dbUpdateSave)
    .then(function(dbArticles){
        res.redirect("/");

    }).catch(function(err){
        console.log(err);
        res.json(err);
    })

});

//articlenotes
router.post("/articlenotes/:id",function(req,res){
    
    
    console.log(req.body,req.params.id);
    db.Note.create(req.body).then(function(dbNote){
      return db.Article.findOneAndUpdate({_id: req.params.id},{ note: dbNote._id }, { new: true });
    
    }).then(function(dbArticle){
        console.log(dbArticle)
    }).catch(function(err){
        console.log(err);
        res.json(err);
    })
});
    







module.exports = router;




