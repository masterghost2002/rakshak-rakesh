import User from "../schemas/user.schema";
const findUserUsingEmail = async (email: string) => {
    try {
        if(!email || typeof email !== 'string') throw new Error('Invalid email address');
        const user = await User.findOne({ email});
        return user;
    } catch (error) {
        return null;
    }
};
export default findUserUsingEmail;