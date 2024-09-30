import User, { IUser } from '../models/User';

// Function to create a new user with fullname included
export const createUser = async (
    username: string, 
    email: string, 
    password: string, 
    role: 'admin' | 'teacher' | 'student',
    fullname: string
): Promise<IUser | null> => {
    try {
        const user = new User({ username, email, password, role, fullname });
        await user.save();
        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
};

// Function to handle user login
export const userLogin = async (email: string, password: string): Promise<IUser | null> => {
    try {
        const user = await User.findOne({ email });
        if (!user) return null;
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return null;
        return user;
    } catch (error) {
        console.error('Error logging in user:', error);
        return null;
    }
};

// Function to get a user by email or fullname
export const getUserDetails = async (identifier: string): Promise<IUser | null> => {
    try {
        const user = await User.findOne({
            $or: [{ email: identifier }, { fullname: identifier }]
        });
        return user;
    } catch (error) {
        console.error('Error getting user details:', error);
        return null;
    }
};

// Change password
export const changePassword = async (
    email: string,
    oldPassword: string,
    newPassword: string
): Promise<IUser | null> => {
    try {
        const user = await User.findOne({ email });
        if (!user) return null;

        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) return null;

        await user.changePassword(newPassword);
        return user;
    } catch (error) {
        console.error('Error changing user password:', error);
        return null;
    }
};

// Reset password without using a token
export const resetPassword = async (
    email: string,
    newPassword: string
): Promise<{ success: boolean }> => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return { success: false };
        }

        await user.changePassword(newPassword);

        return { success: true };
    } catch (error) {
        console.error('Error resetting user password:', error);
        return { success: false };
    }
};
