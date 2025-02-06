
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:3000/'); // Connect to the Hono server

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // Log when connected
    socket.on('connect', () => {
      console.log('✅ Connected to WebSocket Server');
    });

    // Log when disconnected
    socket.on('disconnect', () => {
      console.log('❌ Disconnected from server');
    });

    // Log when a new message is received

    socket.on('chat message', (msg) => {
      console.log('📥 Received message:', msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    // Log when a new user is created
    socket.on('userCreated', (data) => {
      console.log('user saved in database:', data);
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });



    return () => {
      socket.off('userCreated');
      socket.off('chat message');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      console.log('📤 Sending message:', message);
      socket.emit('chat message', message);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
   
      <div className="chat-box">
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
