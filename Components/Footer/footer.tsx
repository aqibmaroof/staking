import { Container, Row, Col } from "react-bootstrap";
import "./Footer.module.scss";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <Container className="footer-cont">
          <Row className="footer-main-row">
            <Col md={12} className="px-0">
              <div className="footer-wrapper">
                <div className="logo-part">
                  <a
                    href="https://web.xana.net/"
                    className="footer-logo"
                    target="_blank"
                  >
                    <img src="https://ik.imagekit.io/xanalia/xana/foot-logo.svg" alt="logo" />
                  </a>
                  <p>
                    XANA is a blockchain infrastructure and robust DApps
                    platform custom-built for the Metaverse. Broadly Adopted by
                    major institutions, local governments, and global brands.
                  </p>
                </div>
                <div className="footer-other-part team-footer">
                  <h5>Team</h5>
                  <a
                    href="https://noborderz.com/"
                    target="_blank"
                    className="inline-element"
                  >
                    <img src="https://ik.imagekit.io/xanalia/xana/building.svg" alt="icon" />
                    <p>NOBORDERZ Group</p>
                  </a>

                  <a
                    href="https://xana.net/nft/about"
                    target="_blank"
                    className="inline-element"
                  >
                    <img src="https://ik.imagekit.io/xanalia/xana/building.svg" alt="icon" />
                    <p>XANALIA Limited</p>
                  </a>

                  <a
                    href="https://twitter.com/rio_noborderz"
                    target="_blank"
                    className="inline-element"
                  >
                    <img src="https://ik.imagekit.io/xanalia/xana/tw.svg" alt="icon" />
                    <p>Twitter (CEO)</p>
                  </a>

                  <a
                    href="https://www.linkedin.com/company/xana-app/"
                    target="_blank"
                    className="inline-element"
                  >
                    <img src="https://ik.imagekit.io/xanalia/xana/in.svg" alt="icon" />
                    <p>Linkedin</p>
                  </a>

                  <a
                    href="http://contact@noborderz.com"
                    target="_blank"
                    className="inline-element"
                  >
                    <img src="https://ik.imagekit.io/xanalia/xana/msg.svg" alt="icon" />
                    <p>Contact</p>
                  </a>
                </div>
                <div className="footer-other-part sitemap-footer">
                  <h5>Sitemap</h5>

                  <div className="sitemap-footer-inner">
                    <div className="left-part">
                      <a href="https://web.xana.net/#home">Top</a>
                      <a target="_blank" href="https://web.xana.net/#xeta">
                        XETA
                      </a>
                      <a target="_blank" href="https://web.xana.net/#gamefi">
                        GameFi
                      </a>
                      <a target="_blank" href="https://web.xana.net/#Builder">
                        Builder
                      </a>
                      <a target="_blank" href="https://web.xana.net/#nfts">
                        NFTs
                      </a>
                      <a target="_blank" href="https://web.xana.net/#adoption">
                        Major Adoptions
                      </a>
                    </div>
                    <div className="right-part">
                      <a target="_blank" href="https://web.xana.net/#metaverse">
                        Metaverse
                      </a>
                      <a target="_blank" href="https://web.xana.net/#land">
                        Land
                      </a>
                      <a
                        target="_blank"
                        href="https://web.xana.net/#genesis_ai"
                      >
                        Genesis AI
                      </a>
                      <a
                        target="_blank"
                        href="https://web.xana.net/#xana_chain"
                      >
                        XANA Chain
                      </a>
                      <a target="_blank" href="https://web.xana.net/#stories">
                        Stories
                      </a>
                    </div>
                  </div>
                </div>

                <div className="footer-other-part social-footer">
                  <h5>Social</h5>

                  <a
                    href="https://twitter.com/XANAMetaverse"
                    target="_blank"
                    className="inline-element"
                  >
                    <img src="https://ik.imagekit.io/xanalia/xana/tw.svg" alt="" />
                    <p>Twitter</p>
                  </a>

                  <a
                    href="https://discord.com/invite/Xana"
                    target="_blank"
                    className="inline-element"
                  >
                    <img src="https://ik.imagekit.io/xanalia/xana/so-c.svg" alt="" />
                    <p>Discord</p>
                  </a>

                  <a
                    href="https://t.me/xanaofficial"
                    target="_blank"
                    className="inline-element"
                  >
                    <img src="https://ik.imagekit.io/xanalia/xana/tele-c.svg" alt="" />
                    <p>
                      Telegram
                      <img
                        src="https://ik.imagekit.io/xanalia/xana/speaker.svg"
                        alt=""
                        width={13}
                        height={13}
                      />
                    </p>
                  </a>

                  <a
                    href="https://t.me/xana_english"
                    target="_blank"
                    className="inline-element"
                  >
                    <img src="https://ik.imagekit.io/xanalia/xana/tele-c.svg" alt="" />
                    <p>
                      Telegram
                      <img
                        src="https://ik.imagekit.io/xanalia/xana/users.svg"
                        alt=""
                        width={13}
                        height={13}
                      />
                    </p>
                  </a>

                  <a
                    href="https://medium.com/@xanametaverse"
                    target="_blank"
                    className="inline-element"
                  >
                    <img
                      src="https://ik.imagekit.io/xanalia/xana/m-c.svg"
                      alt=""
                    />
                    <p>Medium</p>
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
