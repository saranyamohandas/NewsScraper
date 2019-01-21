// $(document).ready(function () {
// $('.navbar-light .dmenu').hover(function () {
//         $(this).find('.sm-menu').first().stop(true, true).slideDown(150);
//     }, function () {
//         $(this).find('.sm-menu').first().stop(true, true).slideUp(105)
//     });
// });

$(document).ready(function(){
    $("#newScrape").click(function(){
        // $.get("/newscrape",function(data,status){
        //     console.log("New scrape success!")
        //     location.reload();

        // })
        $.ajax("/newscrape",{
        	type: "GET"
        }).then(function(data){
        	console.log("newscrape")
            console.log(data)
        	//location.reload();

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







})