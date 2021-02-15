const router = require("express").Router();
const { json } = require("body-parser");
const { response } = require("express");
let ToDoList = require("../models/todolistModel");

router.route('/').get((req, res) => {
    ToDoList.find()
        .then(todo => res.json(todo))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:activityid').post((req, res) => {
    const activityid = req.params.activityid;
    const activities = req.body.activities ? req.body.activities : null;

    ToDoList.update({ "activities._id": activityid },
        { $set: { "activities.$.activityName": activities[0].activityName } },
        (err, result) => {
            if (err) {
                res.status(500)
                    .json({ error: 'Unable to update competitor.', });
            } else {
                res.status(200)
                    .json(result);
            }
        }
    )
});

router.route('/add/:id').post((req, res) => {
    const id = req.params.id;
    const activities = req.body.activities ? req.body.activities : null;


    ToDoList.findByIdAndUpdate(id,
        {
            $addToSet: {
                "activities": activities
            }
        }).then(() => res.json('Activity added!'))
        .catch(err => res.status(400).json("Error: " + err));

});

router.route('/add').post((req, res) => {
    const day = req.body.day
    console.log(day)

    ToDoList.find({ day: day }, function (err, docs) {
        if (docs.length) {
            console.log('var');
            res.status(500).json("Kayit zaten mevcut")
        } else {
            const newTodolist = new ToDoList({ day });
            newTodolist.save()
                .then(() => res.json('ToDoList added'))
                .catch(err => res.status(400).json('Error:' + err))

        }
    });

})


module.exports = router;