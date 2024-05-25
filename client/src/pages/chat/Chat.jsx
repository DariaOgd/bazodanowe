import React from 'react';
import "./Chat.scss";
import Footer from "../../components/Footer";
import NavbarDefault from "../../components/navbar/NavbarDefault";
import { Link } from 'react-router-dom';

const Chat = () => {
  return (
    <div>
      <NavbarDefault></NavbarDefault>
      <div className='chat'>
        <div className='container'>
          <span className="breadcrumbs">
            <Link to="/messages" className='link'>MESSAGES</Link> >  <Link to="/profile" className='link'>PAWEŁ</Link> >
          </span>
          <h3 id="chat-heading">YOU ARE CHATTING WITH: <Link to="/profile" className='link'>PAWEŁ</Link> </h3>
          <div className="messages">
            <div className="item">
              <img src="../user-icon.png" id="user-icon" alt="userIcon"></img>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id nunc viverra, bibendum ante ac, ullamcorper urna. 
              Ut nibh massa, maximus sit amet dui non, posuere condimentum purus. Mauris eleifend nisi lacinia, eleifend massa sed, 
              malesuada libero. Pellentesque in auctor velit. 
              </p>
            </div>
            <div className="item owner">
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id nunc viverra, bibendum ante ac, ullamcorper urna. 
              Ut nibh massa, maximus sit amet dui non, posuere condimentum purus. Mauris eleifend nisi lacinia, eleifend massa sed, 
              malesuada libero. Pellentesque in auctor velit. 
              </p>
            </div>
            <div className="item">
              <img src="../user-icon.png" id="user-icon" alt="userIcon"></img>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id nunc viverra, bibendum ante ac, ullamcorper urna. 
              Ut nibh massa, maximus sit amet dui non, posuere condimentum purus. Mauris eleifend nisi lacinia, eleifend massa sed, 
              malesuada libero. Pellentesque in auctor velit. 
              </p>
            </div>
            <div className="item owner">
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id nunc viverra, bibendum ante ac, ullamcorper urna. 
              Ut nibh massa, maximus sit amet dui non, posuere condimentum purus. Mauris eleifend nisi lacinia, eleifend massa sed, 
              malesuada libero. Pellentesque in auctor velit. 
              </p>
            </div>
            <div className="item">
              <img src="../user-icon.png" id="user-icon" alt="userIcon"></img>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id nunc viverra, bibendum ante ac, ullamcorper urna. 
              Ut nibh massa, maximus sit amet dui non, posuere condimentum purus. Mauris eleifend nisi lacinia, eleifend massa sed, 
              malesuada libero. Pellentesque in auctor velit. 
              </p>
            </div>
            <div className="item owner">
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id nunc viverra, bibendum ante ac, ullamcorper urna. 
              Ut nibh massa, maximus sit amet dui non, posuere condimentum purus. Mauris eleifend nisi lacinia, eleifend massa sed, 
              malesuada libero. Pellentesque in auctor velit. 
              </p>
            </div>
            <div className="item">
              <img src="../user-icon.png" id="user-icon" alt="userIcon"></img>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id nunc viverra, bibendum ante ac, ullamcorper urna. 
              Ut nibh massa, maximus sit amet dui non, posuere condimentum purus. Mauris eleifend nisi lacinia, eleifend massa sed, 
              malesuada libero. Pellentesque in auctor velit. 
              </p>
            </div>
            <div className="item owner">
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id nunc viverra, bibendum ante ac, ullamcorper urna. 
              Ut nibh massa, maximus sit amet dui non, posuere condimentum purus. Mauris eleifend nisi lacinia, eleifend massa sed, 
              malesuada libero. Pellentesque in auctor velit. 
              </p>
            </div>
          </div>
         <hr/>
          <div className="write">
            <textarea name="" id="" placeholder="write a message" cols="30" rows="10"></textarea>
            <button>Send</button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Chat
