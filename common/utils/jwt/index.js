import jwt from 'jsonwebtoken';

export const generateToken = async (user, expiresIn) => {
    const JWT_SECRET = process.env.JWT_SECRET || 'secret';
    const JWT_EXPIRES_IN = expiresIn;
    if (!user) return null;

    if(user.password) delete user.password;
    
    return jwt.sign(
        { userId: user._id }, 
        JWT_SECRET, 
        { expiresIn: JWT_EXPIRES_IN }
    );
}


export const generateRefreshToken = async (user, expiresIn) => {
    const JWT_SECRET = process.env.JWT_REFRESH_SECRET || 'refreshSecret';
    const JWT_EXPIRES_IN = expiresIn;
    if (!user) return null;

    if(user.password) delete user.password;

    return jwt.sign(

        { userId: user._id },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
}