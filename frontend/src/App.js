import React from "react";
import "./App.css";
import Form from "./components/Form";
import Posts from "./components/Posts";

function App() {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    fetch("http://127.0.0.1:5000/get")
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
      });
  }, []);
  console.log(items);
  const onAddPost = (description) => {
    const newList = [...items, description];
    setItems(newList);
  };

  return (
    <div className="App">
      <Form onAddPost={onAddPost} />
      {items.map((item, id) => (
        <Posts key={id} item={item} />
      ))}
    </div>
  );
}

export default App;
