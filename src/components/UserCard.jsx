import React from "react";
import { useState, useEffect, useRef } from "react";
//import { useParams } from "@react/router"
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";


const UserCard = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newPost, setnewPost] = useState([]);

  const params = useParams();
  //const fruits = ["Яблоко", "Банан"];

  // Примечание: пустой массив зависимостей [] означает, что
  // этот useEffect будет запущен один раз
  // аналогично componentDidMount()
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${params.userId}`)
      //захардкодил одного юзера для теста
      //fetch(`https://jsonplaceholder.typicode.com/users/5`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);

          setItems(result);
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
  let ttt = 0
  const firstUpdate = useRef(false);

  //получаем посты пользователя

  useEffect(() => {
    console.log('firstUpdate3',firstUpdate)
    if (firstUpdate.current) {
      console.log('firstUpdate',firstUpdate)
      fetch(
        `https://jsonplaceholder.typicode.com/posts/?userId=${params.userId}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            firstUpdate.current = true;
            setPosts(Object.values(result));
            ////console.log("items ", items);
          },
          // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
          // чтобы не перехватывать исключения из ошибок в самих компонентах.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
    else {
      console.log('firstUpdate',firstUpdate)
    }
  }, [newPost]);

  
  //конец получаем посты пользователя

  function deletePosts() {
    firstUpdate.current = false;   
    setPosts([]); 
    console.log('newPost', newPost)   
  }

  function showPosts() {
    firstUpdate.current = true;
    setnewPost(ttt+Math.random());
    console.log('newPost', newPost)   
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <>
        {
          <Container>
            <Row>
              <Col>
                <Card bg={"Info"} style={{ width: "24rem" }} className="mt-5">
                  <Card.Img
                    variant="top"
                    src="https://placeimg.com/640/480/people"
                  />
                  <Card.Body>
                    <Card.Title>
                      {items.name} ({items.username})
                    </Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      City: {items.address.city}, <br /> street:{" "}
                      {items.address.street}, <br /> suite:{" "}
                      {items.address.suite}, <br /> zipcode:{" "}
                      {items.address.zipcode}
                    </ListGroup.Item>

                    <ListGroup.Item>
                      Company: {items.company.bs}, <br /> catchPhrase:{" "}
                      {items.company.catchPhrase}, <br /> name:{" "}
                      {items.company.name}
                    </ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                    website:{" "}
                    <Card.Link href={items.website}>{items.website}</Card.Link>{" "}
                    <br /> email:
                    <Card.Link href={"mailto:" + items.email}>
                      {" "}
                      {items.email}
                    </Card.Link>
                    <br />
                    <hr></hr>
                    <Button variant="primary" onClick={deletePosts}>
                      Delete posts
                    </Button>
                    <Button variant="primary" onClick={showPosts}>
                      Show posts
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <div bg={"Info"} className="mt-5">
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      {" "}
                      {
                        <div className="container">
                          {posts?.map((post, index) => (
                            <ListGroup.Item key={index}>
                              {" "}
                              #{post.id} Title: {post.title} <br />
                              <hr></hr> Body: {post.body}{" "}
                            </ListGroup.Item>
                          ))}
                        </div>
                      }
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </Col>
            </Row>
          </Container>
        }
      </>
    );
  }
};

export default UserCard;
