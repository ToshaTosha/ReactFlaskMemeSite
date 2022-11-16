export default class FlaskService {
  static InsertArticle(description, image) {
    const data = new FormData();
    data.append("description", description);
    data.append("file", image);
    return fetch("http://127.0.0.1:5000/add", {
      method: "POST",
      body: data
    }).then((resp) => resp.json());
  }

  static InsertLike(id) {
    return fetch(`http://127.0.0.1:5000/like/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    }).then((resp) => resp.json());
  }
}
