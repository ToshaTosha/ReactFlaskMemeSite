import React from "react";
import Form from "../components/Form";
import Posts from "../components/Posts";
import { Navigate } from "react-router-dom";
import { Context } from "../context";

function PostsPage() {
  const [items, setItems] = React.useState([]);
  const { setIsAuth, isAuth } = React.useContext(Context);

  React.useEffect(() => {
    fetch("/get")
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
      });
  }, []);
  console.log(items);
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

  const handleLogout = () => {
    fetch("/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(setIsAuth(false));
  };

  return isAuth ? (
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
            <svg
              class="sidebar-menu__item-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g>
                <path d="M21 7.337h-3.93l.372-4.272c.036-.412-.27-.775-.682-.812-.417-.03-.776.27-.812.683l-.383 4.4h-6.32l.37-4.27c.037-.413-.27-.776-.68-.813-.42-.03-.777.27-.813.683l-.382 4.4H3.782c-.414 0-.75.337-.75.75s.336.75.75.75H7.61l-.55 6.327H3c-.414 0-.75.336-.75.75s.336.75.75.75h3.93l-.372 4.272c-.036.412.27.775.682.812l.066.003c.385 0 .712-.295.746-.686l.383-4.4h6.32l-.37 4.27c-.036.413.27.776.682.813l.066.003c.385 0 .712-.295.746-.686l.382-4.4h3.957c.413 0 .75-.337.75-.75s-.337-.75-.75-.75H16.39l.55-6.327H21c.414 0 .75-.336.75-.75s-.336-.75-.75-.75zm-6.115 7.826h-6.32l.55-6.326h6.32l-.55 6.326z"></path>
              </g>
            </svg>
            Explore
          </div>

          <div class="sidebar-menu__item">
            <svg
              class="sidebar-menu__item-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g>
                <path d="M21.697 16.468c-.02-.016-2.14-1.64-2.103-6.03.02-2.532-.812-4.782-2.347-6.335C15.872 2.71 14.01 1.94 12.005 1.93h-.013c-2.004.01-3.866.78-5.242 2.174-1.534 1.553-2.368 3.802-2.346 6.334.037 4.33-2.02 5.967-2.102 6.03-.26.193-.366.53-.265.838.102.308.39.515.712.515h4.92c.102 2.31 1.997 4.16 4.33 4.16s4.226-1.85 4.327-4.16h4.922c.322 0 .61-.206.71-.514.103-.307-.003-.645-.263-.838zM12 20.478c-1.505 0-2.73-1.177-2.828-2.658h5.656c-.1 1.48-1.323 2.66-2.828 2.66zM4.38 16.32c.74-1.132 1.548-3.028 1.524-5.896-.018-2.16.644-3.982 1.913-5.267C8.91 4.05 10.397 3.437 12 3.43c1.603.008 3.087.62 4.18 1.728 1.27 1.285 1.933 3.106 1.915 5.267-.024 2.868.785 4.765 1.525 5.896H4.38z"></path>
              </g>
            </svg>
            Notifications
          </div>

          <div class="sidebar-menu__item">
            <svg
              class="sidebar-menu__item-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g>
                <path d="M19.25 3.018H4.75C3.233 3.018 2 4.252 2 5.77v12.495c0 1.518 1.233 2.753 2.75 2.753h14.5c1.517 0 2.75-1.235 2.75-2.753V5.77c0-1.518-1.233-2.752-2.75-2.752zm-14.5 1.5h14.5c.69 0 1.25.56 1.25 1.25v.714l-8.05 5.367c-.273.18-.626.182-.9-.002L3.5 6.482v-.714c0-.69.56-1.25 1.25-1.25zm14.5 14.998H4.75c-.69 0-1.25-.56-1.25-1.25V8.24l7.24 4.83c.383.256.822.384 1.26.384.44 0 .877-.128 1.26-.383l7.24-4.83v10.022c0 .69-.56 1.25-1.25 1.25z"></path>
              </g>
            </svg>
            Messages
          </div>

          <div class="sidebar-menu__item">
            <svg
              class="sidebar-menu__item-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g>
                <path d="M16.5 10.25c-.965 0-1.75.787-1.75 1.75s.784 1.75 1.75 1.75c.964 0 1.75-.786 1.75-1.75s-.786-1.75-1.75-1.75zm0 2.5c-.414 0-.75-.336-.75-.75 0-.413.337-.75.75-.75s.75.336.75.75c0 .413-.336.75-.75.75zm-4.5-2.5c-.966 0-1.75.787-1.75 1.75s.785 1.75 1.75 1.75 1.75-.786 1.75-1.75-.784-1.75-1.75-1.75zm0 2.5c-.414 0-.75-.336-.75-.75 0-.413.337-.75.75-.75s.75.336.75.75c0 .413-.336.75-.75.75zm-4.5-2.5c-.965 0-1.75.787-1.75 1.75s.785 1.75 1.75 1.75c.964 0 1.75-.786 1.75-1.75s-.787-1.75-1.75-1.75zm0 2.5c-.414 0-.75-.336-.75-.75 0-.413.337-.75.75-.75s.75.336.75.75c0 .413-.336.75-.75.75z"></path>
                <path d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"></path>
              </g>
            </svg>
            More
          </div>
        </div>
      </div>
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
          <div className="logout">
            <button className="button" onClick={handleLogout}>
              LogOut
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate replace to="/login" />
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
