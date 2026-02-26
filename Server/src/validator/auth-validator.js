// import * as z from "zod";

// //create an object schema

// const signupSchema = z.object({
//     name: z.string({required_error: "Name is required"}).min(3, {message: "Name must be at least 3 characters long"}).max(100, {message: "Name must be at most 100 characters long"}).trim(),
//     email: z.string({required_error: "Email is required"}),
//     password: z.string({required_error: "Password is required"}),
//     gender: z.enum( ["Male", "Female", "Other"], {required_error: "Gender is required"} ),
//     className: z.string({required_error: "Class is required"}).min(2, {message: "Class must be at least 2 characters long"}).max(100, {message: "Class must be at most 100 characters long"}).trim(),
//     branch: z.string({required_error: "Branch is required"}).min(2, {message: "Branch must be at least 2 characters long"}).max(100, {message: "Branch must be at most 100 characters long"}).trim()
// });

// const loginSchema = z.object({
//     email: z.string({required_error: "Email is required"}).email({message: "Invalid email format"}).min(6, {message: "Password must be at least 6 characters long"}).max(100, {message: "Password must be at most 100 characters long"}).trim(), 
//     password: z.string({required_error: "Password is required"}).trim()
// });

// export { signupSchema , loginSchema};