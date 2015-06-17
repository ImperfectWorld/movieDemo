var express = require('express');
var router = express.Router();

/*引用mongoose模块，数据库名称为movieManagerDemo*/
var mongoose = require('mongoose');
var Movie = require("../model/model.js");
mongoose.connect('mongodb://localhost/movieManagerDemo');

var movieRoute = require('../controller/movie-controller/movie-controller');

module.exports = function (app) {
	
	/* GET home page. */
	router.get('/', movieRoute.index);
	router.get('/movie/:id', movieRoute.movie);
	router.get('/list', movieRoute.list);
	router.get('/admin/movie/add', movieRoute.add);
	router.post('/admin/movie/new', movieRoute.new);
	router.get("/admin/updatemovie/:id", movieRoute.updatemovie);
	router.post('/admin/removemovie', movieRoute.removemovie);

	/*后台管理页面*/
	router.get('/admin/admin', movieRoute.manage);


	app.use(router);
}

