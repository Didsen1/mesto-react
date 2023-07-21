import React from "react";

export default function Card(props) {

    function handleCardClick() {
        props.onCardClick(props.card)
    }

    return (

        <div className="element">
            <button className="element__delete-button"></button>
            <img className="element__img" src={props.card.link} alt={props.card.name} onClick={handleCardClick} />
            <div className="element__caption">
                <h2 className="element__caption-title">{props.card.name}</h2>
                <div className="element__caption-like-section">
                    <button className="element__caption-button" type="button"></button>
                    <p className="element__caption-like-counter">{props.card.likes.length}</p>
                </div>
            </div>
        </div>

    );
}