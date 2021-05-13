// import model
const SMSSchema = require("../models/model");

// import cache
const cache = require('memory-cache');

// saving keys in cache map
let cacheKeys = new Map()

// inboundSMS function - To check an inbound sms
exports.inboundSMS = async (req, res) => { 
    const appSecret = req.headers['app-secret'];
    if (appSecret === "Bearer " + process.env.TOKEN_SECRET) {
        let newSMS = new SMSSchema (req.body);
        if (newSMS.from) {
            if (newSMS.from.toString().length < 6 || newSMS.from.toString().length > 16) {
                res.status(400).json({
                    "message": "",
                    "error": "parameter 'from' is invalid"
                })
                return
            }
        } else {
            res.status(400).json({
                "message": "",
                "error": "parameter 'from' is missing"
            })
            return
        } 
        if (newSMS.to) {
            if (newSMS.to.toString().length < 6 || newSMS.to.toString().length > 16) {
                res.status(400).json({
                    "message": "",
                    "error": "parameter 'to' is invalid"
                })
                return
            }
        } else {
            res.status(400).json({
                "message": "",
                "error": "parameter 'to' is missing"
            })
            return
        } 
        if (newSMS.text) {
            if (newSMS.text.length < 1 || newSMS.text.length > 120) {
                res.status(400).json({
                    "message": "",
                    "error": "parameter 'text' is invalid"
                })
                return
            }
        } else {
            res.status(400).json({
                "message": "",
                "error": "parameter 'text' is missing"
            })
            return
        }
        if (newSMS.text.includes("STOP") || newSMS.text.includes("STOP\n") || newSMS.text.includes("STOP\r") || newSMS.text.includes("STOP\r\n")) {
            cache.put(newSMS.from, newSMS.to, 1.44e+7) //caching for 4 hours
            cacheKeys[newSMS.from] = newSMS.to
        }
        newSMS.save((inboundError) => {
            if (inboundError) {
                res.status(500).json({
                    "message": "",
                    "error": "unknown failure"
                });
                console.log(inboundError)
            } else {
                res.status(201).json({
                    "message": "inbound sms is ok",
                    "error": ""
                });
            }
        });
    } else {
        res.status(403).json({
            "message": "Forbidden. Authorization failed."
        });
    }
};

// outboundSMS function - To check an outbound sms
exports.outboundSMS = async (req, res) => {
    const appSecret = req.headers['app-secret'];
    if (appSecret === "Bearer " + process.env.TOKEN_SECRET) {
        let newSMS = new SMSSchema (req.body);
        if (newSMS.from) {
            if (newSMS.from.toString().length < 6 || newSMS.from.toString().length > 16) {
                res.status(400).json({
                    "message": "",
                    "error": "parameter 'from' is invalid"
                })
                return
            }
        } else {
            res.status(400).json({
                "message": "",
                "error": "parameter 'from' is missing"
            })
            return
        } 
        if (newSMS.to) {
            if (newSMS.to.toString().length < 6 || newSMS.to.toString().length > 16) {
                res.status(400).json({
                    "message": "",
                    "error": "parameter 'to' is invalid"
                })
                return
            }
        } else {
            res.status(400).json({
                "message": "",
                "error": "parameter 'to' is missing"
            })
            return
        } 
        if (newSMS.text) {
            if (newSMS.text.length < 1 || newSMS.text.length > 120) {
                res.status(400).json({
                    "message": "",
                    "error": "parameter 'text' is invalid"
                })
                return
            }
        } else {
            res.status(400).json({
                "message": "",
                "error": "parameter 'text' is missing"
            })
            return
        }
        if (cacheKeys[newSMS.from] == newSMS.to) {
            res.status(406).json({
                "message": "",
                "error": "sms from " + newSMS.from + " to " + newSMS.to + " is blocked by STOP request"
            })
            return
        } 
        newSMS.save((outboundError) => {
            if (outboundError) {
                res.status(500).json({
                    "message": "",
                    "error": "unknown failure"
                });
                console.log(outboundError)
            } else {
                res.status(201).json({
                    "message": "outbound sms is ok",
                    "error": ""
                });
            }
        });
    } else {
        res.status(403).json({
            "message": "Forbidden. Authorization failed."
        });
    }
};

// defaultResponse function - To set default response code.
exports.defaultResponse = async (req, res) => {
    res.status(405).json({
        "message": "Method Not Allowed"
    })
}
