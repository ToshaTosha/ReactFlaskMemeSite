import React from "react";
import Form from "../components/Form";
import Posts from "../components/Posts";
import { Navigate } from "react-router-dom";
import { Context } from "../context";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";

function PostsPage() {
  const [items, setItems] = React.useState([]);
  const { isAuth } = React.useContext(Context);

  React.useEffect(() => {
    fetch("/get")
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
      });
  }, []);

  const onAddPost = (description) => {
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
  //console.log(items);

  return isAuth ? (
    <div className="layout">
      <LeftSidebar />
      <div class="layout__main">
        <div className="home-title">
          <span>Home</span>
          <svg
            className="brand"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
          </svg>
        </div>
        <Form onAddPost={onAddPost} />
        {items.map((item, id) => (
          <Posts key={id} item={item} updateLike={updateLike} />
        ))}
      </div>
      <RightSidebar />
    </div>
  ) : (
    <Navigate replace to="/login" />
  );
}

export default PostsPage;
