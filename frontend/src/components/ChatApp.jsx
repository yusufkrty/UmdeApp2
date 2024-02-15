import React, { useState,useEffect } from 'react';
import io from 'socket.io-client';
//import './App.css'; // varsayılan bir CSS dosyası
const socket = io.connect('http://localhost:5000');

function App() {
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  //const [feedback, setFeedback] = useState('');
  //const socket = io.connect('http://localhost:5000');

  //Burada ise parantez içine mesaj yazdığımız için her mesaj gönderdiğimizde socket.io tekrar çalıştırılır 
  /*useEffect(() => {
    // Yeni bir mesaj alındığında
    socket.on('chat', (data) => {
      setMessages([...messages, { sender: data.sender, message: data.message }]);
    });*/

    useEffect(() => {
      // Yeni bir mesaj alındığında
      socket.on('chat', data => {
        console.log(data.message);
        const newMessage = { sender: data.sender, message: data.message };
        // Mevcut mesajları kontrol et
        const messageExists = messages.some(msg => msg.message === newMessage.message);
        // Eğer mesaj zaten mevcut değilse ekle
        if (!messageExists) {
          setMessages(prevMessages => [...prevMessages, newMessage]);
        }
      });
    
      return () => {
        socket.off('chat');
      };
    }, []);
    

  const handleChange = (e) => {
    if (e.target.id === 'sender') {
      setSender(e.target.value);
    } else if (e.target.id === 'message') {
      setMessage(e.target.value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (sender.trim() && message.trim()) {
      const newMessage = { sender: sender, message: message };
      // Mevcut mesajları kontrol et
      const messageExists = messages.some(msg => msg.message === newMessage.message);
      // Eğer mesaj zaten mevcut değilse ekle
      if (!messageExists) {
        setMessages(prevMessages => [...prevMessages, newMessage]);
      }
      // Socket üzerinden mesajı gönder
      socket.emit('chat', { sender, message });
      // Girdileri sıfırla
      setSender('');
      setMessage('');
    }
  };
  

  return (
    <div>
      <h2>Chat</h2>
      <div id="output">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}: </strong>
            <span>{msg.message}</span>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={sender}
          onChange={e => setSender(e.target.value)}
        />
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
export default App;
