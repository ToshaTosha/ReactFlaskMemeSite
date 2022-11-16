export default class FlaskService {
  static InsertArticle(description) {
    return fetch("http://192.168.0.17:5000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(description),
    }).then((resp) => resp.json());
  }

  static InsertImage(img) {
    let data = new FormData();
    data.append("file", img);
    console.log(img);
    console.log(data);
    return fetch("http://192.168.0.17:5000/upload", {
      method: "POST",
      //headers: {
      //  "Content-Type": "multipart/form-data",
      //},
      body: data,
    });
  }

  static InsertLike(id) {
    return fetch(`http://192.168.0.17:5000/like/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    }).then((resp) => resp.json());
  }
}
