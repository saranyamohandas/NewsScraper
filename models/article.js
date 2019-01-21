var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

	headline : {
		type: String,
		required : true
	},
	description : {
		type : String,
		//required : true
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