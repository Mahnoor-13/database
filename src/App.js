import logo from "./logo.svg";
import "./App.css";
import db from "./db";
import { useCallback, useState, useEffect } from "react";

function App() {
  const [fruits, setFruits] = useState([]);
  const [_input, setInput] = useState("");
  const [key, setKey] = useState("");
  const addFruit = useCallback(async (e) => {
    e.preventDefault();
    const { name } = e.target.elements;
    try {
      db.database().ref(`fruits/${name.value}`).set({
        name: name.value,
      });
    } catch (error) {
      console.log(error);
    }
  });

  function removeFruit(r) {
    db.database().ref(`fruits/${r}`).remove();
  }

  const updateData = useCallback(async (e) => {
    e.preventDefault();
    console.log("-----");
    try {
      db.database().ref(`fruits/${key}`).update({
        name: _input,
      });
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    db.database()
      .ref(`fruits`)
      .on("value", (fruits) => {
        let fruitsArray = [];
        fruits.forEach((fruit) => {
          let newFruit = {
            key: fruit.key,
            name: fruit.val().name,
          };
          fruitsArray.push(newFruit);
        });
        setFruits(fruitsArray);
      });
  }, []);
  return (
    <div className="App">
      <h3>Fruits </h3>
      <form className="form">
        <div className="mb-3">
          <input
            name="name"
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            value={_input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {key != "" ? (
          <button
            type="submit"
            className="btn btn-primary button"
            onClick={updateData}
          >
            Update
          </button>
        ) : (
          <button
            type="submit"
            className="btn btn-primary button"
            onClick={addFruit}
          >
            Add
          </button>
        )}
      </form>
      <div>
        {fruits.map((fruit) => {
          return (
            <div>
              <ul className="ul">
                <li>{fruit.name}</li>
                <span
                  className="remove"
                  onClick={() => removeFruit(fruit.name)}
                >
                  X
                </span>
                <span
                  className="remove"
                  onClick={() => {
                    setInput(fruit.name);
                    setKey(fruit.key);
                  }}
                >
                  Edit
                </span>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
