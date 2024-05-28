import React, { useEffect, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./Chat.scss";
import Footer from "../../components/Footer";
import NavbarDefault from "../../components/navbar/NavbarDefault";
import { Link, useParams } from 'react-router-dom';
import newRequest from "../../utils/newRequest";

const Chat = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages", id],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (message) => newRequest.post(`/messages`, message),
    onSuccess: () => {
      queryClient.invalidateQueries(["messages", id]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const messagesRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const otherUserMessage = data.find(message => message.userId !== currentUser._id);

  return (
    <div className="chat-container">
      <NavbarDefault />
      <div className='chat'>
        <div className='container'>
          <span className="breadcrumbs">
            <Link to="/messages" className='link'>MESSAGES</Link> >
            {otherUserMessage && (
              <Link to={`/profile/${otherUserMessage.userId}`} className='link'>
                {otherUserMessage.userId}
              </Link>
            )}
          </span>
          <h3 id="chat-heading">YOU ARE CHATTING WITH: <Link to={`/profile/${otherUserMessage.userId}`} className='link'>{otherUserMessage.userId}</Link> </h3>
          <div className="messages" ref={messagesRef}>
            {data.map((m) => (
              <div className={m.userId === currentUser._id ? "owner item" : "item"} key={m._id}>
                <img src="../user-icon.png" id="user-icon" alt="userIcon"></img>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
          <hr />
          <form className="write" onSubmit={handleSubmit}>
            <textarea name="" id="" placeholder="write a message" cols="30" rows="10"></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Chat;


