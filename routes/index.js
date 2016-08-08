var express = require('express');
var uniqueValidator = require('mongoose-unique-validator');
var router = express.Router();

var mongoose = require('mongoose');
var db = mongoose.connection;

var userSchema = mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String , required: true,  unique: true},
    password: {type: String , required: true},
    type: {type: Number , default: 2}
});
var User = mongoose.model('User', userSchema);

userSchema.plugin(uniqueValidator, {
  message: "Username already exists."
});


// select all
router.get('/users', function(req, res) {
    User.find({type: 2}, function(err, docs) {
        if(err) return res.status(400).send(err);
        res.json(docs);
    });
});

// count all
router.get('/users/count', function(req, res) {
    User.count(function(err, count) {
        if(err) return res.status(400).send(err);
        res.json(count);
    });
});

// create
router.post('/user', function(req, res) {

    var username = req.body.username;

    User.find({username: username} , function(err, data){
        if (err) {
            return res.status(400).send (err)
        } 
        if (data.length) {
            return res.status(400).send("Username already exists");
        } else {
            var obj = new User(req.body);
            obj.save(function(err, obj) {
                if(err) return res.status(400).send(err);
                res.status(200).json(obj);
            });
        }
    })


});

// login user
router.post('/login', function(req,res){
    // var user = JSON.parse(req.body);
    User.findOne({username: req.body.username} , function(err, data) {
        if (err) return res.status(500).send("Error finding user")
        // res.json(data);
        if (!data || data.length < 0) {
            return res.status(401).send("Username does not exist")
        }
        if (data.password != req.body.password) {
            return res.status(400).send("Incorrect password")
        } else {
            res.status(200).json(data);
        }
    })
});



// find by id
router.get('/user/:id', function(req, res) {
    User.findOne({_id: req.params.id}, function (err, obj) {
        if(err) return res.status(400).send(err);
        res.json(obj);
    })
});

// update by id
router.put('/user/:id', function(req, res) {
    User.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
        if(err) return res.status(400).send(err);
        res.sendStatus(200);
    })
});

// delete by id
router.delete('/user/:id', function(req, res) {
    User.findOneAndRemove({_id: req.params.id}, function(err) {
        if(err) return res.status(400).send(err);
        res.sendStatus(200);
    });
});

module.exports = router;
