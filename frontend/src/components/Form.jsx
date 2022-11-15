import React from "react";
import FlaskService from "../FlaskService";

export default function Form({ onAddPost }) {
  const [description, setDescription] = React.useState("");
  const handleClick = () => {
    FlaskService.InsertArticle({ description })
      .then((resp) => onAddPost(resp))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <div className="form">
        <input
          className="input"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Введите..."
        />
        <input type="file" name="file"></input>
        <button className="button" onClick={() => handleClick(description)}>
          Отправить!
        </button>
      </div>
    </div>
  );
}
