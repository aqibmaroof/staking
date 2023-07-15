import { Card, Col } from "react-bootstrap";
import "./Card.module.scss";
import { Spinner } from "react-bootstrap";

interface cardValue {
  Title: String;
  Subtitle?: any;
  children?: JSX.Element | JSX.Element[];
  claimTicket?: any;
  txInProgress?: any;
  earnedTickets?: any;
  cardFor?: any;
}
export default function LandCards({
  Title,
  Subtitle,
  children,
  claimTicket,
  txInProgress,
  cardFor
}: cardValue) {
  return (
    <>
      {cardFor === "land" && (
        <Col
          className={`${
            Title == "JOIN RAFFLE" || Title == "JOINED RAFFLE!"
              ? "card-col px-0 raffle-card "
              : "card-col px-0  "
          }`}
          md={4}
          sm={5}
          xs={11}
        >
          <Card onClick={() => Title == "JOIN RAFFLE" && claimTicket()}>
            <Card.Body>
              {Title == "JOIN RAFFLE" || Title == "JOINED RAFFLE!" ? (
                txInProgress == true ? (
                  <>
                    <Spinner
                      className="spinner-size"
                      animation="border"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <h1 className="loading-size">Loading . . .</h1>
                  </>
                ) : (
                  <>
                    <Card.Subtitle className="heading-6">
                      {Subtitle ? Subtitle : ""}
                      {children}
                    </Card.Subtitle>
                    <Card.Title
                      className={`${
                        Title == "JOIN RAFFLE" ? "heading-2" : "ruffle-joined"
                      }`}
                    >
                      {Title}
                    </Card.Title>
                  </>
                )
              ) : (
                <>
                  <Card.Title className="heading-6">{Title}</Card.Title>
                  <Card.Subtitle
                    className={`${
                      Subtitle == "Already Consumed"
                        ? "heading-2 already-consumed-text"
                        : "heading-2"
                    }`}
                  >
                    {Subtitle ? Subtitle : ""}
                    {children}
                  </Card.Subtitle>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      )}
    </>
  );
}
