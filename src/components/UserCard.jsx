import React from "react";
import { useState, useEffect } from "react";
//import { useParams } from "@react/router"
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useParams } from "react-router-dom";
//let params = useParams();
{
  /* <div>UserCard {params.userId}</div> */
}

const UserCard = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  ////let params = useParams();
  const params = useParams();

  // Примечание: пустой массив зависимостей [] означает, что
  // этот useEffect будет запущен один раз
  // аналогично componentDidMount()
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${params.userId}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          //setItems(result);
          //setItems(Object.entries(result));
          const resultArray = Object.entries(result);

          // resultArray.map((curit) => console.log(curit))
          //const newArr = resultArray.slice()
          resultArray.map((resultArrayItem) => {
            if (typeof resultArrayItem[1] === "object") {
              resultArrayItem[1] = Object.entries(resultArrayItem[1]);
              resultArrayItem[1].map((temp) => {
                if (typeof temp[1] === "object") {
                  temp[1] = Object.entries(temp[1]);
                }
              });
            }
            ////console.log(resultArrayItem);
          });

          setItems(resultArray);
          //console.log(items)

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

  console.log(items);

  let outputArray = []

  
  //// /*// //items.map((currentItems) => {
   //// console.log("1-", currentItems[1]);
   ////outputArray.push(currentItems[0], currentItems[1])
   //// if (Array.isArray(currentItems[1])) {
     //// console.log("2-", currentItems[1][1]);
     ////outputArray.push(currentItems[1][0], currentItems[1][1])
     //// currentItems[1].map((currentItems2) => {
      ////  console.log("3-", currentItems2[1]);
      ////outputArray.push(currentItems2[0], currentItems[1])
      ////  if (Array.isArray(currentItems2[0])) {
      ////    currentItems2[1].map((currentItems3) => {
       ////     console.log("4-", currentItems3[1]);
      ////    });
     ////   }
     //// });
   //// }
 //// });  */

 items.map((currentItem) => {
  outputArray.push(currentItem)

 })

  console.log('outputArray--',outputArray);

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return <>
    
    

<ListGroup>
          {outputArray.map((outputArrayitem) => (
            <ListGroup.Item
              key={outputArrayitem.id}
              id={outputArrayitem.id}
              
              
             
            >
               <div>{outputArrayitem  }</div>
            </ListGroup.Item>
          ))}
        </ListGroup>
    
   
  
  
    
    
    </>;
  }
};

export default UserCard;
