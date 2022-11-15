import React from "react";
import FlaskService from "../FlaskService";

export default function Form({ onAddPost }) {
  const [description, setDescription] = React.useState("");
  const [img, setImg] = React.useState([]);
  const handleClick = () => {
    FlaskService.InsertArticle({ description })
      .then((resp) => onAddPost(resp))
      .catch((error) => console.error(error));
  };
  const handleClickImg = () => {
    FlaskService.InsertImage(img);
    //console.log(img);
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
        <button className="button" onClick={() => handleClick(description)}>
          Отправить!
        </button>
        <input
          onChange={(e) => setImg(e.target.files[0])}
          type="file"
          name="file"
        ></input>
        <button className="button" onClick={() => handleClickImg(img)}>
          Отправить!
        </button>
      </div>
    </div>
  );
}
