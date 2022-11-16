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
  //console.log(items);
  const onAddPost = (description) => {
    //console.log(description);
    const newList = [...items, description];
    setItems(newList);
  };

  const updateLike = (like) => {
    const new_like = items.map((my_like) => {
      if (my_like.id === like.id) {
        return like;
      } else {
        return my_like;
      }
    });
    setItems(new_like);
  };

  return (
    <div className="App">
      <Form onAddPost={onAddPost} />
      {items.map((item, id) => (
        <Posts key={id} item={item} updateLike={updateLike} />
      ))}
    </div>
  );
}

export default App;
