const Workout = require("../models/Workout");
const router = require("express").Router();

router.get("/api/workouts", (req, res) => {
    Workout.find({}).then(workoutdb => {
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
    Workout.findOneAndUpdate(
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
    Workout.create(body).then((workoutdb => {
        res.json(workoutdb);
    })).catch(err => {
        res.json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
    Workout.find({}).then(workoutdb => {
        res.json(workoutdb);
    }).catch(err => {
        res.json(err);
    });
});

module.exports = router;