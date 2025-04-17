const {userModel , todo} = require("../models/userModel.js");
const { createTodoSchema, updateTodoSchema } = require("../validations/validateUser.js")

const getUserData = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({
            success: true,
            userData: {
                name: user.name,
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const createTodo = async(req, res) => {
    const createPayload = req.body;

    // verifying user input
    const parsePayload = createTodoSchema.safeParse(createPayload);
    if(!parsePayload){
        return res.json({success: false, message : "Invalid input"})
    }
     
    // put into mongodb
    try {
        
    await todo.create({
        title : createPayload.title,
        completed : false,
        user: req.user.id,
    })

    res.json({
        success : true, message: "Todo Created Successfully"
    })

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const isCompleted = async(req, res) => {
    const updatePayload = req.body;
    const parsePayload = updateTodoSchema.safeParse(updatePayload)
    if(!parsePayload){
        return res.json({success: false , message : "you inputted wrong id"})
    }

    // update in database

    await todo.updateOne({
        _id : req.body.id
    }, {
        completed: true,
    })
    res.json({
        message: "Todo Marked as completed"
    })
}
const getTodos = async(req, res) => {
    try {
        const todos = await todo.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json({ success: true, todos });
      } catch (error) {
        res.json({ success: false, message: error.message });
      }
}

module.exports = {
    getUserData,
    createTodo,
    isCompleted,
    getTodos,
}