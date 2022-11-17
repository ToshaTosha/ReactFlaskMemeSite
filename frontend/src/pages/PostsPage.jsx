import React from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../context";
import Form from "../components/Form";
import Posts from "../components/Posts";
import Auth from "../Auth";

function PostsPage() {
  const [items, setItems] = React.useState([]);
  const { isAuth, setIsAuth } = React.useContext(Context);
  console.log(isAuth);
  React.useEffect(() => {
    fetch("http://127.0.0.1:5000/get")
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
      });
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const resp = await Auth.get("http://127.0.0.1:5000/@me");
        console.log(resp.data);
      } catch (error) {
        console.log("Not found");
      }
    })();
  }, []);

  const onAddPost = (description) => {
    //console.log(description);
    const newList = [description, ...items];
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
  return isAuth ? (
    <div>
      <Form onAddPost={onAddPost} />
      {items.map((item, id) => (
        <Posts key={id} item={item} updateLike={updateLike} />
      ))}
    </div>
  ) : (
    <Navigate replace to="/login" />
  );
}

export default PostsPage;
