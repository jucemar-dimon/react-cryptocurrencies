import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Logo from "../../assets/images/coin.png";
import Api from "../../services";
import "rbx/index.css";
import {
  Container,
  Title,
  Navbar,
  Footer,
  Content,
  Column,
  Box,
  Section,
} from "rbx";

// import { Container } from './styles';

const Home = () => {
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    Api.get("/listings/latest", {
      params: {
        sort: "price",
        limit: "10",
      },
    })
      .then((response) => {
        if (!response.status) {
          throw new Error(
            "Erro ao executar a requisição, status " + response.status
          );
        } else {
          console.log(response.data.data);
          setCoins(Object.values(response.data.data.slice(0, 100)));
        }
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Fragment>
      <Helmet>
        <title>Cryptocurrencies</title>
      </Helmet>
      <Navbar color="light">
        <Container>
          <Navbar.Brand>
            <Navbar.Item href="#">
              <img src={Logo} alt="" role="presentation" height="50" />
            </Navbar.Item>
            <Navbar.Burger />
          </Navbar.Brand>
          <Navbar.Menu>
            <Navbar.Segment align="start">
              <Navbar.Item>Home</Navbar.Item>
              <Navbar.Item>Documentation</Navbar.Item>
            </Navbar.Segment>
          </Navbar.Menu>
        </Container>
      </Navbar>

      <Section>
        <Container>
          <Column.Group multiline centered breakpoint="mobile">
            {coins.map((coin) => (
              <Column
                narrow
                key={`COIN-${coin.name}`}
                style={{ minWidth: 160 }}
              >
                <Box centered>
                  <Title as="p" size={5}>
                    {coin.name}
                  </Title>
                  <Title as="p" subtitle size={6}>
                    {coin.symbol}
                  </Title>
                  <Title as="p" subtitle size={6}>
                    {coin.quote.USD.price}
                  </Title>
                </Box>
              </Column>
            ))}
          </Column.Group>
        </Container>
      </Section>

      <Footer>
        <Content textAlign="centered">
          <p>
            <strong>rbx</strong> by{" "}
            <a href="https://github.com/dfee">Devin Fee</a>. The source code is
            released under the{" "}
            <a href="https://opensource.org/licenses/mit-license.php">
              MIT License
            </a>
            . The website content is licensed{" "}
            <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
              CC BY NC SA 4.0
            </a>
            .
          </p>
        </Content>
      </Footer>
    </Fragment>
  );
};

export default Home;
