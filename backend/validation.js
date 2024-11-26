// userValidation.js
const  z  = require('zod');

const userSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    roles: z.array(z.string()),  // Assuming roles is an array of strings
    status: z.enum(['Active', 'Inactive']),  // Assuming status is either 'active' or 'inactive'
});

module.exports = userSchema;
