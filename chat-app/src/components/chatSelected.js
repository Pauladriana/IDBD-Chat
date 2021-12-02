import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function ChatSelected(props) {

  const selectedChat = props.selectedGroup;
  const obtener = props.obtener;
  const clasificacion = props.clasificacion;

  const [groupInfo, setGroupInfo] = useState({content: [{from: 'Rosita', text: 'Hola'}]});

  useEffect(() => {
    setTimeout(() => {
      setGroupInfo(obtener(clasificacion, selectedChat));
    }, 2500);
  })
  
  console.log(groupInfo);
  
  return (
      <Chatselected>
            {groupInfo && groupInfo.content.map((elem) => (
              <Chattext key={elem}>
              <p><strong>{elem.from}</strong></p>
              <p>{elem.text}</p>
              </Chattext>
            ))}      
      </Chatselected>
  );
}

const Chatselected = styled.div`
	height: 70%;
	background: none;
`;

const Chattext = styled.div`
	width: 70%;
	background: #fff;
    margin: auto;
`;