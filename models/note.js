var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NoteSchema = new Schema({

	author : {
		type: String
	},
	comments : {
		type : String
	}
	
});

var Note = mongoose.model("note",NoteSchema);

module.exports = Note;