import React from "react";
import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import {  Link } from "react-router-dom";

function UsersList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  function handlerOnClick(item) {
    let newArray = items.slice();
    ////newArray.push('22')
    console.log(newArray);

    newArray.forEach((Currentelement) => {
      Currentelement.id === item.id
        ? (Currentelement.myPole = "active")
        : (Currentelement.myPole = "");
    });
    setItems(newArray);
  }

  ////setItems(newArray)
  console.log(items);

  // Примечание: пустой массив зависимостей [] означает, что
  // этот useEffect будет запущен один раз
  // аналогично componentDidMount()
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
         //// setItems(result.map((el) => ({ ...el, myPole: "" })));
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <>
        <ListGroup>
          {items.map((item) => (
            <ListGroup.Item
              key={item.id}
              id={item.id}
              className={item.myPole}
              onClick={(inputElement) => handlerOnClick(item)}
             
            >
               {<Link to={`/usercard/${item.id}`}>{item.name} (aka {item.username} )</Link>}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </>
    );
  }
}

export default UsersList;
