$(document).ready(function(){
    $("#newScrape").click(function(){
        // $.get("/newscrape",function(data,status){
        //     console.log("New scrape success!")
        //     location.reload();

        // })
        $.ajax("/newscrape",{
        	type: "GET"
        }).then(function(data){
        	console.log("newscrape");
          // location.reload = "/";
            // (data)
        	document.location.reload(true);

        })
    });

  $("#clearArticle").click(function(){
  	$.ajax("/deleteallscrape",{
  		type: "DELETE"
  	}).then(function(){
  		location.reload();
  		console.log("All scrapes cleared!")
  	})
  });

  $(".userAction").click(function(){
    //console.log($(this).attr("data-id"));
    var getThisId = $(this).attr("data-id");
    var getSaved = $(this).attr("data-save-status")
    console.log(getThisId,getSaved);
    $.ajax("/savestatus/" + getThisId,{
      type: "PUT",
      data : {saved : getSaved}
    }).then(function(){
      location.reload();
      console.log("One scrape cleared!")
    })

  })

  $("#savedArticle").click(function(){
    $.ajax("/savedarticles",{
      type: "GET"
    }).then(function(res){
       console.log(res);
    })

  })

  // pass the id to modal for notes
  $(".noteModal").on("click",function(){
    var setModalId = $(this).data("id");
    //console.log(setModalId);
    $("#artId").text(setModalId);
    $("#artId").attr("data-id",setModalId);
  });

  //submit modal form
      $("#addNotes").on("click",function(event){
        event.preventDefault();
        //console.log($(this).parents().parent());
        var userNotes = $("#message-text").val().trim();
        var getThisId = $("#artId").attr("data-id");
        $("#message-text").val("");
        console.log(userNotes);
        console.log(getThisId);
        $.ajax("/articlenotes/" + getThisId,{
          type: "POST",
          data : {comments : userNotes}
        }).then(function(){
          location.reload();
          console.log("Note posted!")
    })
      });
    

  
 

 






})