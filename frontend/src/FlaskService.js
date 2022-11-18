export default class FlaskService {
  static InsertArticle(description, image) {
    const data = new FormData();
    data.append("description", description);
    data.append("file", image);
    return fetch("http://127.0.0.1:5000/add", {
      method: "POST",
      body: data,
    }).then((resp) => resp.json());
  }

  static LogIn(email, password) {
    return fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email: email, password: password }),
    }).then((resp) => resp.status);
  }

  static InsertLike(id) {
    return fetch(`http://127.0.0.1:5000/like/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(id),
    }).then((resp) => resp.json());
  }
}
