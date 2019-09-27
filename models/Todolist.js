const mongoose = require('mongoose');

const TodolistSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Todolist', TodolistSchema)