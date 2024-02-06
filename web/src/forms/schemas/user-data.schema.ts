import * as z from 'zod';
// eslint-disable-next-line no-useless-escape
const indianPhoneNumberRegex = /^(?:\+91|91)?[6789]\d{9}$/;
export type UserDataFormType = {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
}
export type FormErrorType = {
    field: string | number;
    message: string;
}
const UserDataFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long'}),
    confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters long'}),
    firstName: z.string().min(3, { message: 'First name must be at least 3 characters long' }),
    lastName: z.string().min(3, { message: 'Last name must be at least 3 characters long' }),
    address: z.string().min(3, { message: 'Address must be at least 3 characters long' }),
    phoneNumber: z.string().refine(phoneNumber => indianPhoneNumberRegex.test(phoneNumber), {
        message: 'Must be a valid Indian phone number',
    })
});
export default UserDataFormSchema;