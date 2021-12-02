import React from 'react';
import styled from 'styled-components';

export default function UserContainer(props) {

  const user = props.user;
  const setChatHeader = props.setChatHeader;

  const handleClick = (e) => {
    const selected = e.target.innerText;
    setChatHeader(selected)
  }
  return (
    <>
      <Usercontainer>
        <p onClick={handleClick}>{user.name}</p>
      </Usercontainer>
    </>
  );
}

const Usercontainer = styled.div`
    height: 3rem;
    border-top: 0.5px solid #E5E5E5;
    box-sizing: border-box;
  `;