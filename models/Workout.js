const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlanSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
              type: String,
              trim: true,
            },
            name: {
              type: String,
              trim: true,
            },
            duration: {
                type: Number,
                default: 0
            },
            weight: {
              type: Number,
              default: 0
            },
            reps: {
              type: Number,
              default: 0
            },
            sets: {
              type: Number,
              default: 0
            },
            distance: {
              type: Number
            }
        }
    ]
});

const Plan = mongoose.model("Plan", PlanSchema);

module.exports = Plan;