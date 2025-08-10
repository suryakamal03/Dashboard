    const RegisterSchema = require('../schema/Userschema.js');
    const bcrypt = require('bcryptjs');
    const generateToken = require('../token/token.js');

    const RegisterUser = async (req, res) => {
        try {
            const { name, email, password } = req.body;

            // FIX: Added a 'return' to stop the function
            if (!name || !email || !password) {
                return res.status(400).json({ message: 'PLEASE FILL ALL THE FIELD' });
            }

            const existing_user = await RegisterSchema.findOne({ email: email });
            if (existing_user) {
                return res.status(400).json({ message: 'THE USER ALREADY REGISTERED' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashed_password = await bcrypt.hash(password, salt);

            const Final_user = await RegisterSchema.create({
                name: name,
                email: email,
                password: hashed_password,
            });

            if (Final_user) {
                res.status(201).json({
                    id: Final_user._id,
                    name: Final_user.name,
                    email: Final_user.email,
                    token: generateToken(Final_user._id),
                });
            } else {
                res.status(400).json({ message: 'PROBLEM IN FINAL_USER' });
            }
        } catch (err) {
            console.error(err); // FIX: Corrected to console.error
            res.status(500).json({ message: 'ERROR IN REGISTER USER' }); // FIX: Correct status code
        }
    };

    const LoginUser = async (req, res) => {
        try {
            const { email, password } = req.body;

            // FIX: Correct validation to check if EITHER field is missing
            if (!email || !password) {
                return res.status(400).json({ message: "FILL THE EMAIL AND PASSWORD FIELD" });
            }

            const email_Exist = await RegisterSchema.findOne({ email: email });

            if (email_Exist && (await bcrypt.compare(password, email_Exist.password))) {
                res.status(200).json({
                    id: email_Exist._id,
                    name: email_Exist.name, // This should match your schema (name vs username)
                    email: email_Exist.email,
                    token: generateToken(email_Exist._id),
                });
            } else {
                res.status(401).json({ message: "EMAIL AND PASSWORD WRONG" });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "ERROR IN LOGIN FUNCTION" });
        }
    };
    const verifyToken = async (req, res) => {
    try {
        // If we reach here, the token is valid (protect middleware already verified it)
        res.json({
        success: true,
        message: 'Token is valid',
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email
        }
        });
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ 
        success: false, 
        message: 'Token verification failed' 
        });
    }
    };
    module.exports = { RegisterUser, LoginUser ,verifyToken};