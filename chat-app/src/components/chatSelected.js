import React, { useState } from 'react';
import styled from 'styled-components';

export default function ChatSelected(props) {

  const selectedGroup = props.selectedGroup;
  const obtener = props.obtener;
  console.log(selectedGroup);
  const [groupInfo, setGroupInfo] = useState({content: [{from: 'Rosita', text: 'Hola'}]});
  setTimeout(() => {
    setGroupInfo(obtener("groups", selectedGroup));
  }, 2500);

  console.log(groupInfo);

  return (
      <Chatselected>
            {groupInfo && groupInfo.content.map((elem) => (
              <Chattext key={elem.id}>
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