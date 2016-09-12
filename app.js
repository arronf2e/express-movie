var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Movie = require('./models/movie');
var _ = require('underscore');

mongoose.connect('mongodb://localhost/movie')
app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.listen(port);
console.log('Server is on port 3000!');

// index page
app.get('/', function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err)
        }

        res.render('index', {
            title: '首页',
            movies: movies
        })
    })
});

// detail page
app.get('/movie/:id', function(req, res) {
    var id = req.params.id;
    Movie.findById(id, function(err, movie) {
        res.render('detail', {
            title: '详情页' + movie.title,
            movie: movie
        })
    })
});

//admin page
app.get('/admin/movie', function(req, res) {
    res.render('admin', {
        title: '后台录入',
        movie: {
            title: '',
            doctor: '',
            country: '',
            year: '',
            poster: '',
            flash: '',
            summary: '',
            language: ''
        }
    })
});

// admin post movie
app.post('/admin/movie/new', function(req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    if (id !== 'undefined') {
        Movie.findById(id, function(err, movie) {
            if (err) {
                console.log(err)
            }
        })
    }
})

//list page
app.get('/admin/list', function(req, res) {
    res.render('list', {
        title: '列表页',
        movies: [{
            title: '冰川时代4',
            _id: 3,
            doctor: '麦克·特米尔',
            country: 'USA',
            year: 2012,
            poster: 'http://r4.ykimg.com/0516000051B2E5BC6758391F6B05BFC4',
            language: 'english',
            flash: 'http://v.youku.com/v_show/id_XNDc0MTI3MTA4.html',
            summary: '影片《冰川时代4》讲述的依然是那些生活在冰川时期的特殊动物“家庭”经历的冒险故事。那只永远追着松果的无敌贱，又苦逼的小松鼠奎特（克里斯·韦奇 配音）这次搞出了更大的事件，一个不小心让大陆板块四分五裂，使得猛犸象曼弗瑞德（雷·罗马诺 配音）、树懒希德（约翰·雷吉扎莫 配音）以及剑齿虎迪亚戈（丹尼斯·利瑞 配音）因此和家人、伙伴失散分离，在板块激烈的运动并分裂漂移后，只能使用一块流冰作为临...'
        }]
    })
});