import Message from "../models/message.model.js";
import User from "../models/user.model.js";

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

export const getMessages = async(req, res) => {
    try {
        const {id: userToChatId} = req.params;
        const myId = req.user._id;
        // find all messages which two chat with other
        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId}
            ]
        })

        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessages controller", error.message);
        res.status(500, {message: 'Internal Server Error'})
    }
}