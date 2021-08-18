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


module.exports = router;