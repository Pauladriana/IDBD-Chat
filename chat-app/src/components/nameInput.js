import React from 'react';
import styled from 'styled-components';

export default function NameInput(props) {
    const handleBlur = (e) => {
        const { value } = e.target
        console.log(value);
    if (value !== "") {
      props.setUserNickname(value);
      props.actualizar(parseInt(localStorage.getItem("idLogged")), value);
      props.setNewNickname(false);
      console.log(localStorage.getItem("usersOnline"));
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
