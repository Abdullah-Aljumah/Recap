import "./App.css";
import { Routes } from "react-router";
import { Route } from "react-router";
import Todo from "./components/todo";
function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Todo />} />
      </Routes>
    </>
  );
}

export default App;
