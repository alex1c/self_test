import React from "react";
import { useState, useEffect, useRef } from "react";
//import { useParams } from "@react/router"
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";

const UserCard = () => {
  const [error, setError] = useState(null); //служебный для useEffect
  const [isLoaded, setIsLoaded] = useState(false); //служебный загрузчик
  const [items, setItems] = useState([]); //все данные по текущему пользователю
  const [posts, setPosts] = useState([]); //все посты пользователя
  const [newPost, setnewPost] = useState([]); //служебный. При заполнении случайным числом запускаем useEffect  и получаем все посты пользователя
  const [modalShow, setModalShow] = React.useState(false); //служебный. Отвечает за видимость модального окна
  //let inputEl = useRef(null);

  const [currentPost, setCurrentPost] = useState(0); //при клике на див через этот стейт передаем текущий ид поста в модальное окно
  const [currentComments, setCurrentComments] = useState();

  // let currentPost = 0;

  const params = useParams();

  // получаем все данные по текущему пользователю
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
  //конец получаем все данные по текущему пользователю

  //console.log(items);
  console.log("основной стейт с данными для вывода ", items);

  const firstUpdate = useRef(false); //стейт для определения первой загрузки. При первой загрузке не выводим все посты. Только по кнопке

  //получаем посты пользователя
  useEffect(() => {
    if (firstUpdate.current) {
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
    } else {
    }
  }, [newPost]);
  //конец получаем посты пользователя

  //получаем все комментарии к посту
  useEffect(() => {
    if (firstUpdate.current) {
      fetch(
        `https://jsonplaceholder.typicode.com/comments/?postId=${currentPost}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            firstUpdate.current = true;
            setCurrentComments(Object.values(result));
            ////console.log("items ", items);
          },
          // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
          // чтобы не перехватывать исключения из ошибок в самих компонентах.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    } else {
    }
  }, [currentPost]);
  console.log("currentComments", currentComments);
  //конец получаем все комментарии к посту

  //очищаем стейт с постами
  function deletePosts() {
    firstUpdate.current = false;
    setPosts([]);
    // console.log("newPost", newPost);
  }

  //объявляем что вызов не первый. Заполняем стейт рандомным числом чтобы запустить useeffect для получения постов
  function showPosts() {
    firstUpdate.current = true;
    setnewPost(Math.random());
    //console.log("newPost", newPost);
  }

  function getComments(postId) {
    console.log("comments", postId);
  }

  //модальное окошко
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Comments for post #{currentPost}
            {console.log(currentPost)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>

          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              {" "}
              {
                <div className="container">
                  {currentComments?.map((comment, index) => (
                    <div id={comment.id}>
                      <ListGroup.Item key={index}>
                        {" "}
                        comment#{comment.id} <br /> Title: {comment.name} <br />{" "}
                        Author: ({comment.email}) <br />
                        <hr></hr> Body: {comment.body}{" "}
                      </ListGroup.Item>
                    </div>
                  ))}
                </div>
              }
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  ////////////////////////////////////

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
                    <Button
                      variant="primary"
                      onClick={showPosts}
                      className="m-2"
                    >
                      Show posts
                    </Button>
                    <Button
                      variant="primary"
                      onClick={deletePosts}
                      className="m-2"
                    >
                      Hide posts
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
                            <div
                              id={post.id}
                              onClick={() => setCurrentPost(post.id)}
                            >
                              <ListGroup.Item
                                key={index}
                                onClick={() => setModalShow(true)}
                              >
                                {" "}
                                id={post.id} Title: {post.title} <br />
                                <hr></hr> Body: {post.body}{" "}
                              </ListGroup.Item>
                              <MyVerticallyCenteredModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                //postid={post.id}
                              />
                            </div>
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
