var mongoose = require('mongoose');
var MovieSchema = new mongoose.Schema({
	flash : String,
    poster : String,
    doctor : String,
    type : String,
    title : String,
    language : String,
    country : String,
    brief : String,
    meta:{
        createAt : {
            type : Date,
            default : Date.now()
        },
        updateAt : {
            type : Date,
            default : Date.now()
        }
    }
});

MovieSchema.statics = {
	fetch : function (cb) {
		return this.find({}).exec(cb);
	},
	findById : function (id, cb) {
		return this.findOne({_id: id}).exec(cb);
	}
};

MovieSchema.pre('save', function (next) {
	next();
});

var Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;

