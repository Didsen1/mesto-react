import React from "react";

export default function ImagePopup(props) {
    return(
        <section className={`popup img-popup ${props.card.link !== '' && 'popup_opened'}`} >
            <div className="popup__container-img">
                <button className="popup__btn-closed" type="button" onClick={props.onClose}/>
                <img className="popup__img" src={`${props.card.link}`}  alt={props.card.name}/>
                <p className="popup__caption">{props.card.name}</p>
            </div>
        </section>
    );
}