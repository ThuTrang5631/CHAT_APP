import User from "../models/user.model";

export const getUsersForSideBar = async (req, res) => {
    try {
        const loggedUserId = req.body._id;
        const filteredUsers = await User.find({_id: {$ne: loggedUserId}}).select("-password");
        res.status(400).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSideBar controller", error.message);
        res.status(500, {message: 'Internal Server Error'})
    }
}