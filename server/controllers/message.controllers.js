import conversationModel from "../models/conversation.model.js";
import messageModel from "../models/message.model.js";
import { getSocketId, io } from "../socket/socket.js";
import { asyncHandler } from "../utilities/asyncHandler.js"
import { errorHandler } from "../utilities/errorHandler.js";

export const sendMessage = asyncHandler(async(req,res,next)=>{
  const senderId = req.user._id;
  const receiverId = req.params.receiverId;
  const message = req.body.message

  if (!senderId || !receiverId || !message) {
    return next(new errorHandler("All fields are required",400))
  }

  let conversation = await conversationModel.findOne({
    participation :{$all:[senderId,receiverId]}
  })

  if (!conversation) {
    conversation = await conversationModel.create({
      participation:[senderId,receiverId]
    })
  }

  const newMessage = await messageModel.create({
    senderId,
    receiverId,
    message
  })

  if (newMessage) {
    conversation.messages.push(newMessage._id)
    await conversation.save()
  }

  // socket.io
  let socketId = getSocketId(receiverId);
  io.to(socketId).emit("newMessage",newMessage)
   
  res.status(200)
     .json({
      success:true,
      Response:newMessage
     })
})

export const getMessages = asyncHandler(async(req,res,next)=>{
  const myId = req.user._id;
  const otherParticipantId = req.params.otherParticipantId;

  if (!myId || !otherParticipantId) {
    return next(new errorHandler("All fields are required", 400));
  }

  const conversation = await conversationModel.findOne({
    participation:{$all:[myId,otherParticipantId]}
  }).populate("messages");

  res.status(200).json({
    success: true,
    responseData: conversation,
  });
})