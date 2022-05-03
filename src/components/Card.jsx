import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";
export function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const { name, likes, link, owner } = props.cardData;
  //const { cardName: name, cardLikes: likes, cardLink: link } = props;

  function handleClick() {
    props.onCardClick(props.cardData);
  }
  function handleLikeClick() {
    props.onCardLike(props.cardData);
  }
  const isOwn =
    owner._id === currentUser._id
      ? "card__delete-card_visibility_isVisible"
      : "";

  const isLiked = likes.some((user) => user._id === currentUser._id);
  const isLikedClassName = isLiked ? "btn-like_state_active" : "";

  return (
    <article className="card">
      <div className="card__upper">
        <button
          aria-label="Delete Card"
          className={`btn-delete card__delete-card ${isOwn}`}
          type="button"
        ></button>

        <img
          src={link}
          onClick={handleClick}
          className="card__img"
          alt="Card"
        />
      </div>
      <div className="card__bottom">
        <h3 className="card__name">{name}</h3>
        <div className="card__like">
          <button
            aria-label="like button"
            onClick={handleLikeClick}
            className={`btn-like card__like-button ${isLikedClassName}`}
            type="button"
          ></button>
          <span className="card__like-counter">{likes.length}</span>
        </div>
      </div>
    </article>
  );
}
