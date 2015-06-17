var Movie = require('../../model/model.js');

module.exports.index = function (req, res) {
	Movie.fetch(function (err, movies) {
		res.render('index', {
			title: 'index',
			movies: movies
		});
	});
};

module.exports.movie = function (req, res, next) {
	var id = req.params.id;
	var movies = Movie.findById(id, function (err, movie) {
		if(err){
			console.log(err);
		}else{
			res.render('detail', {
				title: 'movie',
				movie: movie
			});
		}
	});
};

module.exports.list = function(req, res, next) {
    Movie.find(function(err,movies) {
        if(err) {
            console.log(err)
        }else{
            res.render("list", {
                title : "movie",
                items : movies
            });
        };
    });
};

module.exports.add = function(req, res) {
    res.render("add", {
        flash : "",
        poster : "",
        id : "",
        title : "",
        doctor : "",
        country : "",
        language : "",
        brief : "",
        types : ["默认","搞笑","坑爹","WHAT"]
    });
};

module.exports.new = function(req, res) {
    console.log("posting to url:>> /admin/movie/new")
    var postBody = req.body;
    var id = postBody["movie[id]"];
    console.log(postBody);
    if( id!=="" ) {
        console.log("id!==null");
        Movie.findById(id, function(err, data) {
            if(err)
                console.log(err);
            else{
                data.flash = postBody["movie[flash]"] || 'http://player.youku.com/player.php/sid/XMTI1OTczNDM5Mg==/v.swf',
                data.poster = postBody["movie[poster]"] || "http://img1.shenchuang.com/2014/1208/1418004588807.jpg?f=detail",
                data.type = postBody["movie[type]"];
                data.title = postBody["movie[title]"];
                data.doctor = postBody["movie[doctor]"];
                data.country = postBody["movie[country"];
                data.language = postBody["movie[language]"];
                data.brief = postBody["movie[brief]"];
                //findById返回的data默认有一个save方法;
                data.save(function(err, movie) {
                    if(err)
                        console.log(err);

                    res.redirect("/movie/"+ movie._id)
                });
            }
        });
    }else{
        var movie = new Movie({
            //给个默认值;
            flash : postBody["movie[flash]"] || 'http://player.youku.com/player.php/sid/XMTI1OTczNDM5Mg==/v.swf',
            poster : postBody["movie[poster]"] || "http://img1.shenchuang.com/2014/1208/1418004588807.jpg?f=detail",
            type : postBody["movie[type]"],
            title : postBody["movie[title]"],
            doctor : postBody["movie[doctor]"],
            country : postBody["movie[country]"],
            language : postBody["movie[language]"],
            brief : postBody["movie[brief]"],
            meta : {
                createAt : Date.now()
            }
        });
        movie.save(function(err, _movie) {
            if(err)console.log(err);

            res.redirect("/movie/"+ _movie._id)
        });
    }
};


module.exports.updatemovie = function(req, res, next) {
    var id = req.params.id;
    Movie.findById(id, function(err, movie) {
        movie.types = ["默认","搞笑","坑爹","WHAT"];
        res.render("add", movie);
    });
};

module.exports.removemovie = function(req,res) {
    //这个param可以获取在url的query的参数, 也可以获取:id方式匹配的参数,也能获取在POST请求中body中的数据;
    var id = req.param("movie_id");
    console.log("the id is "+id+" will deleted");
    if( id!=="" ) {
        console.log("id!==null, we will change the info of data");
        Movie.findById(id, function(err, data) {
            if(err)
                console.log(err);
            else{
                Movie.findOneAndRemove({_id : id}, function() {
                    console.log("remove —— success")
                    res.end('{"status":"ok"}');
                });
            };
        })
    };
};

module.exports.manage = function(req, res) {
    res.render("admin",{});
};
