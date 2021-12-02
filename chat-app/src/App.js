import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faUsers, faPen } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './components/searchBar';
import UserContainer from './components/users';
import GroupContainer from './components/groups';
import ChatHeader from './components/chatHeader';
import ChatTyping from './components/chatTyping';
import NameInput from './components/nameInput';
import { generateName } from './components/nickNameGen';
import { actualizar, obtener, agregarUser, agregarGroup, consultar, addGroupChat } from './indexedDB';


function App() {

  const [userNickname, setUserNickname] = useState(null);
  const [newNickname, setNewNickname] = useState(false);
  const [selectedOption, setSelectedOption] = useState('users');
  const [usersOnline, setUsersOnline] = useState([]);
  const [groupsOnline, setGroupsOnline] = useState([]);
  const [selectedChat, setSelectedChat] = useState('');
  const [search, setSearch] = useState('');
  const [chatHeader, setChatHeader] = useState('');
  const [clasificacion, setClasificacion] = useState('chat');
  const [chatInfo, setChatInfo] = useState([{from: 'Admin', text: 'Welcome'}]);


  useEffect(() => {
    window.addEventListener('storage', () => {
      // When local storage changes, dump the list to
      // the console.
      console.log('algo cambio');
    });
    
    setTimeout(() => {
      if (!userNickname) {
        const newNickname = generateName();
        agregarUser("users", { Id: newNickname, name: newNickname,});
        setUserNickname(newNickname);
        localStorage.setItem("userLogged", newNickname);
        console.log(localStorage.getItem("userLogged"), newNickname);
        setUsersOnline(consultar("users"));
        setGroupsOnline(consultar("groups"));
        console.log(consultar("users"));
      }
    }, 3000);
  }, [])

  const handleChange = (e) => {
    const { value } = e.target
    console.log(value);
    if (value !== "") {
      agregarGroup("groups", { Id: value, content: [{from: 'Admin', text: 'Welcome, enjoy the chat'}] });
    }
  }

const showUsers = (users) => users.map((userOnline) => <UserContainer user={userOnline} setChatHeader={setChatHeader} setSelectedChat={setSelectedChat} agregarGroup={agregarGroup} setClasificacion={setClasificacion} setChatInfo={setChatInfo} obtener={obtener}/>);
const showGroups = (groups) => groups.map((groupOnline) => <GroupContainer group={groupOnline} setChatHeader={setChatHeader} setSelectedChat={setSelectedChat} setClasificacion={setClasificacion} setChatInfo={setChatInfo} obtener={obtener}/>);
const showChat = (chat) => chat.map((elem) => (
  <Chattext>
    <p><strong>{elem.from}</strong></p>
    <p>{elem.text}</p>
  </Chattext> ));

console.log(search);
console.log(usersOnline);
return (
  <PageContainer>
    <HeaderContainer>
      <ChatControl>
        <ControlHeader>
          <div>
            {newNickname ? <NameInput placeholder={userNickname} setUserNickname={setUserNickname} setNewNickname={setNewNickname} newNickname={newNickname} actualizar={actualizar} /> : <p>{userNickname}</p>}
            <FontAwesomeIcon icon={faPen} onClick={() => { setNewNickname(true); console.log(usersOnline); }} />
          </div>
          <div>
            <FontAwesomeIcon icon={faUserAlt} onClick={() => { setSelectedOption('users') }} />
            <FontAwesomeIcon icon={faUsers} onClick={() => { setSelectedOption('groups') }} />
          </div>
        </ControlHeader>

        <SearchBar usersOnline={usersOnline} setSearch={setSearch} />

        {(selectedOption === 'users' && search !== '') ? (showUsers(search)) :
          (selectedOption === 'users') ? (showUsers(usersOnline)) :
              (<div>
                {showGroups(groupsOnline)}
                <p>Crear grupo</p>
                <input
                type="text"
                placeholder="Search..."
                onBlur={handleChange}
                ></input>
                </div>)}
      </ChatControl>

      <ChatMessages>
        <ChatHeader selected={chatHeader} />
        <Chatselected>
              {showChat(chatInfo)} 
        </Chatselected>
        <ChatTyping selectedGroup={selectedChat} addGroupChat={addGroupChat} clasificacion={clasificacion}/>
      </ChatMessages>
    </HeaderContainer>

  </PageContainer>
);
}

const PageContainer = styled.div`
	width: 75rem;
  height: 50rem;
  margin: auto;
	background: #fff;
`;

const HeaderContainer = styled.div`
	height: fit-content;
  display: flex;
	background: #fff;
  border: 1px solid #E5E5E5;
`;

const ChatControl = styled.div`
	flex: 30;
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
const Chatselected = styled.div`
	height: 70%;
	background: none;
  overflow-y: scroll;
`;

const Chattext = styled.div`
	width: 70%;
	background: #fff;
    margin: auto;
`;

export default App;
