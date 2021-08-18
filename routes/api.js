const workout = require("../models/workout");
const router = require("express").Router();

router.get("/api/workouts", (req, res) => {
    workout.find({}).then(workoutdb => {
        workoutdb.forEach(workout => {
            var total = 0;
            workout.exercises.forEach(exercise => {
                total += exercise.duration;
            });
            workout.totalDuration = total;
        });
        res.json(workoutdb);
    }).catch(err => {
        res.json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
    workout.findOneAndUpdate(
        { 
            _id: req.params.id },
        {
            $inc: { totalDuration: req.body.duration },
            $push: { exercises: req.body }
        },
        { new: true }).then(workoutdb => {
            res.json(workoutdb);
        }).catch(err => {
            res.json(err);
        });
});

router.post("/api/workouts", ({ body }, res) => {
    workout.create(body).then((workoutdb => {
        res.json(workoutdb);
    })).catch(err => {
        res.json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
    workout.find({}).then(workoutdb => {
        res.json(workoutdb);
    }).catch(err => {
        res.json(err);
    });
});

module.exports = router;