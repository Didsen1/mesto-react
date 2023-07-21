import React from 'react';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js'
import ImagePopup from './ImagePopup.js';


export default function App() {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

    const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }
    function handleEditProfileClick() {
        setEditProfilePopupOpen(!isEditProfilePopupOpen);

    }
    function handleAddPlaceClick() {
        setAddPlacePopupOpen(!isAddPlacePopupOpen);

    }

    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setSelectedCard({name: '', link: ''});
    }

    function handleCardClick(card) {
        setSelectedCard({name: card.name, link: card.link})
    }



    return (
        <>

            <Header />
            <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
            />
            <Footer />
            <PopupWithForm
                name='profile'
                isOpen={isEditProfilePopupOpen}
                title='Редактировать профиль'
                buttonText='Сохранить'
                onClose={closeAllPopups}
                children={
                    <>
                        <label className="popup__form-label">
                            <input type="text" className="popup__input" name="title" placeholder="Введите имя" required
                                minLength="2" maxLength="40" id="title-input" />
                            <span className="popup__input-error title-input-error">1</span>
                        </label>
                        <label className="popup__form-label">
                            <input type="text" className="popup__input" name="subtitle" placeholder="Введите название профессии"
                                required minLength="2" maxLength="200" id="subtitle-input" />
                            <span className="popup__input-error subtitle-input-error">1</span>
                        </label>
                    </>
                }
            />
            <PopupWithForm
                name='add'
                isOpen={isAddPlacePopupOpen}
                title='Новое место'
                buttonText='Создать'
                onClose={closeAllPopups}
                children={
                    <>
                        <label className="popup__form-label">
                            <input type="text" className="popup__input" name="place" placeholder="Название" required minLength="2"
                                maxLength="30" id="place-input" />
                            <span className="popup__input-error place-input-error">1</span>
                        </label>
                        <label className="popup__form-label">
                            <input type="url" className="popup__input" name="image" placeholder="Ссылка на картинку" required
                                id="image-input" />
                            <span className="popup__input-error image-input-error">1</span>
                        </label>
                    </>
                } />
            <PopupWithForm
                name='avatar'
                isOpen={isEditAvatarPopupOpen}
                title='Обновить аватар'
                buttonText='Сохранить'
                onClose={closeAllPopups}
                children={
                    <>
                        <label className="popup__form-label">
                            <input type="url" className="popup__input" name="avatar" placeholder="Ссылка на картинку" required
                                id="avatar-input" />
                            <span className="popup__input-error avatar-input-error">1</span>
                        </label>
                    </>
                } />
            <PopupWithForm
                name='delete'
                buttonText='Да'
                title='Вы уверены?' />
            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
            />
        </>
    );
}

