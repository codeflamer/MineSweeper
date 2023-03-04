import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <div className="py-3">
      <h2 className="mx-auto  text-center text-2xl italic font-mono">
        Welcome to CodeFlamer's Mine Sweeper{" "}
      </h2>
      <section className="mt-2 ">
        <Board />
      </section>
    </div>
  );
}

export default App;
