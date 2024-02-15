import React, { useState,useEffect } from 'react';
import io from 'socket.io-client';
//import './App.css'; // varsayılan bir CSS dosyası
const socket = io('http://localhost:3000');

function App() {
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Yeni bir mesaj alındığında
    socket.on('chat', (data) => {
      setMessages([...messages, { sender: data.sender, message: data.message }]);
    });

    return () => {
      socket.off('chat');
    };
  }, [messages]);

  const handleChange = (e) => {
    if (e.target.id === 'sender') {
      setSender(e.target.value);
    } else if (e.target.id === 'message') {
      setMessage(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sender.trim() && message.trim()) {
      setMessages([...messages, { sender, message }]);
      setSender('');
      setMessage('');
    }
  };

  return (
    <div id="chat-wrap">
      <h2>Chat App</h2>
      <div id="chat-window">
        <div id="output">
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.sender}: </strong>
              <span>{msg.message}</span>
            </div>
          ))}
        </div>
        <div id="feedback"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="sender"
          placeholder="Ad"
          value={sender}
          onChange={handleChange}
        />
        <input
          type="text"
          id="message"
          placeholder="Mesaj"
          value={message}
          onChange={handleChange}
        />
        <button type="submit">Gönder</button>
      </form>
    </div>
  );
}

export default App;
