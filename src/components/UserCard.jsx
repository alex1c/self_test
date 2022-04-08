import React from "react";
import { useState, useEffect } from "react";
//import { useParams } from "@react/router"
import ListGroup from "react-bootstrap/ListGroup";
import { useParams } from "react-router-dom";

const UserCard = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const params = useParams();

  // Примечание: пустой массив зависимостей [] означает, что
  // этот useEffect будет запущен один раз
  // аналогично componentDidMount()
  useEffect(() => {
    //// fetch(`https://jsonplaceholder.typicode.com/users/${params.userId}`)
    //захардкодил одного юзера для теста
    fetch(`https://jsonplaceholder.typicode.com/users/5`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);

          const resultArray = Object.entries(result);

          resultArray.map((resultArrayItem) => {
            if (typeof resultArrayItem[1] === "object") {
              resultArrayItem[1] = Object.entries(resultArrayItem[1]);
              resultArrayItem[1].map((temp) => {
                if (typeof temp[1] === "object") {
                  temp[1] = Object.entries(temp[1]);
                } else {
                }
              });
            } else {
            }
          });

          setItems(resultArray);
          console.log("items ", items);
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  //console.log(items);
  console.log("основной стейт с данными для вывода ", items);

  function getString(Myitem) {
    try {
      if (!Array.isArray(Myitem[1])) {
        return Myitem[0] + "-эта строка рендерится--" + Myitem[1];
      } else if (Array.isArray(Myitem[1])) {
        Myitem[1].map((item2) => {
          if (!Array.isArray(item2[0])) {
            console.log(
              "здесь данные в консоль выводятся, но не рендерятся ",
              item2[0] + "--" + item2[1]
            );
            return item2[0] + "--" + item2[1];
          } else return "also_hello";
        });
      } else {
        return "hello";
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <>
        <ListGroup>
          {items.map((item) => (
            <ListGroup.Item key={item} id={item.id}>
              {getString(item)}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </>
    );
  }
};

export default UserCard;
