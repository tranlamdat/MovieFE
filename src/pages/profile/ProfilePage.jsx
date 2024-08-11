import BaseLayout from "../../layouts/base/BaseLayout";
import "./ProfilePage.css";
import MemberProtected from "../../layouts/base/MemberProtected";
import { useEffect, useState } from "react";
import authService from "../../services/AuthService";
import handleError from "../../services/HandleErrors";
import formatDateTime from "../../services/FormatDateTime";
import { Card, Col, Nav, Row, Tab } from "react-bootstrap";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = authService.getUserData();
        console.log(user)
        setUserData(user);
      } catch (error) {
        handleError.showError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <MemberProtected>
      <BaseLayout>
        <section className="container py-4 mt-5">
          <div className="row">
            <div className="col-12">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                {userData && (
                  <div className="p-5">
                    <div className="text-center">
                      <figure className="figure">
                        <img src={userData?.profilePicture ?? "/img/default-avatar-1.png"} className="figure-img rounded avatar" alt="Avatar" />
                        <figcaption className="figure-caption text-light">
                          <h5 className="mt-2 mb-1">{userData?.firstName} {userData?.lastName}</h5>
                          <p>Joined: {formatDateTime.toDateString(userData?.createdAt)}</p>
                        </figcaption>
                      </figure>
                    </div>

                    <Card className="text-bg-secondary">
                      <Card.Body>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
                          <Row>
                            <Col sm={3}>
                              <Nav variant="pills" className="flex-column custom-tab">
                                <Nav.Item>
                                  <Nav.Link eventKey="profile">Profile</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                  <Nav.Link eventKey="privacy">Privacy</Nav.Link>
                                </Nav.Item>
                              </Nav>
                            </Col>
                            <Col sm={9}>
                              <Tab.Content>
                                <Tab.Pane eventKey="profile">First tab content</Tab.Pane>
                                <Tab.Pane eventKey="privacy">Second tab content</Tab.Pane>
                              </Tab.Content>
                            </Col>
                          </Row>
                        </Tab.Container>
                      </Card.Body>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </div>

        </section>
      </BaseLayout>
    </MemberProtected>
  );
}

export default ProfilePage