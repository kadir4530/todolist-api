const router = require("express").Router();
let Hour = require("../models/hourModel");

router.route('/').get((req, res) => {
    Hour.find()
        .then(hour => res.json(hour))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
    const hour = req.body.hour;
    const newHour = new Hour({ hour });
    newHour.save()
        .then(() => res.json('Hour added'))
        .catch(err => res.status(400).json('Error:' + err))

});

router.route('/update/:id').put((req, res) => {
    Hour.findById(req.params.id)
        .then(p => {
            p.hour = req.body.hour;
            p.save()
                .then(() => res.json('Hour updated!'))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err));
})

router.route('/:id').delete((req, res) => {
    Hour.findByIdAndDelete(req.params.id)
        .then(() => res.json("Hour deleted"))
        .catch(err => res.status(400).json("Error: " + err));
});
module.exports = router;