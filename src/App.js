import { Fragment } from "react";
import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <>
      <h2 className="mx-auto border border-red-500 text-center text-2xl">
        Fucking Mine Sweeper Game
      </h2>
      <section className="mt-2">
        <Board />
      </section>
    </>
  );
}

export default App;
