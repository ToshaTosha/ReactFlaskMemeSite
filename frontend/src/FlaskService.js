export default class FlaskService {
  static InsertArticle(description, image) {
    const data = new FormData();
    data.append("description", description);
    data.append("file", image);
    return fetch("/add", {
      method: "POST",
      body: data,
    }).then((resp) => resp.json());
  }

  static LogIn(email, password) {
    return fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email: email, password: password }),
    }).then((resp) => resp.status);
  }

  static InsertLike(id) {
    return fetch(`/like/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(id),
    }).then((resp) => resp.json());
  }
}
