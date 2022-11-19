import React from "react";
import Form from "../components/Form";
import Posts from "../components/Posts";
import { Navigate } from "react-router-dom";
import { Context } from "../context";

function PostsPage() {
  const [items, setItems] = React.useState([]);
  const { isAuth } = React.useContext(Context);

  React.useEffect(() => {
    fetch("http://127.0.0.1:5000/get")
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
      });
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

  return (
    <div className="layout">
      <div class="layout__left-sidebar">
        <svg
          class="brand"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g>
            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
          </g>
        </svg>

        <div class="sidebar-menu">
          <div class="sidebar-menu__item sidebar-menu__item--active">
            <svg
              class="sidebar-menu__item-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g>
                <path d="M22.58 7.35L12.475 1.897c-.297-.16-.654-.16-.95 0L1.425 7.35c-.486.264-.667.87-.405 1.356.18.335.525.525.88.525.16 0 .324-.038.475-.12l.734-.396 1.59 11.25c.216 1.214 1.31 2.062 2.66 2.062h9.282c1.35 0 2.444-.848 2.662-2.088l1.588-11.225.737.398c.485.263 1.092.082 1.354-.404.263-.486.08-1.093-.404-1.355zM12 15.435c-1.795 0-3.25-1.455-3.25-3.25s1.455-3.25 3.25-3.25 3.25 1.455 3.25 3.25-1.455 3.25-3.25 3.25z"></path>
              </g>
            </svg>
            Home
          </div>
          <div class="sidebar-menu__item">
            <img src="./svg/explore.svg" class="sidebar-menu__item-icon" />
            Explore
          </div>

          <div class="sidebar-menu__item">
            <img
              src="./svg/notifications.svg"
              class="sidebar-menu__item-icon"
            />
            Notifications
          </div>

          <div class="sidebar-menu__item">
            <img src="./svg/messages.svg" class="sidebar-menu__item-icon" />
            Messages
          </div>

          <div class="sidebar-menu__item">
            <img src="./svg/profile.svg" class="sidebar-menu__item-icon" />
            Profile
          </div>

          <div class="sidebar-menu__item">
            <img src="./svg/more.svg" class="sidebar-menu__item-icon" />
            More
          </div>
        </div>
      </div>
      <div class="layout__main">
        <Form onAddPost={onAddPost} />
        {items.map((item, id) => (
          <Posts key={id} item={item} updateLike={updateLike} />
        ))}
      </div>
      <div class="layout__right-sidebar-container">
        <div class="layout__right-sidebar">
          <div class="trends-for-you">
            <div class="trends-for-you__block">
              <div class="trends-for-you__heading">Trends for you</div>
            </div>
            <div class="trends-for-you__block">
              <div class="trends-for-you__meta-information">
                Trending in Novolenino
              </div>
              <div class="trends-for-you__trend-name">#iPhone2033</div>
              <div class="trends-for-you__meta-information">155k Tweets</div>
            </div>
            <div class="trends-for-you__block">
              <div class="trends-for-you__meta-information">
                Trending in Irkutsk
              </div>
              <div class="trends-for-you__trend-name">#idk</div>
            </div>
            <div class="trends-for-you__block">
              <div class="trends-for-you__meta-information">
                Trending in World
              </div>
              <div class="trends-for-you__trend-name">#42</div>
              <div class="trends-for-you__meta-information">2,400 Tweets</div>
            </div>
          </div>
          <div class="who-to-follow">
            <div class="who-to-follow__block">
              <div class="who-to-follow__heading">Who to follow</div>
            </div>
            <div class="who-to-follow__block">
              <img class="who-to-follow__author-logo" src="" />
              <div class="who-to-follow__content">
                <div>
                  <div class="who-to-follow__author-name">Other user</div>
                  <div class="who-to-follow__author-slug">@other user</div>
                </div>
                <div class="who-to-follow__button">Follow</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostsPage;

/*
      <Form onAddPost={onAddPost} />
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
*/
