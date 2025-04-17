
// validating user input by using zod library

const {z} = require('zod');

const validateUser = z.object({
    name : z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
});

const createTodoSchema = z.object({
    title: z.string(),
})

const updateTodoSchema = z.object({
    id: z.string()
})

module.exports = {
    validateUser,
    createTodoSchema,
    updateTodoSchema,
};