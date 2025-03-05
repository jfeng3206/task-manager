import pool from '../config/db.js'
import { StatusCodes } from 'http-status-codes';
import { hashPassword, comparePassword  } from "../utils/passwordUtils.js";
import { UnauthenticatedError,  } from '../errors/customErrors.js';
import { createJWT } from '../utils/tokenUtils.js';


export const register = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
    const { name, email } = req.body;
    const userCountResult = await pool.query('SELECT COUNT(*) FROM users');
    const isFirstUser = parseInt(userCountResult.rows[0].count) === 0;
    const role = isFirstUser ? 'admin' : 'user';
    const response = await pool.query(
      'INSERT INTO users(name, email, password, role) VALUES($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, hashedPassword, role]
    );
  res.status(StatusCodes.CREATED).json({
    message: 'User Added Successfully',
    body:{
        user:{name,email,role}
    }
});
};


export const login =async (req, res) => {
  const { email, password } = req.body;
    const result = await pool.query(
      'SELECT id, password, role FROM users WHERE email = $1',
      [email]
    );
    const user = result.rows[0];
    if (!user) {
      throw new UnauthenticatedError('No such user');
    }
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new UnauthenticatedError('Invalid credentials');
    }
    const token = createJWT({userId: user._id, role: user.role});

  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie('token', token, {
    //This option makes the cookie inaccessible to JavaScript running in the browser. 
    // This helps to prevent cross-site scripting (XSS) attacks, which can be used to steal cookies and other sensitive information.
    httpOnly: true,

    //expires: new Date(Date.now() + oneDay): This option sets the expiration time for the cookie. 
    // In this case, the cookie will expire one day from the current time (as represented by Date.now() + oneDay).
    expires: new Date(Date.now() + oneDay),

    //secure: process.env.NODE_ENV === 'production': This option determines whether the cookie should be marked as secure or not. 
    // If the NODE_ENV environment variable is set to "production", then the cookie is marked as secure, which means it can only be transmitted over HTTPS. 
    // This helps to prevent man-in-the-middle (MITM) attacks, which can intercept and modify cookies that are transmitted over unsecured connections.
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(StatusCodes.CREATED).json({ msg: 'user logged in' });
  };

  export const logout = (req, res) => {
    res.cookie('token', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
  };

