import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function SearchBar() {
  let a = 1;
  return (
    <>
    <Barcontainer>
      <input type="text" placeholder="Search..."></input>
      <FontAwesomeIcon icon={faSearch}/>
    </Barcontainer>
    </>
  );
}

const Barcontainer = styled.div`
  height: 2.5rem;
  background-color: #FFF;
  width: fit-content;
  padding: 0 20px;
  border-radius: 50px;
  border: 1px solid #EEEEEE;
  display:flex;
  margin: 2rem auto;
  cursor: pointer;
  align-items: center;
    input {
      margin-left: 15px;
      height:2.375rem;
      width:100%;
      border:none;
      font-family: 'Montserrat', sans-serif;
      outline: none;
    }
`;