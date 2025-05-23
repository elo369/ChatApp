import mongoose from "mongoose";

const conversationSchema = mongoose.Schema({
    participation:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Message'
        },
    ]
},{timestamps:true})


export default mongoose.model("Conversation",conversationSchema);