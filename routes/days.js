const router = require("express").Router();
let Day = require("../models/dayModel");

router.route('/').get((req, res) => { 
    Day.find()
        .then(day => res.json(day))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const dayName = req.body.dayName;
    const newDay = new Day({ dayName });
    newDay.save()
        .then(() => res.json('Day added'))
        .catch(err => res.status(400).json('Error:' + err))

});

router.route('/update/:id').put((req, res) => {
    Day.findById(req.params.id)
        .then(p => {
            p.dayName = req.body.dayName;
            p.save()
                .then(() => res.json('Day updated!'))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err));
})
module.exports = router;