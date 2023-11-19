const feedback = require('../Models/feedbackModel');
const response = require('../Models/responseModel');

async function sendfeedback(req, res){
    try{
        const userID = req.user.id;
        const {feedback_text, feedback_for} = req.body;
        const newfeedback = await feedback.create();
        newfeedback.feedback_text = feedback_text;
        newfeedback.feedback_from = userID;
        newfeedback.feedback_for = feedback_for;
        newfeedback.save();
        res.status(201).json("your message has beed send");
    }catch(error){
        res.status(500).json("error in send feedback controller");
    }
};

async function sendresponse(req, res){
    try{
        const userID = req.user.id;
        const {response_text, response_to} = req.body;
        const newresponse = await response();
        newresponse.response_text = response_text;
        newresponse.response_from = userID;
        newresponse.response_to = response_to;
        newresponse.save();
        res.status(201).json("your response has beed send", newresponse);
    }catch(error){
        res.status(500).json("error in send response controller");
    }
};

async function getfeedback(req, res){
    try{
        const userID = req.user.id;
        const allfeedback = await feedback.find();
        const allresponse = await response.find({id : userID});
        res.status(200).json({allfeedback, allresponse});
    }catch(error){
        res.status(500).json("error in get feedback controller");
    }
};

async function getresponse(req, res){
    try{
        const userID = req.user.id;
        const allfeedback = await feedback.find({id : userID});
        const allresponse = await response.find({response_to : userID});
        res.status(200).json({allfeedback, allresponse});
    }catch(error){
        res.status(500).json("error in get response controller");
    }
};

module.exports = {
    sendfeedback,
    sendresponse,
    getfeedback,
    getresponse
}