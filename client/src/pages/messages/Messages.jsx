import React from 'react'
import {Link} from "react-router-dom";
import NavbarDefault from "../../components/navbar/NavbarDefault";
import Footer from "../../components/Footer";
import './Messages.scss';


    const Messages = () => {
        
    
    const message = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
  maxime cum corporis esse aspernatur laborum dolorum? Animi
  molestias aliquam, cum nesciunt, aut, ut quam vitae saepe repellat
  nobis praesentium placeat.`;



  return (
    <div>
       <NavbarDefault></NavbarDefault>
       <div className="container">
        <div className="title">
          <h1>Messages</h1>
        </div>
        <table>
          <tr>
            <th>User</th>
            <th>Last Message</th>
            <th>Date</th>
          </tr>
          <tr className="active">
            <td>
                <Link className="link" to="/">
                    Paweł Nowak
                </Link>
            </td>
            <td>
              <Link to="/chat/123" className="link">
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td>1 hour ago</td>
          </tr>
          <tr className="active">
            <td> <Link className="link" to="/">
                    Michał Kowalski
                </Link></td>

            <td>
              <Link to="/chat/123" className="link">
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td>2 hours ago</td>
          </tr>
          <tr>
            <td> <Link className="link" to="/">
                    Marzena Paweł
                </Link></td>
            <td>
              <Link to="/chat/123" className="link">
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td>1 day ago</td>
          </tr>
          <tr>
            <td> <Link className="link" to="/">
                    Bartek Qwert
                </Link> </td>
            <td>
              <Link to="/chat/123" className="link">
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td>2 days ago</td>
          </tr>
        </table>
      </div>
      <Footer></Footer>
    </div>
  )

    }
export default Messages