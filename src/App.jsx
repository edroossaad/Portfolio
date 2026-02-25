import "./App.css";
import Navbar from "./components/Navbar";
import AboutMeCard from "./sections/About";
import Hero from "./sections/Hero";
import Skills from "./sections/Skills";
import Work from "./sections/Work";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutMeCard />
      <Skills />
      <Work />

    </>
  );
}

export default App;
