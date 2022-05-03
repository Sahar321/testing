export function PopupWithForm(props) {
  const { name, title, submitTitle, children, onClose, isOpen } = props;

  const formElement = (
    <div id={name} className={`overlay ${isOpen ? "overlay_visible" : ""}`}>
      <button
        onClick={onClose}
        className="btn-close overlay__btn-close"
        aria-label="Close"
        type="button"
      ></button>
      <form name={name} className="popup form" noValidate>
        <h2 className="popup__lbl-title">{title}</h2>
        {children}
        <button
          aria-label={submitTitle}
          className="btn-submit popup__btn-submit"
          type="submit"
        >
          {submitTitle}
        </button>
      </form>
    </div>
  );

  return formElement;
}
