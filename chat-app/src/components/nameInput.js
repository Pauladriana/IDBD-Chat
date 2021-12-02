import React from 'react';
import styled from 'styled-components';

export default function NameInput(props) {
    const newNickname = props.newNickname;
    console.log(localStorage.getItem("userLogged"), newNickname)

    const handleBlur = (e) => {
        const { value } = e.target
        console.log(value);
    if (value !== "") {
      props.setUserNickname(value);
      props.actualizar("users", localStorage.getItem("userLogged"), value);
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
