import React, { useContext } from "react";
import { api } from "../utils/Api";
import { Card } from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  const [cards, setCards] = React.useState([]);
  console.log(cards);
  const handleCardClick = (card) => {
    console.log(cards.length);
    props.onCardClick(card);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard
        )
      );
    });
  }

  React.useEffect(() => {
    console.log("card geting");
    api
      .getInitialCards()
      .then((res) => {
        let dza = true;
        if (dza === true) {
          dza = false;
          return;
        }
        const cardElement = res.map((card) => (
          <Card
            key={card._id}
            cardData={card}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
          ></Card>
        ));

        setCards([...cards, cardElement]);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            src={currentUser.avatar}
            alt="Profile Avatar"
            className="profile__avatar"
          />
          <button
            onClick={props.onHandleEditAvatarClick}
            id="profileAvatarEdit"
            alt="Change Profile Avatar"
            className="btn-edit profile__avatar-edit"
          >
            {" "}
          </button>
        </div>

        <div className="profile__info">
          <div className="flex-wrapper">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={props.onHandleEditProfileClick}
              aria-label="Edit profile info"
              className="btn-edit profile__edit-info"
              type="button"
            ></button>
          </div>
          <p className="profile__title">{currentUser.about}</p>
          <button
            onClick={props.onHandleAddPlaceClick}
            aria-label="Add an item"
            className="profile__add btn-add"
            type="button"
          ></button>
        </div>
      </section>

      <section className="cards">
        {/*      <img id="cardsLoading" alt="loading cards" /> */}
        {cards}
      </section>
    </main>
  );
}
