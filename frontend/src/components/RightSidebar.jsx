import React from "react";
import { Context } from "../context";

function RightSidebar() {
  const { setIsAuth, isAuth } = React.useContext(Context);
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
  );
}

export default RightSidebar;
