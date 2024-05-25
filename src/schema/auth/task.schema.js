import { z } from 'zod';

export const AuthSchemaRegister = z.object({
    username: z.string({
        required_error: 'Name is requerid', 
        invalid_type_error: 'Name must be a string'
    }).min(4, { message: 'Must be 4 or more characters long' })
    .max(10),
    email: z.string({
        required_error: 'Email is requerid',
    }).email({ message: "Invalid email address" }),
    password: z.string({required_error: 'Password is requerid',}).min(6, {message: 'Is password must be 6 or more characters long'})
});

export const AuthSchemaLogin = z.object({
    email: z.string({
        required_error: 'Email is requerid',
    }).email({ message: "Invalid email address" }),
    password: z.string({required_error: 'Password is requerid',}).min(6, {message: 'Must be 6 or more characters long'})
});
