import { useEffect, useRef, useState } from 'react';
import { Chat } from 'react-jwchat'
import { io } from 'socket.io-client';
import { v4 } from 'uuid';
import './App.css';
import { contact, my, messageList } from "./data";
import DisplayWrapper from "./DisplayWrapper";

function App() {
  const [chatListData, setChatListData] = useState(messageList)
  const socket = useRef(io('http://localhost:3001'));
  const timeOut = useRef(null);

  socket.current.on('getMessage', (res) => {
    if (timeOut.current) {
      clearTimeout(timeOut.current);
    }
    setChatListData([...chatListData, {
      message: {type: 'text', content: res},
      user: contact,
      data: new Date().valueOf(),
      _id: v4()
    }])
  })

  useEffect(() => {
    socket.current.on('connect', () => {
      console.log('Connected to server.');
    });
  }, [])

  const sendMessage = (msg) => {
    socket.current.emit('sendMessage', msg);
    if (timeOut.current) {
      clearTimeout(timeOut.current);
    }
    timeOut.current = setTimeout(() => {
      socket.current.emit('notReceive', msg);
    }, 5000)
  } 

  return (
    <DisplayWrapper>
      <Chat
        contact={contact}
        me={my}
        chatList={chatListData}
        onSend={(msg) => {setChatListData([...chatListData, msg]); sendMessage(msg);}}
        onEarlier={() => console.log('EarlierEarlier')}
        style={{
          width: 600,
          height: 500,
          borderRadius: 5,
          border: '1px solid rgb(226, 226, 226)'
      }}
      />
    </DisplayWrapper>
  )
}

export default App;
