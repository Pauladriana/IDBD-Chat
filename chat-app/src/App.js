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
import ChatSelected from './components/chatSelected';
import { generateName } from './components/nickNameGen';
import { actualizar, obtener, agregarUser, agregarGroup, consultar, addGroupChat } from './indexedDB';


function App() {

  const [userNickname, setUserNickname] = useState(null);
  const [newNickname, setNewNickname] = useState(false);
  const [selectedOption, setSelectedOption] = useState('users');
  const [usersOnline, setUsersOnline] = useState([]);
  const [groupsOnline, setGroupsOnline] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [search, setSearch] = useState('');
  const [chatHeader, setChatHeader] = useState('')


  useEffect(() => {
    setTimeout(() => {
      if (!userNickname) {
        const newNickname = generateName();
        agregarUser("users", { Id: newNickname });
        setUserNickname(newNickname);
        localStorage.setItem("userLogged", newNickname);
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
      agregarGroup("groups", { Id: value, content: [{from: 'Martha', text: 'Welcome everybody'}] });
    }
  }

const showUsers = (users) => users.map((userOnline) => <UserContainer user={userOnline} setChatHeader={setChatHeader} />);
const showGroups = (groups) => groups.map((groupOnline) => <GroupContainer group={groupOnline} setChatHeader={setChatHeader} setSelectedGroup={setSelectedGroup}/>);

console.log(search);
console.log(usersOnline);
return (
  <div>
    <HeaderContainer>
      <ChatControl>
        <ControlHeader>
          <div>
            {newNickname ? <NameInput placeholder={userNickname} setUserNickname={setUserNickname} setNewNickname={setNewNickname} actualizar={actualizar} /> : <p>{userNickname}</p>}
            <FontAwesomeIcon icon={faPen} onClick={() => { setNewNickname(true); console.log(usersOnline); }} />
          </div>
          <div>
            <FontAwesomeIcon icon={faUserAlt} onClick={() => { setSelectedOption('users') }} />
            <FontAwesomeIcon icon={faUsers} onClick={() => { setSelectedOption('groups') }} />
          </div>
        </ControlHeader>

        <SearchBar usersOnline={usersOnline} setSearch={setSearch} />

        {(selectedOption === 'users' && search) ? (showUsers(search)) :
          (selectedOption === 'users') ? (showUsers(usersOnline)) :
            (selectedOption === 'groups' && search) ? (showGroups()) :
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
        <ChatSelected selectedGroup={selectedGroup} obtener={obtener}/>
        <ChatTyping selectedGroup={selectedGroup} addGroupChat={addGroupChat} />
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


export default App;
