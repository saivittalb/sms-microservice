'use strict';

// require express rate limit
const rateLimit = require("express-rate-limit");

// applying rate limit of 1 hour
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes minutes
    max: 50, // limit each 'from' field to 50 requests per windowMs
    statusCode: 429,
    message: "Too many requests created from this 'from' field, please try again after an hour",
    headers: true
});

// create App function
module.exports = function(app) {
    var smsList = require('../controllers/controller');

    // SMS Routes

    // inbound request endpoint
    app
    .route("/inbound/sms")
    .post(smsList.inboundSMS)

    // outbound request endpoint
    app
    .route("/outbound/sms")
    .post(smsList.outboundSMS, limiter)

    // default response
    app
    .use(smsList.defaultResponse)
};
