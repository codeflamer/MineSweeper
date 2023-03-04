import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <div>
      <h2 className="mx-auto  text-center text-2xl ">MineSweeper Game</h2>
      <section className="mt-2 ">
        <Board />
      </section>
    </div>
  );
}

export default App;
