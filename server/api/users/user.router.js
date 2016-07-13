'use strict';

var router = require('express').Router();

var HttpError = require('../../utils/HttpError');
var User = require('./user.model');
var Story = require('../stories/story.model');

router.param('id', function (req, res, next, id) {
  User.findById(id)
  .then(function (user) {
    if (!user) throw HttpError(404);
    req.requestedUser = user;
    next();
  })
  .catch(next);
});

router.get('/', function (req, res, next) {
  User.findAll({})
  .then(function (users) {
    res.json(users);
  })
  .catch(next);
});

router.post('/', function (req, res, next) {
  User.create(req.body)
  .then(function (user) {
    res.status(201).json(user);
  })
  .catch(next);
});

router.get('/:id', function (req, res, next) {
  req.requestedUser.reload({include: [Story]})
  .then(function (requestedUser) {
    res.json(requestedUser);
  })
  .catch(next);
});

router.put('/:id', function (req, res, next) {
  req.requestedUser.update(req.body)
  .then(function (user) {
    res.json(user);
  })
  .catch(next);
});

router.delete('/:id', function (req, res, next) {
  req.requestedUser.destroy()
  .then(function () {
    res.status(204).end();
  })
  .catch(next);
});

router.post('/login', function (req, res, next) {
  console.log("in login post route")
  User.findOne({
    where: req.body
  })
  .then(function (user) {
    if (!user) {
      res.sendStatus(401);
      console.log("user does not exist")
    } else {
    console.log("user is found")
    req.session.userId = user.id;
    req.session.cookie.expires = new Date(Date.now() + (1000*60*20))
    res.sendStatus(204);
    }
  })
  .catch(next);
});

router.post('/signup', function (req, res, next) {
  console.log("in signup post route")
  User.findOne({
    where: req.body
  })
  .then(function (user) {
    if (user) {
      res.sendStatus(409);
    } else {
      User.create(req.body)
      .then(function (user) {
        console.log("user ", req.body, " was created");
        req.session.userId = user.id;
        req.session.cookie.expires = new Date(Date.now() + (1000*60*20))
        res.sendStatus(204);
      });
    }
  })
  .catch(next);
});

router.post('/logout', function (req, res, next) {
    console.log("in logout route");
    req.session.cookie.expires = new Date(Date.now() + 1);
    console.log("Done with logout route")
    res.sendStatus(204);
  // req.session.userId = null;
  // req.session.destroy(function (err) {console.error(err)});
  // delete req.session.userId;
})

module.exports = router;
