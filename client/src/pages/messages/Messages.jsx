import React from 'react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import NavbarDefault from "../../components/navbar/NavbarDefault";
import Footer from "../../components/Footer";
import './Messages.scss';
import moment from "moment";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <NavbarDefault />
      <div className="container">
        <div className="title">
          <h1>Messages</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Last Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((c) => {
              // Ustal, który użytkownik jest inny
              const otherUserId = c.sellerId === currentUser._id ? c.buyerId : c.sellerId;
              const otherUserName = c.sellerId === currentUser._id ? c.buyerName : c.sellerName;

              return (
                <tr className="active" key={c.id}>
                  <td>
                    <Link className="link" to={`/profile/${ c.buyerId === currentUser._id ? c.sellerId : c.buyerId}`}>
                      { c.buyerId === currentUser._id ? c.sellerId : c.buyerId}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/chat/${c.id}`} className="link">
                    {c.lastMessage ? c.lastMessage.substring(0, 100) : "No messages yet..."}
                    </Link>
                  </td>
                  <td>{moment(c.updatedAt).fromNow()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div id="placeholder-div"></div>
      <Footer/>
    </div>
  );
}

export default Messages;