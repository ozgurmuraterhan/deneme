const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const passport = require('passport');
const JWT = require('jsonwebtoken');

const crypto = require('crypto');
const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = 10;

const roleTitle = 'staff';
const title = 'Staff';

// get all items
router
  .route('/all/:bool')
  .get(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role;
      if (req.params.bool == '0') {
        var degBool = false;
      } else {
        var degBool = true;
      }

      if (rolesControl[roleTitle + 'list']) {
        User.find({ isCustomer: degBool })
          .then((data) => {
            res.json(data);
          })
          .catch((err) =>
            res.json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
        } else if (rolesControl[roleTitle + 'onlyyou']) {
          User.find({
            $or: [
              { _id: req.user._id },
              { 'created_user.id': `${req.user._id}` },
            ],
          })
            .then((data) => {
              res.json(data);
            })
            .catch((err) =>
              res.json({
                messagge: 'Error: ' + err,
                variant: 'error',
              })
            );
        } else if (rolesControl['customerslist']) {
          User.find( 
            
               { 'isCustomer': true },
            
          )
            .then((data) => {

              res.json(data);
            })
            .catch((err) =>
              res.json({ 
                messagge: 'Error: ' + err,
                variant: 'error',
              })
            );
        } else {
        res.status(403).json({
          message: {
            messagge: 'You are not authorized, go away!',
            variant: 'error',
          },
        });
      }
    }); 
  });



//group name statistic
router
.route("/statistic")
.get(passport.authenticate("jwt", { session: false }), (req, res, next) => {
  User.find({ username: req.user.username }).then((data) => {

    const rolesControl = data[0].role;
    if (rolesControl[roleTitle + "list"]) {
      User.aggregate([
        { $unwind: "$group_id" },
        {
          $group: {
            _id: "$group_id.label",
            count: { $sum: 1 },
          },
        },
      ]).then((data) => res.json(data));
    }
  });
});


// post new items
router
  .route('/add')
  .post(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role;
      if (rolesControl[roleTitle + 'create'] || rolesControl['customerscreate']) {
        new User(req.body)
          .save()

          .then(() =>
            res.json({
              messagge: title + ' Added',
              variant: 'success',
            })
          )
          .catch((err) =>
            res.json({
              messagge: ' Error: ' + err,
              variant: 'error',
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: 'You are not authorized, go away!',
            variant: 'error',
          },
        });
      }
    });
  });
// post new items
router.route('/add/register123123123').post((req, res, next) => {
  new User(req.body)
    .save()

    .then(() =>
      res.json({
        messagge: title + ' Added',
        variant: 'success',
      })
    )
    .catch((err) =>
      res.json({
        messagge: ' Error: ' + err,
        variant: 'error',
      })
    );
});

// fetch data by id
router
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role;
      if (rolesControl[roleTitle + 'list']) {
        User.findById(req.params.id)
          .then((data) => res.json(data))
          .catch((err) =>
            res.status(400).json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else if (rolesControl[roleTitle + 'onlyyou']) {
        User.findOne({
          $or: [
            { _id: req.params.id },
            { 'created_user.id': `${req.user._id}` },
          ],
        })
          .then((data) => {
            if (data) {
              res.json(data);
            } else {
              res.status(403).json({
                message: {
                  messagge: 'You are not authorized, go away!',
                  variant: 'error',
                },
              });
            }
          })
          .catch((err) =>
            res.status(400).json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      }else if (rolesControl['customerslist']) {
        User.findOne({
          $and: [
            { _id: req.params.id },
            { 'isCustomer': true },
          ],
        }).then((data) => {

             res.json(data);
          })
          .catch((err) =>
            res.json({ 
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: 'You are not authorized, go away!',
            variant: 'error',
          },
        });
      }
    });
  });

// fetch data by id (customer)
router
  .route('/customer/:id')
  .get(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      User.findById(req.params.id)
        .then((data) => res.json(data))
        .catch((err) =>
          res.status(400).json({
            messagge: 'Error: ' + err,
            variant: 'error',
          })
        );
    });
  });

// delete data by id
router
  .route('/:id')
  .delete(passport.authenticate('jwt', { session: false }), (req, res) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role;

      if (req.params.id == req.user._id) {
        return res.json({
          messagge: ' Can not delete yourself.',
          variant: 'error',
        });
      }

      if (rolesControl[roleTitle + 'delete']) {
        User.findByIdAndDelete(req.params.id)
          .then((data) =>
            res.json({
              messagge: title + ' Deleted',
              variant: 'info',
            })
          )
          .catch((err) =>
            res.json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else if (rolesControl[roleTitle + 'onlyyou']) {
        User.deleteOne({
          _id: req.params.id,
          'created_user.id': `${req.user._id}`,
        })
          .then((resdata) => {
            if (resdata.deletedCount > 0) {
              res.json({
                messagge: title + ' delete',
                variant: 'success',
              });
            } else {
              res.status(403).json({
                messagge: 'You are not authorized, go away!',
                variant: 'error',
              });
            }
          })
          .catch((err) =>
            res.json({ 
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      }else if (rolesControl['customersdelete']) {
        User.deleteOne({
          $and: [
            { _id: req.params.id },
            { 'isCustomer': true },
          ],
        }).then((data) => {

             res.json(data);
          })
          .catch((err) =>
            res.json({ 
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else {
        res.status(403).json({
          messagge: 'You are not authorized, go away!',
          variant: 'error',
        });
      }
    });
  });








router.post(
  '/updatePasswordSuperadmin',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role;
      if (rolesControl['superadmin'] || req.body._id == req.user._id) {
        User.findOne({
          _id: req.body._id,
        }).then((user) => {
          if (user != null) {
            console.log('user exists in db');
            bcrypt
              .hash(req.body.password, BCRYPT_SALT_ROUNDS)
              .then((hashedPassword) => {
                User.findOneAndUpdate(
                  {
                    _id: req.body._id,
                  },
                  {
                    password: hashedPassword,
                  }
                )
                  .then(() => {
                    res.json({
                      messagge: title + ' Password Update',
                      variant: 'success',
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                    res.json({
                      messagge: 'Error: ' + err,
                      variant: 'error',
                    });
                  });
              });
          } else {
            console.error('no user exists in db to update');
            res.status(401).json('no user exists in db to update');
          }
        });
      } else {
        res.json({
          messagge: ' You are not authorized, go away!',
          variant: 'error',
        });
      }
    });
  }
);
/// Update password customer
router.post(
  '/updatePasswordCustomer',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.find({ username: req.user.username }).then((data) => {
      User.findOne({
        _id: req.body._id,
      }).then((user) => {
        if (user != null) {
          console.log('user exists in db');
          bcrypt
            .hash(req.body.password, BCRYPT_SALT_ROUNDS)
            .then((hashedPassword) => {
              User.findOneAndUpdate(
                {
                  _id: req.body._id,
                },
                {
                  password: hashedPassword,
                }
              )
                .then(() => {
                  res.json({
                    messagge: title + ' Password Update',
                    variant: 'success',
                  });
                })
                .catch((err) => {
                  console.log(err);
                  res.json({
                    messagge: 'Error: ' + err,
                    variant: 'error',
                  });
                });
            });
        } else {
          console.error('no user exists in db to update');
          res.status(401).json('no user exists in db to update');
        }
      });
    });
  }
);
// update data by id
router
  .route('/:id')
  .post(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role;
      if (rolesControl[roleTitle + 'edit']) {
        User.findByIdAndUpdate(req.params.id, req.body)
          .then(() =>
            res.json({
              messagge: title + ' Update',
              variant: 'success',
            })
          )
          .catch((err) =>
            res.json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else if (rolesControl[roleTitle + 'onlyyou']) {
        User.findOneAndUpdate(
          {
            _id: req.params.id,
            'created_user.id': `${req.user._id}`,
          },
          req.body
        )
          .then((resdata) => {
            if (resdata) {
              res.json({
                messagge: title + ' Update',
                variant: 'success',
              });
            } else {
              res.json({
                messagge: ' You are not authorized, go away!',
                variant: 'error',
              });
            }
          })
          .catch((err) =>
            res.json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else if (rolesControl['customersedit']) {
        User.findOneAndUpdate({
          $and: [
            { _id: req.params.id },
            { 'isCustomer': true },
          ],
        }).then((data) => {

            console.log(data[0])
            res.json(data);
          })
          .catch((err) =>
            res.json({ 
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      }else {
        res.status(403).json({
          message: {
            messagge: 'You are not authorized, go away!',
            variant: 'error',
          },
        });
      }
    });
  });

/*
router
  .route('/customer/:id')
  .post(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      User.findByIdAndUpdate(req.params.id, req.body)
        .then(() =>
          res.json({
            messagge: title + ' Update',
            variant: 'success',
          })
        )
        .catch((err) =>
          res.json({
            messagge: 'Error: ' + err,
            variant: 'error',
          })
        );
    });
  }); */

module.exports = router;
