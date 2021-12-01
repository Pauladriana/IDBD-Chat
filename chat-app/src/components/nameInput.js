import React from 'react';
import styled from 'styled-components';

export default function NameInput(props) {
    const handleBlur = (e) => {
        const { value } = e.target
        console.log(value);
    if (value !== "") {
      props.setUserNickname(value);
      props.actualizar(28, value);
      props.setNewNickname(false);
    } 
    }
  return (
      <Inputnamechanger>
      <input
      placeholder={props.placeholder}
      onBlur={handleBlur}></input>
      </Inputnamechanger>
  );
}

const Inputnamechanger = styled.div`
	input{
        width: 180px;
        border: none;
        font-size: 1.8rem;
        outline: none;
    }
`;
