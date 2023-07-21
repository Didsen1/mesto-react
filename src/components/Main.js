import React from 'react';
import api from '../utils/Api.js'
import Card from './Card.js';

export default function Main(props) {

    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');

    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {

        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, cards]) => {
                setUserName(user.name);
                setUserDescription(user.about);
                setUserAvatar(user.avatar);
                setCards(cards);
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <main className="main">

            <section className="profile">

                <div className="profile__info-container">
                    <div className="profile__avatar" alt="Фото профиля" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${userAvatar})` }} ></div>
                    <div className="profile__info">
                        <div className="profile__info-container-crutch">
                            <h1 className="profile__info-title">{userName}</h1>
                            <button className="profile__info-edit-button" type="button" onClick={props.onEditProfile} />
                        </div>
                        <p className="profile__info-subtitle">{userDescription}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace} />

            </section>

            <section className="elements">
                {cards.map((card) => (
                    <Card key={card._id} card={card} onCardClick={props.onCardClick} />
                ))}
            </section>

        </main>
    );
} 