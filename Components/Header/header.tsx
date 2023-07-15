import { Nav, Container, Navbar, Badge } from "react-bootstrap";
import MultiWallet from "../WalletConnect/MultiWallet";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

export default function Header() {
  const [activeTab, setActiveTab] = useState(false);
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        fixed="top"
        variant="dark"
        className="themeNav"
      >
        <Container fluid>
          <Navbar.Brand >
            <img src="https://ik.imagekit.io/qjxemaiij5/white-logo.svg" alt="logo"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="right-menu">
            <Nav className="m-lg-auto main-menu">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  App
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    href="https://web.xana.net/ios-test-flight/"
                    target="_blank"
                  >
                    XANA (IOS)
                  </Dropdown.Item>

                  <Dropdown.Item
                    href="https://play.google.com/store/apps/details?id=com.nbi.xana"
                    target="_blank"
                  >
                    XANA (Android)
                  </Dropdown.Item>

                  <Dropdown.Item
                    href="https://bit.ly/xanabuildermac"
                    target="_blank"
                  >
                    XANA Builder(Mac)
                  </Dropdown.Item>

                  <Dropdown.Item
                    href="https://bit.ly/xanabuilderwin"
                    target="_blank"
                  >
                    XANA Builder(Win)
                  </Dropdown.Item>

                  <Dropdown.Item href="https://bit.ly/duelmac" target="_blank">
                    NFTDuel (Mac)
                  </Dropdown.Item>

                  <Dropdown.Item href="https://bit.ly/duelwin" target="_blank">
                    NFTDuel (Win)
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  XETA
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    href="https://www.okx.com/trade-spot/xeta-usdt"
                    target="_blank"
                  >
                    OKX
                  </Dropdown.Item>

                  <Dropdown.Item
                    href="https://www.kucoin.com/trade/XETA-USDT"
                    target="_blank"
                  >
                    Kucoin
                  </Dropdown.Item>

                  <Dropdown.Item
                    href="https://www.bybit.com/ja-JP/trade/spot/XETA/USDT"
                    target="_blank"
                  >
                    Bybit
                  </Dropdown.Item>

                  <Dropdown.Item
                    href="https://www.gate.io/ja/trade/XETA_USDT"
                    target="_blank"
                  >
                    Gate
                  </Dropdown.Item>

                  <Dropdown.Item
                    href="https://www.huobi.com/en-us/exchange/xeta_usdt"
                    target="_blank"
                  >
                    Huobi
                  </Dropdown.Item>

                  <Dropdown.Item
                    href="https://pancakeswap.finance/swap?inputCurrency=0xe9e7cea3dedca5984780bafc599bd69add087d56&outputCurrency=0xBC7370641ddCF16A27eeA11230Af4a9F247B61F9&chainId=56"
                    target="_blank"
                  >
                    Pancakeswap
                  </Dropdown.Item>

                  <Dropdown.Item
                    href="https://traderjoexyz.com/avalanche/trade?inputCurrency=0x31c994ac062c1970c086260bc61babb708643fac&outputCurrency=0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e"
                    target="_blank"
                  >
                    TraderJoe
                  </Dropdown.Item>

                  <Dropdown.Item
                    href="https://xana.net/vesting"
                    target="_blank"
                  >
                    {" "}
                    Vesting
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="https://app.multichain.org/#/router"
                    target="_blank"
                  >
                    Multichain{" "}
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="https://xana.net/bridge/xeta"
                    target="_blank"
                  >
                    {" "}
                    Bridge
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Nav.Link active>Staking</Nav.Link>

              <Nav.Link
                href="https://xana.net/land"
                active={activeTab}
                target="_blank"
              >
                Land
              </Nav.Link>

              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  AI
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    href="https://genesis.xana.net/"
                    target="_blank"
                  >
                    XANA:Genesis
                  </Dropdown.Item>

                  <Dropdown.Item
                    href="https://xana.net/ai-chat"
                    target="_blank"
                  >
                    Chat App
                  </Dropdown.Item>

                  <Dropdown.Item
                    href="https://opensea.io/collection/xana-genesis"
                    target="_blank"
                  >
                    Trade
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Nav.Link
                href="https://web.xana.net/launchpad/"
                active={activeTab}
                target="_blank"
              >
                LaunchPad
              </Nav.Link>

              <Nav.Link
                href="https://xana.net/nft"
                active={activeTab}
                target="_blank"
              >
                Marketplace
              </Nav.Link>

              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  blog
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="https://web.xana.net/blog/" target="_blank">
                    News
                  </Dropdown.Item>

                  <Dropdown.Item
                    href="https://web.xana.net/category/article/"
                    target="_blank"
                  >
                    Article
                  </Dropdown.Item>

                  <Dropdown.Item href="https://web.xana.net/story/" target="_blank">
                    Stories
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  SNS
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    href="https://twitter.com/XANAMetaverse"
                    target="_blank"
                  >
                    Twitter
                  </Dropdown.Item>

                  <Dropdown.Item
                    href="https://discord.com/invite/XANA"
                    target="_blank"
                  >
                    Discord (DAO)
                  </Dropdown.Item>

                  <Dropdown.Item
                    href="https://t.me/xanaofficial"
                    target="_blank"
                  >
                    Telegram | 📣
                  </Dropdown.Item>

                  <Dropdown.Item
                    href="https://t.me/xana_english"
                    target="_blank"
                  >
                    Telegram | 👥
                  </Dropdown.Item>

                  <Dropdown.Item
                    href="https://www.youtube.com/c/XANAMetaverse"
                    target="_blank"
                  >
                    Youtube
                  </Dropdown.Item>

                  <Dropdown.Item
                    href="https://www.tiktok.com/@xanametaverse?lang=en"
                    target="_blank"
                  >
                    Tik Tok
                  </Dropdown.Item>

                  <Dropdown.Item
                    href="https://www.instagram.com/xanametaverse/"
                    target="_blank"
                  >
                    Instagram
                  </Dropdown.Item>

                  <Dropdown.Item
                    href="https://line.me/R/ti/p/@824szpgf"
                    target="_blank"
                  >
                    LINE (JP)
                  </Dropdown.Item>

                  <Dropdown.Item
                    href="https://voicy.jp/channel/2968"
                    target="_blank"
                  >
                    Voicy (JP)
                  </Dropdown.Item>

                  <Dropdown.Item
                    href="https://xanametaverse.medium.com/"
                    target="_blank"
                  >
                    Medium
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="https://daomaker.com/company/xana"
                    target="_blank"
                  >
                    DAOMaker
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Docs
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    href="https://web.xana.net/memorandum/"
                    target="_blank"
                  >
                    Memorandum
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="https://web.xana.net/tokenomics"
                    target="_blank"
                  >
                    Tokenomics
                  </Dropdown.Item>
                  <Dropdown.Item href="https://docs.xana.net/" target="_blank">
                    Whitepaper
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
            <Nav className="walletbutton-wrapper inside-icons">
              <Badge pill className="walletAddress addNewIcon">
                {/* DISABLED UNTIL UI IS UPDATED */}
                <MultiWallet></MultiWallet>
              </Badge>
            </Nav>
          </Navbar.Collapse>
          <Nav className="walletbutton-wrapper outer-icons" id="outer-icons">
            <Badge pill className="walletAddress addNewIcon">
              {/* DISABLED UNTIL UI IS UPDATED */}
              <MultiWallet></MultiWallet>
            </Badge>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
