import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function ChatTyping() {
  return (
    <>
      <Chattyping>
        <Typingcontainer>
        <FontAwesomeIcon icon={faSmile} />
        <input type="text" placeholder="Escribe tu mensaje aqui"></input>
        </Typingcontainer>
        <Send>
          <FontAwesomeIcon icon={faPaperPlane}/>
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
    }
    .send{
      height: 1.8rem;
      display: block;
      padding-top: 1rem;
      font-size: 1.5rem;
      color: #C027D9;
    }
  }
`;

const Send = styled.div`
  height: 1.8rem;
  display: block;
  padding-top: 1rem;
  font-size: 1.5rem;
  color: #C027D9;
`;