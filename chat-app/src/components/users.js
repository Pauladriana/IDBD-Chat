import React from 'react';
import styled from 'styled-components';

export default function UserContainer(props) {

  const user = props.user;
  const setChatHeader = props.setChatHeader;
  const agregarGroup = props.agregarGroup;
  const setClasificacion = props.setClasificacion;
  const setSelectedChat = props.setSelectedChat;
  setClasificacion('chat')

  const handleClick = (e) => {
    const selected = e.target.innerText;
    setChatHeader(selected);
    setSelectedChat(selected);
    if (selected !== "") {
      agregarGroup("chat", { Id: selected, content: [{from: 'Admin', text: 'Welcome, enjoy the chat'}] });
    }
  }
  return (
      <Usercontainer>
        <p onClick={handleClick}>{user.Id}</p>
      </Usercontainer>
  );
}

const Usercontainer = styled.div`
    height: 3rem;
    border-top: 0.5px solid #E5E5E5;
    box-sizing: border-box;
  `;