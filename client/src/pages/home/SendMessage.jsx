import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMessageThunk, sendMessageThunk } from '../../store/slice/message/message.thunk'
import { IoIosSend } from "react-icons/io";


const SendMessage = () => {
    const dispatch = useDispatch()
    const {selectedUser} = useSelector((state)=> state.userReducer)
    const [message,setMessage] = useState("")

    const handleSendMessage = ()=>{
          if(!message.trim()) return
          
           dispatch(sendMessageThunk({
            receiverId:selectedUser?._id,
            message
          }))
          .then(()=>{
                    dispatch(getMessageThunk({receiverId:selectedUser?._id}))
          })
          console.log("sendMessage",{
            receiverId:selectedUser?._id,
            message
          })
          setMessage("")
    }

  return (
    <div className="w-full p-3 flex gap-2">
      <input
        type="text"
        placeholder="Type here..."
        className="input input-bordered input-primary w-full"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handleSendMessage}
        className="btn btn-square btn-outline btn-primary"
      >
        <IoIosSend />
      </button>
    </div>
  )
}

export default SendMessage
