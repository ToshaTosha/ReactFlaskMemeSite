export default class FlaskService {
  static InsertArticle(description) {
    return fetch("http://127.0.0.1:5000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(description),
    }).then((resp) => resp.json());
  }
}
