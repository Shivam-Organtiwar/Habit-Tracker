const express = require('express');
const router = express.Router();
const User = require('../models/User')


router.get('/sign-in', function(req, res){
    res.render('sign-in')
});

router.get('/sign-up', function(req, res){
    res.render('sign-up')
});

router.post('/sign-up', function(req, res){
    const { name, email } = req.body;

    let errors = [];
    if (!name || !email) {
        errors.push({ msg: 'Enter Everything' });
    }

    if (errors.length > 0) {
        res.render('sign-up', { errors, name, email });
    } else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email Exists' });
                res.render('sign-up', { errors, name, email });
            } else {
                const newUser = new User({ name, email });

                newUser
                    .save()
                    .then(user => {
                        req.flash(
                            'success_msg',
                            'You are now registered and can log in'
                        );
                        res.redirect('/users/sign-in');
                    })
                    .catch(err => console.log(err));
            }
        });
    }
});

router.post('/sign-in', function(req, res){
    const { name, email } = req.body;
    User.findOne({
        email: email
    }).then(user => {
        if (!user) {
            let errors = [];
            errors.push({ msg: 'Register Your Name First' });
            res.render('sign-in', { errors, name, email });
        }
        else {
            res.redirect(`/home?user=${user.email}`);
        }
    });

});


router.get('/logout', (req, res) => {
    // req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/sign-in');
});

module.exports = router;