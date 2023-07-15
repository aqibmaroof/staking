import type { NextPage } from "next";
import Header from "../Components/Header/header";
import HomePage from "../Components/HomePage/homepage";
import Footer from "../Components/Footer/footer";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <HomePage />
      <Footer />
    </>
  );
};

export default Home;
