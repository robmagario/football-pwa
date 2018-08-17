const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

function generateToken(user) {
  var u = {
    email:user.email,
    admin: user.isAdmin,
    _id: user._id.toString(),
  };
  return token = jwt.sign(u, 'secretkeyhere', {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}

module.exports = (app) => {
  /*
   * Sign up
   */
  app.post('/api/account/signup', (req, res, next) => {
    const { body } = req;
    const {
      password
    } = body;
    let {
      email
    } = body;
    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }

    email = email.toLowerCase();
    email = email.trim();

    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    User.find({
      email: email
    }, (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: 'Error: Account already exist.'
        });
      }

      // Save the new user
      const newUser = new User();

      newUser.email = email;
      newUser.password = newUser.generateHash(password);

      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        var token = generateToken(user);
        return res.send({
          success: true,
          message: 'Signed up',
          user:user,
          token:token
        });
      });
    });

  });

  app.post('/api/account/signin', (req, res, next) => {
    const { body } = req;
    const {
      password
    } = body;
    let {
      email
    } = body;


    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }

    email = email.toLowerCase();
    email = email.trim();
    User.findOne({email:email})
      .exec(function(err,user){
          if (err) throw err;
          if (!user) {
            return res.send({
              error: true,
              message: "Email or password incorrect"
            });
          }
          bcrypt.compare(password, user.password, function (err, valid) {
            if (!valid) {
              return res.send({
                error: true,
                message: "Email or password incorrect"
              });
            }
            // Otherwise correct user
            var token = generateToken(user);
            return res.send({
              success: true,
              message: "Signed in!",
              user: user,
              token: token

            });
          });
        });


    });


  app.get('/api/account/verify', (req, res, next) => {
    // Get the token
    var token = req.body.token||req.query.token;
    // ?token=test
    if(!token){
      return res.send({
        success:false,
        message:"Must pass a token"
      });}
      jwt.verify(token,'secretkeyhere',function(err,user){
        if(err)throw err;
        User.findById({_id:user._id},function(err,user){
          if(err) throw err;
          var token = generateToken(user);
          return res.send({
            success:true,
            message:"Verified",
            token:token,
            user:user
          })
        })
      })

    // Verify the token is one of a kind and it's not deleted.


  });

  app.get('/api/account/logout', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test

    // Verify the token is one of a kind and it's not deleted.

    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set: {
        isDeleted:true
      }
    }, null, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }

      return res.send({
        success: true,
        message: 'Good'
      });
    });
  })
};
