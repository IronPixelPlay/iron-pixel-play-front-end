import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { PacmanLoader } from "react-spinners";
import defaultImage from "../images/pacman-6450.gif";


function UserProfilePage() {
  const [profileData, setProfileData] = useState(null);

  const storedToken = localStorage.getItem("authToken");
    const {userId} = useParams()

  const getProfileData = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/user/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProfileData();
  }, []);

  const renderUser = () => {
    if (profileData === null) {
      return (
        <div className="loader-container">
          <PacmanLoader color="#05ffe9" size={100} />
        </div>
      );
    }

    return (
      <Container>
        <Row>
          <Col>
            <Card
              bg="dark"
              text="white"
              className="card-with-spacing bright-shadow"
            >
              <Card.Body>
                <div className="text-center">
                  <h1>{profileData.user.name}</h1>
                  <div className="mb-1">
                    <Card.Img
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                      variant="top"
                      src={profileData.user.image || defaultImage}
                    />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              bg="dark"
              text="white"
              className="card-with-spacing bright-shadow"
            >
              <Card.Body>
                <h2>{profileData.user.name}'s games</h2>
                {profileData.game.map((userGame) => (
                  <div key={userGame.demo}>
                    <Link to={`/games/${userGame._id}`}>
                      <Card
                        bg="dark"
                        text="white"
                        className="card-with-spacing bright-shadow"
                      >
                        <Card.Img
                          style={{
                            width: "100%",
                            height: "170px",
                            objectFit: "cover",
                          }}
                          variant="top"
                          src={userGame.image || defaultImage}
                        />
                        <Card.Body>
                          <Card.Title>{userGame.title}</Card.Title>
                        </Card.Body>
                      </Card>
                    </Link>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card
              bg="dark"
              text="white"
              className="card-with-spacing bright-shadow"
            >
              <Card.Body>
                <h2>{profileData.user.name}'s recent activity</h2>
                {profileData.reviews.map((userReview) => (
                  <div key={userReview.title}>
                    <Link to={`/games/${userReview.game._id}`}>
                      <Card
                        bg="dark"
                        text="white"
                        className="card-with-spacing bright-shadow"
                      >
                        <Card.Body>
                          <Card.Title>{userReview.title}</Card.Title>
                        </Card.Body>
                      </Card>
                    </Link>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              bg="dark"
              text="white"
              className="card-with-spacing bright-shadow"
            >
              <Card.Body>
                <h2>{profileData.user.name}'s recently played games</h2>
                {profileData.reviews.map((userReview) =>
                  userReview.played === true ? (
                    <div key={userReview.title}>
                      <Link to={`/games/${userReview.game._id}`}>
                        <Card
                          bg="dark"
                          text="white"
                          className="card-with-spacing bright-shadow"
                        >
                          <Card.Body>
                            <Card.Img
                              style={{
                                width: "100%",
                                height: "170px",
                                objectFit: "cover",
                              }}
                              variant="top"
                              src={userReview.game.image || defaultImage}
                            />
                            <Card.Title>{userReview.game.title}</Card.Title>
                          </Card.Body>
                        </Card>
                      </Link>
                    </div>
                  ) : (
                    <></>
                  )
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return <>{renderUser()}</>;
}

export default UserProfilePage;