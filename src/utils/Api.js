class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = { headers: headers };
  }

  customFetch = (url, options) => {
    return fetch(url, options).then((res) =>
      res.ok ? res.json() : Promise.reject(res.statusText)
    );
  };

  getUserInfo() {
    return this.customFetch(`${this._baseUrl}/users/me`, this._headers);
  }

  getInitialCards() {
    return this.customFetch(`${this._baseUrl}/cards`, this._headers);
  }

  createNewCard(data) {
    return this.customFetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers.headers,
      body: JSON.stringify(data),
    });
  }

  setProfileInfo(data) {
    const userObj = {
      name: data.profileName,
      about: data.profileTitle,
      avatar: data.profileAvatar,
    };
    return this.customFetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers.headers,
      body: JSON.stringify(userObj),
    });
  }

  deleteCard(cardId) {
    return this.customFetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers.headers,
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    console.log("changeLikeCardStatus", isLiked, cardId)
    return isLiked ? this.addLike(cardId) : this.removeLike(cardId)
  }

  addLike(cardId) {
    console.log("isAddLike")
    return this.customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers.headers,
    });
  }

  removeLike(cardId) {
    console.log("isRemoveLike")
    return this.customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers.headers,
    });
  }

  setAvatar(link) {
    return this.customFetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers.headers,
      body: JSON.stringify(link),
    });
  }
}

// automated tests
export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "89275f46-d96a-420c-9a94-a2948b040a2e",
    "Content-Type": "application/json",
  },
});
