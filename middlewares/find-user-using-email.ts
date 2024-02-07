import User from "../schemas/user.schema";
const findUserUsingEmail = async (email: string) => {
    try {
        if (!email || typeof email !== 'string') throw new Error('Invalid email address');
        const _user = await User.findOne({ email });
        if (!_user) return null;
        const userId = _user._id.toString();
        const user = {
            _id: userId,
            email: _user.email,
            firstName: _user.firstName,
            lastName: _user.lastName,
            address: _user.address,
            phoneNumber: _user.phoneNumber,
            password: _user.password,
        };
        return user;
    } catch (error) {
        return null;
    }
};
export default findUserUsingEmail;