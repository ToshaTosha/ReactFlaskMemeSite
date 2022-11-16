import React from "react";
import FlaskService from "../FlaskService";

function Posts({ item, updateLike }) {
  const handleClickLike = () => {
    if (item.likes <= 0) {
      FlaskService.InsertLike(item.id)
        .then((resp) => updateLike(resp))
        .catch((error) => console.error(error));
    }
  };
  return (
    <div className="post-container">
      <span className="user-name">Этот пользовтель сказал:</span>
      <br />
      <span className="description">{item.description}</span>
      <br />
      <img
        className="image"
        src="https://static.mk.ru/upload/entities/2021/06/16/10/articles/facebookPicture/8b/b8/b5/f7/d5a31497c14d4e2bc37f26d7a9cf712d.jpg"
        alt="img"
      />
      <br />
      <span className="time">{item.date}</span>
      <br />
      <div className="like-container">
        <span className="likes-counter">{item.likes}</span>
        <button onClick={handleClickLike} className="like">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill={item.likes <= 0 ? "currentColor" : "red"}
            class="bi bi-heart"
            viewBox="0 0 16 16"
          >
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Posts;

/* 

*/
