import React from "react";
import FlaskService from "../FlaskService";

function Posts({ item, updateLike }) {
  let date = new Date(item.date);
  let brandNewDate =
    date.getDay() + "." + date.getMonth() + "." + date.getFullYear();
  const handleClickLike = () => {
    FlaskService.InsertLike(item.id)
      .then((resp) => updateLike(resp))
      .catch((error) => console.error(error));
  };
  return (
    <div className="post-container">
      <div class="tweet">
        <div class="tweet__main">
          <div class="tweet__header">
            <div class="tweet__author-name">{item.author}</div>
            <div class="tweet__publish-time">{brandNewDate}</div>
          </div>
          <div class="tweet__content">
            {item.description}
            <img class="tweet__image" src={item.url} />
          </div>
        </div>
      </div>
      <div className="about-post">
        <div className="about-post-item">
          <span className="likes-counter">0</span>
          <button className="like">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chat"
              viewBox="0 0 16 16"
            >
              <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
            </svg>
          </button>
        </div>
        <div className="about-post-item">
          <span className="likes-counter">0</span>
          <button className="like">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-repeat"
              viewBox="0 0 16 16"
            >
              <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192Zm3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z" />
            </svg>
          </button>
        </div>
        <div className="about-post-item">
          <span className="likes-counter">{item.likes}</span>
          <button onClick={handleClickLike} className="like">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill={item.liked_by_me ? "red" : "currentColor"}
              className="bi bi-heart"
              viewBox="0 0 16 16"
            >
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
            </svg>
          </button>
        </div>
        <div className="about-post-item">
          <span className="likes-counter">0</span>
          <button className="like">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-upload"
              viewBox="0 0 16 16"
            >
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Posts;
