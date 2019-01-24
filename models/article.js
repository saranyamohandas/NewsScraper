var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

	headline : {
		type: String,
		//index: true,
		//unique : true,
		required : true
		
	},
	description : {
		type : String,
		//required : true
	},
	url: {
		type : String
	},
	saved : {
		type: Boolean,
		default : false
	},
	note : {
		type : Schema.Types.ObjectId,
		ref: "Note"
	}
});

var Article = mongoose.model("article",ArticleSchema);

module.exports = Article;