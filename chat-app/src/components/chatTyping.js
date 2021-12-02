import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function ChatTyping(props) {
  const selectedGroup = props.selectedGroup;
  const addGroupChat = props.addGroupChat;
  const clasificacion = props.clasificacion;
  const [inputValue, setinputValue] = useState('');
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { value } = e.target
    if (value !== "") {
      setMessage(value);
      setinputValue(value)
    }
  }

  const handleClick = () => {
    const user = localStorage.getItem("userLogged");
    addGroupChat(clasificacion, selectedGroup, {from: user, text: message});
    setinputValue('')
  }
  return (
    <>
      <Chattyping>
        <Typingcontainer>
        <input type="text" 
        placeholder="Escribe tu mensaje aqui"
        value={inputValue}
        onChange={handleChange}></input>
        </Typingcontainer>
        <Send>
          <FontAwesomeIcon icon={faPaperPlane} onClick={handleClick}/>
        </Send>
      </Chattyping>
    </>
  );
}

const Chattyping = styled.div`
  height: 6.25rem;
  background: rgba(255, 255, 255, 0.46);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-around;
`;

const Typingcontainer = styled.div`
    width: 47rem;
    height: 1.8rem;
    background: #FFFFFF;
    border: none;
    border-radius: 30px;
    padding: 1rem;
    input {
      width: 44rem;
      outline: none;
      border: none;
      padding: 0 1rem;
      margin-right: 0.5rem;
    }
  }
`;

const Send = styled.div`
  height: 1.8rem;
  display: block;
  padding-top: 1rem;
  font-size: 1.5rem;
  margin-left: 1rem;
  color: #C027D9;
`;