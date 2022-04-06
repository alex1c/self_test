//import Toast from 'react-bootstrap/Toast';

//import Button from 'react-bootstrap/Button';
//import {useEffect} from 'react';
//import UsersList from "./components/UsersList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import UserCard from "./components/UserCard";
//import Comments from "./components/Comments";
import Posts from "./components/Posts";
import NoPage from "./components/NoPage";
import Main from "./components/Main";
import Comments from "./components/Comments";
import Albums from "./components/Albums";
import Photos from "./components/Photos";
import ToDos from "./components/ToDos";
import UserCard from "./components/UserCard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/Posts" element={<Posts />}></Route>
          <Route path="/comments" element={<Comments />}></Route>
          <Route path="/albums" element={<Albums />}></Route>
          <Route path="/Photos" element={<Photos />}></Route>
          <Route path="/ToDos" element={<ToDos />}></Route>
          <Route path="/UserCard" element={<UserCard />}>
            <Route path=":userId" element={<UserCard />} />
          </Route>

          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
