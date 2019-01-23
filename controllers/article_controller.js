var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");
//require all models
var db = require("../models");

// render unsaved articles in homepage
router.get("/",function(req,res){
    db.Article.find({saved:false}).then(function(dbArticle){
        
        var unsaved = {
            scrapes : dbArticle
        };
        
        res.render("articles",unsaved);
    }).catch(function(err){
        console.log(err.message);
    })
        
        
});

// render saved articles
router.get("/savedarticles",function(req,res){
    db.Article.find({saved:true}).then(function(dbArticle){
        
        var savedArticle = {
            scrapes : dbArticle
        };
        
        res.render("articles",savedArticle);
    }).catch(function(err){
        console.log(err.message);
    })



})

router.get("/newscrape",function(req,res){
   
    axios.get("https://www.washingtonpost.com/").then(function(response){   
        var ch = cheerio.load(response.data);
        var scrapes = [];
        
  ch(".headline").each(function(i, element) {

    
    var newArticle = {}
    newArticle.headline = ch(element).text();
    newArticle.description = ch(element).next().text();
    newArticle.url = ch(element).find("a").attr("href");
   
    scrapes.push(newArticle);
    

});
  console.log("scrapes length",scrapes.length);
  db.Article.insertMany(scrapes).then(function(dbArticle){
    console.log("new scrapes saved!");
    res.json(dbArticle)
        // res.send("Scrape Complete");
        
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

});

router.delete("/deleteonescrape/:id",function(req,res){
    db.Article.findByIdAndDelete(req.params.id,function(err){
        if(err) throw err;
        res.end("Removed selected article!")
    });
    // db.Note.deleteMany({},function(err){
    //     if(err) throw err;
    //     res.end("Removed all articles!")
    // })

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




