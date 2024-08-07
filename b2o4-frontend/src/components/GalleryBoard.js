import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import MyPageContext from "./MyPageContext";
import "./css/GalleryBoard.css";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const GalleryBoard = () => {
  const { loginMember } = useContext(MyPageContext);
  console.log("loginMember is GB :", loginMember);

  const [GBList, setGBList] = useState([]);

  const boardList = async () => {
    const response = await axios.get("/gallery/posts");
    setGBList(response.data);
  };

  useEffect(() => {
    boardList();
    console.log("GBList : ", GBList);
  }, []);

  return (
    <div className="galleryBoard-container">
      <Row xs={1} md={4} className="g-2">
        {GBList.map((list) => (
          <Col key={list.gbPostNo}>
            <Card className="card-custom" style={{ width: "18rem" }}>
              <Link
                to={`/galleryBoard/${list.gbPostNo}`}
                state={{ list: list }}
                className="Link-custom"
              >
                <Card.Img
                  className="card-custom-img"
                  variant="top"
                  key={list.gbImages.split(",")[0]}
                  src={`http://localhost:9000/images/${
                    list.gbImages.split(",")[0]
                  }`}
                  alt={list.gbPostTitle}
                />
                <Card.Body>
                  <Card.Title>{list.gbPostTitle}</Card.Title>
                  <Card.Text>{list.gbPostCreateDate}</Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
      {loginMember && (
        <Button variant="secondary" href="/galleryUpload">
          글쓰기
        </Button>
      )}
    </div>
  );
};

export default GalleryBoard;
