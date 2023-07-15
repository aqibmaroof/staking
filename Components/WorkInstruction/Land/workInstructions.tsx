import { Container, Row, Col, Table } from "react-bootstrap";
import TicketsEarned from "./TicketsEarnedData";

function WorkInstructions(props) {
  return (
    <section className="work-section">
      <Container className="px-0">
        <Row className="homepage-title pt-0 mb-0 mx-0 mt-0">
          <Col className="text-center px-0">
            <h1>HOW IT WORK</h1>
          </Col>
        </Row>
        <Row className="mx-0">
          <Col className="px-0">
            {/* Text Content Here */}
            <ol className="work-point">
              <li>
                You can earn “tickets” by staking (depositing) LAND NFT and
                XANA:GENESIS NFTs during the campaign period.These tickets can
                be redeemed for a variety of Treasure Box that can be used
                throughout the XANA ecosystem, including the Metaverse App,
                Land, and NFTDuel built on XANA.
                <br />
                <>
                  ※ These Treasure Box range from rare Land drops to the ability
                  to acquire common items that can be used in XANA games, as
                  well as whitelisting rights.
                </>
              </li>
              <li>
                The satking consists of “Campaign Period” of 13 days and a “Join
                Raffle Period ” of 2 days and the A total of 15 days
                cycle.Staking during the campaign period earns tickets ( Staking
                is not allowed during the JOIN RAFFLE).
              </li>
              <li>
                Whenever LAND staking, 1 XANA: GENESIS NFT is required per
                parcel of Land. <br />
                ※ For example <br />
                <span className="point">
                  Common 2×2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is 4 parcels, so 4
                  XANA: GENESIS NFTs are required
                </span>
                <span className="point">
                  Rare 3×3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp; is 9 parcels, so 9 XANA: GENESIS NFTs
                  are required
                </span>
                <span className="point">
                  Super Rare 4×4&nbsp;is 16 parcels, so 16 XANA: GENESIS NFTs
                  are required
                </span>
              </li>
              <li>
                Depending on the rarity and size of the land you stake, the
                number of tickets you get per day (24 hours) varies, as shown in
                the reference chart below. <br />
                <>
                  ※ Tickets can only be earned only during the campaign period
                  (i.e., Ticket cannot be earned during the JOIN RAFFLE).
                </>
                <br />
                <div className="land-tbl-wr">
                  <Table className="land-tbl">
                    <thead>
                      <tr>
                        <th>Rarity</th>
                        <th>Size</th>
                        <th>Ticket / Day</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TicketsEarned.map((tickets: any, index: any) => (
                        <tr key={index}>
                          <td>{tickets.rarity}</td>
                          <td>{tickets.size}</td>
                          <td>{tickets.tickets}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </li>
              <li>
                You will need to JOIN RAFFLE after end campaign period within 2
                days. JOIN RAFFLE button will be displayed for 48 hours.
              </li>
              <li>
                The drawing method is done by calculating the percentage of the
                total number of tickets applied as a whole to the number of
                tickets user has applied and the winner is randomly picked.
                <br />
                (The more tickets you apply for, the higher the chance of being
                selected.)
              </li>
              <li>
                The results of the drawing will be displayed in the STAKING
                REWARD history tab. As soon as the draw results are officially
                announced, you will be able to claim your REWARD.(There is no
                deadline for claiming, and you are free to claim at any time.)
              </li>
              <li>
                You may unstake your staked LAND NFT and XANA:GENESIS NFTs at
                any time. <br /> Please Apply for unstake first, and then 14
                days after the application is submitted, you must Cliam unstake
                (TICKET EARNED will be lost)
              </li>
            </ol>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default WorkInstructions;
