import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/Contacts';
import axios from 'axios';
import { allUsersRoute, host } from '../utils/APIRoutes';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from "socket.io-client";


function Chat() {

  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function setUserSession() {
      if (!localStorage.getItem('whisper-pal-user'))
        navigate("/login");
      else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem('whisper-pal-user')
          )
        );
        setIsLoaded(true);
      }
    }
    setUserSession();

  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    async function checkUserAvatar() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    }
    checkUserAvatar();
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
          {isLoaded && currentChat === undefined ? (
            <Welcome currentUser={currentUser}></Welcome>) : (
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}></ChatContainer>
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 320px) and (max-width: 480px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat