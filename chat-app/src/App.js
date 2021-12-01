import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faUsers, faPen } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './components/SearchBar';
import UserContainer from './components/users';
import GroupContainer from './components/groups';
import ChatHeader from './components/chatHeader';
import ChatTyping from './components/chatTyping';
import NameInput from './components/nameInput';
import { generateName } from './components/nickNameGen';
import { actualizar, obtener } from './indexedDB';


function App() {

  const [userNickname, setUserNickname] = useState('');
  const [newNickname, setNewNickname] = useState(false);
  const [selectedOption, setSelectedOption] = useState('users');

  
  useEffect(() => {
    setUserNickname(localStorage.getItem("userLogged"));
  }, [])
  return (
    <div>
      <HeaderContainer>
        <ChatControl>
          <ControlHeader>
            <div>
              {newNickname ? <NameInput placeholder={userNickname} setUserNickname={setUserNickname} setNewNickname={setNewNickname} actualizar={actualizar}/> : <p>{userNickname}</p>}
              <FontAwesomeIcon icon={faPen} onClick={() => { setNewNickname(true); obtener(28); }} />
            </div>
            <div>
              <FontAwesomeIcon icon={faUserAlt} onClick={() => { setSelectedOption('users') }} />
              <FontAwesomeIcon icon={faUsers} onClick={() => { setSelectedOption('groups') }} />
            </div>
          </ControlHeader>

          <SearchBar />

          {(selectedOption === 'users') ? <UserContainer /> : <GroupContainer />}
        </ChatControl>

        <ChatMessages>
          <ChatHeader selected={'hola'} />
          <ChatSelected></ChatSelected>
          <ChatTyping />
        </ChatMessages>
      </HeaderContainer>

    </div>
  );
}

const HeaderContainer = styled.div`
	width: 100vw;
	height: fit-content;
  display: flex;
	background: #fff;
  border: 1px solid #E5E5E5;
`;

const ChatControl = styled.div`
	flex: 30;
	height: 100vh;
	background: #fff;
`;

const ControlHeader = styled.div`
	height: 4.25rem;
	background: #fff;
  border: 1px solid #E5E5E5;
  padding: 1rem;
  display:flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.8rem;
  div{
    display: flex;
    align-items: center;
  }
  p{
    width: 180px;
  }
  svg{
    margin-left: 1rem;
  }
`;

const ChatMessages = styled.div`
	flex: 70;
	height: 100vh;
	background: linear-gradient(48.6deg, rgba(236, 128, 225, 0.62) 20.17%, rgba(93, 153, 197, 0.74) 71.07%);
`;

const ChatSelected = styled.div`
	height: 70%;
	background: none;
`;


export default App;
