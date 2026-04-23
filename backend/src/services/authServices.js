import { register, login } from "../controllers/authController";

export async function registerUser(req, res){
    const { userDetails} = req.body;

    try{
        const user = await register(userDetails);

        res.status(201).json({
            token: user.token,
            user: {
                name: user.name,
                email: user.email,
            },
        }); 
    }
    catch(err){
        res.status(400).json({ message: "User already exists" });
    }
}

export async function loginUser(req, res){
    const { email, password } = req.body;

    try{
        const user = await login(email, password);

        res.json({
            token: user.token,
            user: {
                name: user.name,
                email: user.email,
            },
        }); 
    }
    catch(err){
        res.status(400).json({ message: "Invalid credentials" });
    }
}