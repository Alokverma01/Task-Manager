const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
})

const todoSchema = mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'user',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: String,
    completed: {
      type: Boolean,
      default: false
    }
  }, {
    timestamps: true 
  });

const userModel =  mongoose.models.user || mongoose.model('user' , userSchema);

const todo = mongoose.model("todo" , todoSchema);

module.exports = {
    userModel,
    todo,
}