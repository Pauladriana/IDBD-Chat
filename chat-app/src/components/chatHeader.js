import React from 'react';
import styled from 'styled-components';

export default function ChatHeader(props) {
  return (
      <Chatheader>
        <p>{props.selected}</p>
      </Chatheader>
  );
}

const Chatheader = styled.div`
	height: 6.25rem;
	background: rgba(255, 255, 255, 0.46);
  display: flex;
  align-items: center;
  justify-content: center;
  p{
    margin: 0;
  }
`;