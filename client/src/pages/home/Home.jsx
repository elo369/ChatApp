import React, { useEffect } from 'react'
import UserSidebar from './UserSidebar'
import MessageContainer from './MessageContainer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeSocket, setOnlineUsers } from '../../store/slice/socket/socket.slice'
import { setNewMessages } from '../../store/slice/message/message.slice'

const Home = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, userProfile } = useSelector(
    (state) => state.userReducer
  );

  const { socket } = useSelector((state) => state.socketReducer);

  useEffect(() => {
    if (!isAuthenticated || !userProfile?.id) return; 
    dispatch(initializeSocket(userProfile?._id));
  }, [isAuthenticated, userProfile]);
  
  
  // useEffect(()=>{
  //   if(!socket) return 
  //   socket.on("onlineUsers",(onlineUsers)=>{
  //     dispatch(setOnlineUsers(onlineUsers))
  //   })
  //   socket.on("newMessage",(newMessage)=>{
  //     dispatch(setNewMessages(newMessage))
  //   })
  //   return ()=>{
  //     socket.close()
  //   }
  // },[socket])
  
  useEffect(()=>{
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
        dispatch(setNewMessages(newMessage));
    };

    const handleOnlineUsers = (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
    };

    socket.on("onlineUsers", handleOnlineUsers);
    socket.on("newMessage", handleNewMessage);

    return ()=>{
        socket.off("onlineUsers", handleOnlineUsers);
        socket.off("newMessage", handleNewMessage);
    }
},[socket])


  return (
    <div className='flex'>
      <UserSidebar/>
      <MessageContainer/>
    </div>
  )
}

export default Home
