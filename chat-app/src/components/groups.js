import React from 'react';
import styled from 'styled-components';

export default function GroupContainer() {
  return (
    <>
      <Groupcontainer>
        <p>Grupo1</p>
      </Groupcontainer>
      <p>+ Crear grupo</p>
    </>
  );
}

const Groupcontainer = styled.div`
    height: 6rem;
    border: 0.5px solid #E5E5E5;
    box-sizing: border-box;
  `;