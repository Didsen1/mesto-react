import React from 'react';

export default function PopupWithForm(props) {

    return (
            <section className={`popup ${props.name}-popup popup_${props.isOpen ? 'opened' : 'closed'}`}>
                <div className="popup__container">
                    <button className="popup__btn-closed" type="button" onClick={props.onClose}/>
                    <h3 className="popup__title">{props.title}</h3>
                    <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
                            {props.children}
                        <button className="popup__btn-save" type="submit">{props.buttonText}</button>
                    </form>
                </div>
            </section>
    );
}