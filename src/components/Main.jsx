import React from 'react'
import Container from "react-bootstrap/Container";
import UsersList from './UsersList';

const Main = () => {
  return (
    <>
    <Container className="p-3">
        <Container className="p-5 mb-4 bg-light rounded-3">
          <h1 className="header">Welcome </h1>

          <UsersList></UsersList>
        </Container>
      </Container>
    </>
  )
}

export default Main