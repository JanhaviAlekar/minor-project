import { hashPassword ,comparePassword} from "./authHelper.js";
import userModel from "./usermodel.js";
import JWT from "jsonwebtoken"

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;
        //validating
        if (!name) {
            return res.send({ message: "name is required" });
        }
        if (!email) {
            return res.send({ message: "email is required" });
        }
        if (!password) {
            return res.send({ message: "password is required" });
        }
        if (!phone) {
            return res.send({ message: "phone is required" });
        }
        if (!address) {
            return res.send({ message: "address is required" });
        }
        if (!answer) {
            return res.send({ message: "answer is required" });
        }

        //check user
        const existingUser = await userModel.findOne({ email });
        // existing user
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: " already registerd with this email ,try login"
            })
        }
        // registering user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({ name, email, password: hashedPassword, phone, address, answer }).save();

        res.status(201).send({
            success: true,
            message: "user registerd succesfully",
            user,
        });

    } catch (error) {
        console.log(error, "error in registration");
        res.status(500).send({
            success: false,
            message: "error in reg",
            error
        })
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validating
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "invalid username or password"
            })
        }
        //check user 
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "user not registered"
            })
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(500).send({
                success: false,
                message: "invalid password"
            })
        }
        //token
        const token = await JWT.sign({ _id: user._id }, "ojbhivgucfyxdrzseawqmlkjpoimnb", { expiresIn: '7d' });
        res.status(200).send({
            success: true,
            message: "LOGIN Successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        });


    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "error in login",
            error
        })
    }
};