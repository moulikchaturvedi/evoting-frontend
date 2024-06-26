import { Link } from "react-router-dom";
import "./App.css";
import { Buffer } from "buffer/"; // <-- no typo here ("/")
import process from "process";
import EventEmitter from "events";
window.global = window;

window.Buffer = Buffer;
window.process = process;
window.EventEmitter = EventEmitter;

function App() {
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1 className="mx-5 my-5">Home</h1>
        <h5>
          Login first then <Link to={"/dashboard"}>go to your dashboard!</Link>
        </h5>
        <div>
          <Link to={"/voting"}>voting</Link>
        </div>
        <Link to={"/register"}>register </Link>
      </div>
    </>
  );
}

export default App;
