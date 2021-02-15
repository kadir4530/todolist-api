const router = require("express").Router();
let User = require("../models/userModel");

router.route('/').get((req, res) => {
    User.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    console.log(userName)
    const newUser = new User({ userName, email, password });
    newUser.save()
        .then(() => res.json('User added'))
        .catch(err => res.status(400).json('Error:' + err))

});

router.route('/update/:id').put((req, res) => {
    User.findById(req.params.id)
        .then(p => {
            p.userName = req.body.userName;
            p.email = req.body.email;
            p.password = req.body.password;
            p.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err));
})

router.route('/:id').delete((req, res) => {
    console.log(req.params.id)
    User.findByIdAndDelete(req.params.id, function (err, docs) {
        if (err) {
            res.status(400).json("Error : " + err)
        }
        else {
            res.status(200).json("User Deleted")
        }
    })

});

module.exports = router;