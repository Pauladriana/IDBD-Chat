import React from 'react';
import styled from 'styled-components';

export default function UserContainer() {
  return (
    <>
      <Usercontainer>
        <p>User1</p>
      </Usercontainer>
    </>
  );
}

const Usercontainer = styled.div`
    height: 6rem;
    border: 0.5px solid #E5E5E5;
    box-sizing: border-box;
  `;