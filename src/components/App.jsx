import React, { useContext, useState } from "react";
import { CurrentUserContextProvider } from "../contexts/CurrentUserContext";
// main components
import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";

//model window
import { ImagePopup } from "./ImagePopup";
import { PopupWithForm } from "./PopupWithForm";
//import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
function App() {
  //const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  /* React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => setCurrentUser(res))
      .catch((error) => console.log(error));
  }, []); */

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(props) {
    setSelectedCard(props);
  }

  return (
    <div className="page">
      <CurrentUserContextProvider>
        <Header></Header>

        <Main
          onCardClick={handleCardClick}
          onHandleAddPlaceClick={handleAddPlaceClick}
          onHandleEditProfileClick={handleEditProfileClick}
          onHandleEditAvatarClick={handleEditAvatarClick}
        ></Main>

        <Footer></Footer>

        <PopupWithForm
          name="formProfile"
          title="Edit Profile"
          submitTitle="Save"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            className="textbox popup__input"
            type="text"
            minLength="2"
            maxLength="40"
            required
            id="profileName"
            name="profileName"
          />
          <span id="profileName-error"></span>
          <input
            className="textbox popup__input"
            type="text"
            minLength="2"
            maxLength="200"
            required
            id="profileTitle"
            name="profileTitle"
          />
          <span id="profileTitle-error"></span>
        </PopupWithForm>

        <PopupWithForm
          name="formCard"
          title="New place"
          submitTitle="Create"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            className="textbox popup__input"
            type="text"
            required
            minLength="1"
            maxLength="30"
            name="name"
            id="cardTitle"
            placeholder="Title"
          />
          <span id="cardTitle-error"></span>
          <input
            className="textbox popup__input"
            type="text"
            required
            pattern="(https?:\/\/.*\.(?:png|jpg|gif|jpeg))"
            name="link"
            id="cardURL"
            placeholder="Image URL"
          />
          <span id="cardURL-error"></span>
        </PopupWithForm>

        <PopupWithForm
          name="formProfileAvatar"
          title="Change profile picture"
          submitTitle="Save"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <input
            className="textbox popup__input"
            type="text"
            required
            pattern="(https?:\/\/.*\.(?:png|jpg|gif|jpeg))"
            name="avatar"
            id="avatarImage"
            placeholder="Image URL"
          />
          <span id="avatarImage-error"></span>
        </PopupWithForm>

        <ImagePopup
          selectedElement={selectedCard}
          onClose={closeAllPopups}
        ></ImagePopup>
      </CurrentUserContextProvider>
    </div>
  );
}

export default App;
