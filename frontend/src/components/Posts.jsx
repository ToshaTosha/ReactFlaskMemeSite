import React from "react";

function Posts({ item }) {
  return (
    <div className="post-container">
      <span className="user-name">Этот пользовтель сказал:</span>
      <br />
      <span className="description">{item.description}</span>
      <br />
      <img
        className="image"
        src="https://sun9-7.userapi.com/impg/ysLlefKhImFidp4RXB8oY6zD8tfEvlH-RcKu2Q/O-uXJOFQW6Y.jpg?size=1593x988&quality=96&sign=c76c4e236d9364012ba4bc523172107c&type=album"
        alt="img"
      />
      <br />
      <span className="time">01.01.2010</span>
    </div>
  );
}

export default Posts;

/* 

*/
