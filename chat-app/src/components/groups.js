import React from 'react';
import styled from 'styled-components';

export default function GroupContainer(props) {
  const groupOnline = props.group;
  const setChatHeader = props.setChatHeader;
  const setSelectedChat = props.setSelectedChat;
  const setClasificacion = props.setClasificacion;
  setClasificacion('groups')

  const handleClick = (e) => {
    const selected = e.target.innerText;
    setChatHeader(selected);
    setSelectedChat(selected)
  }

  return (
      <Groupcontainer>
        <p onClick={handleClick}>{groupOnline.Id}</p>
      </Groupcontainer>
  );
}

const Groupcontainer = styled.div`
    height: 3rem;
    border-top: 0.5px solid #E5E5E5;
    box-sizing: border-box;
  `;