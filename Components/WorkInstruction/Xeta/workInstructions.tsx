import { Container, Row, Col } from "react-bootstrap";

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
                You can earn “tickets” by staking (depositing) $XETA tokens
                during the campaign period.These tickets can be redeemed for a
                variety of Treasure Box that can be used throughout the XANA
                ecosystem, including the Metaverse App, Land, and NFTDuel built
                on XANA. <br />※ These Treasure Box range from rare Land drops
                to the ability to acquire common items that can be used in XANA
                games, as well as whitelisting rights.
              </li>
              <li>
                The staking consists of “Campaign Period” of 13 days and a “Join
                Raffle Period ” of 2 days and the A total of 15 days
                cycle.Staking during the campaign period earns tickets ( Staking
                is not allowed during the JOIN RAFFLE).
              </li>
              <li>
                XETA can be staked from a minimum of 100 XETA and can be able to
                stake in multiples of “100" Also, the ticket awarded for each
                100 XETA is “1 Ticket / DAY”. <br />
                ※ Tickets can only be earned only during the campaign period
                (i.e., Ticket cannot be earned during the JOIN RAFFLE).
                <br />
                For example <br />
                <span className="point">100 XETA = 1 Ticket / DAY</span>
                <span className="point">500 XETA = 5 Ticket / DAY</span>
                <span className="point">3,300 XETA = 33 Ticket / DAY</span>
              </li>
              <li>
                You will need to JOIN RAFFLE after end campaign period within 2
                days. JOIN RAFFLE button will be displayed for 48 hours.
              </li>
              <li>
                The drawing method is done by calculating the percentage of the
                total number of tickets applied as a whole to the number of
                tickets user has applied and the winner is randomly picked.{" "}
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
                You may unstake your staked $XETA at any time. <br /> The XETA
                you applied for Unstaking will be fully claimable after 14
                days(TICKET EARNED will be lost).
                <br />
                If you claim immediately without waiting 14 days after APPLY for
                unstake, then a TAX of 18% will be charged(TICKET EARNED will be
                lost).
              </li>
              <li>
                Important points regarding TAX BONUS:
                <ul>
                  <li>
                    To earn the Tax Bonus, you must be staking 「when the draw
                    results are announced」
                    <br />
                    (In Each campaign , if TAX is not incurred then Tax pool
                    will be 0,in that case it won’t be distributed.)
                  </li>
                  <li>
                    If a staking participant claims immediately without waiting
                    14 days, he/she will be charged a tax (fee) of 18% in $XETA,
                    which will be pooled in a “Tax Pool”. 30% of the Tax Pool
                    will be distributed to the staking participant pro rata as a
                    Tax Bonus. <br />
                    &nbsp;
                  </li>
                </ul>
                <ol>
                  <li>
                    {" "}
                    Please also note that if you unstake after receiving the
                    XETA in TAX BONUS, the XETA in CLAIMABLE FROM TAX POOL will
                    gets “disappear”. We recommend you to claim first and then
                    unstake.
                  </li>
                  <li>
                    {" "}
                    You must claim your TAX BONUS ” in between” the time it is
                    reflected in your CLAIMABLE FROM TAX POOL BONUS and the
                    start of the next campaign cycle, or it will be lost. We
                    recommend you to claim the TAX BONUS XETA you have received
                    before the start of the next cycle.
                  </li>
                </ol>
              </li>
            </ol>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default WorkInstructions;
