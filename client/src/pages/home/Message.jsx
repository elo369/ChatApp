import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const Message = ({ messageDetails }) => {
  const messageRef = useRef(null);

  const { userProfile, selectedUser } = useSelector((state) => state.userReducer)

  if (!userProfile || !selectedUser) return null;

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const isOwner = userProfile?._id === messageDetails?.senderId;

  const messageClass = isOwner ? "chat-end" : "chat-start";
  // ${userProfile?._id?.toString() === messageDetails?.senderId?.toString()
  //   ? "chat-end"
  //   : "chat-start"
  // }
  return (
    <>
      <div
        ref={messageRef}
        className={`chat 
          ${messageClass}
           text-xs sm:text-base`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={
                userProfile?._id === messageDetails?.senderId
                  ? userProfile?.avatar
                  : selectedUser?.avatar
              }
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50">8:08</time>
        </div>
        <div className="chat-bubble">{messageDetails?.message}</div>
      </div>

    </>
  )
}

export default Message
