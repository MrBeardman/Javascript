import "./App.css";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Card from "./components/card";
import data from "./components/data";

function App() {
  let cards = data.map((item) => (
    <Card
      key = {data.id}
      item ={item}
    />
  ));
  return (
    <div>
      <Navbar />
      <Hero />
      <section className="cards-list">
      {cards}
      </section>

    </div>
  );
}

export default App;
