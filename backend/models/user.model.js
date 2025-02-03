import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: [6, 'Email must be at least 6 characters long'],
        maxLength: [50, 'Email must not be longer than 50 characters'],
    },

    password: {
        type: String,
        required: true, // Ensure password is required
        select: false, // Exclude password from query results by default
    },
});

// Pre-save middleware to hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash if the password is new/changed
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Static method to hash a password manually (optional use case)
userSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Method to validate the password
userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Method to generate JWT
userSchema.methods.generateJWT = function () {
    return jwt.sign(
        { email: this.email },
        'krishna', // Use environment variable or fallback
        { expiresIn: '24h' }
    );
};
 // Log the secret key for debugging

const User = mongoose.model('User', userSchema);

export default User;
