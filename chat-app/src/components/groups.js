import React from 'react';
import styled from 'styled-components';

export default function GroupContainer(props) {
  const groupOnline = props.group;
  const setChatHeader = props.setChatHeader;
  const setSelectedChat = props.setSelectedChat;
  const setClasificacion = props.setClasificacion;
  const setChatInfo = props.setChatInfo;
  const obtener = props.obtener;
  setClasificacion('groups')

  const handleClick = (e) => {
    const selected = e.target.innerText;
    setChatHeader(selected);
    setSelectedChat(selected);
    console.log(selected);
    const newInfo = obtener("groups", selected);
    setChatInfo(newInfo);
    console.log(obtener("groups", selected));
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