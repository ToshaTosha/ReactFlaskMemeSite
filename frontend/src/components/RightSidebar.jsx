import React from "react";
import { Context } from "../context";

function RightSidebar() {
  const { setIsAuth } = React.useContext(Context);
  const handleLogout = () => {
    fetch("/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(setIsAuth(false));
  };
  return (
    <div className="layout__right-sidebar-container">
      <div className="layout__right-sidebar">
        <div className="trends-for-you">
          <div className="trends-for-you__block">
            <div className="trends-for-you__heading">Trends for you</div>
          </div>
          <div className="trends-for-you__block">
            <div className="trends-for-you__meta-information">
              Trending in Novolenino
            </div>
            <div className="trends-for-you__trend-name">#iPhone2033</div>
            <div className="trends-for-you__meta-information">155k Tweets</div>
          </div>
          <div className="trends-for-you__block">
            <div className="trends-for-you__meta-information">
              Trending in Irkutsk
            </div>
            <div className="trends-for-you__trend-name">#idk</div>
          </div>
          <div className="trends-for-you__block">
            <div className="trends-for-you__meta-information">
              Trending in World
            </div>
            <div className="trends-for-you__trend-name">#42</div>
            <div className="trends-for-you__meta-information">2,400 Tweets</div>
          </div>
        </div>
        <div className="who-to-follow">
          <div className="who-to-follow__block">
            <div className="who-to-follow__heading">Кого читать</div>
          </div>
          <div className="who-to-follow__block">
            <img
              className="who-to-follow__author-logo"
              src="https://lifeo.ru/wp-content/uploads/milie-kartinki-kotikiv-dlya-srisovki-53-min.jpg"
              alt="author-logo"
            />
            <div className="who-to-follow__content">
              <div>
                <div className="who-to-follow__author-name">Other user</div>
                <div className="who-to-follow__author-slug">@other user</div>
              </div>
              <div className="who-to-follow__button">Читать</div>
            </div>
          </div>
        </div>
        <div className="logout">
          <button className="button" onClick={handleLogout}>
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
}

export default RightSidebar;
