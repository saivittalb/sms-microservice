'use strict';

// import mongoose
const mongoose = require("mongoose");

// declare schema and assign Schema class
const Schema = mongoose.Schema;

// create Schema instance and add schema properties
const SMSSchema = new Schema({
    from: {
        type: Number,
        required: true,
    },
    to: {
        type: Number,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
});

// create and export model
module.exports = mongoose.model("model", SMSSchema);
