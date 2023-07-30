import React from 'react';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import api from '../utils/Api.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmPopup from './ConfirmPopup.js';


export default function App() {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
    const [chosenCard, setChosenCard] = React.useState({});

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, cards]) => {
                setCurrentUser(user);
                setCards(cards);
            })
            .catch((err) => console.log(err))
    }, [])

    React.useEffect(() => {
        function handleEscapeClick(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups()
            }
        }

        document.addEventListener('keyup', handleEscapeClick);

        return () => {
            document.removeEventListener('keyup', handleEscapeClick);
        }
    })

    const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });

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
        setConfirmPopupOpen(false);
        setSelectedCard({ name: '', link: '' });
    }

    function handleCardClick(card) {
        setSelectedCard({ name: card.name, link: card.link })
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                setCards(newCards);
            })
            .catch((err) => console.log(err));
    }


    function handleCardDelete(evt) {
        evt.preventDefault();
        api.deleteCard(chosenCard._id).then(() => {
            const newCards = cards.filter((elem) => elem !== chosenCard)
            setCards(newCards);
            closeAllPopups();
        })
            .catch((err) => console.log(err));
    }

    function handleConfirmPopupOpen(card) {
        setChosenCard(card);
        setConfirmPopupOpen(!isConfirmPopupOpen);
    }

    function handleUpdateUser(data) {
        api.changeUserInfo(data)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleUpdateAvatar(data) {
        api.changeUserAvatar(data)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleAddPlaceSubmit(data) {
        api.addCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <>
                <Header />
                <Main cards={cards} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleConfirmPopupOpen} />
                <Footer />
                <EditProfilePopup currentUser={currentUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                <ConfirmPopup isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onSubmit={handleCardDelete} />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </>

        </CurrentUserContext.Provider>
    );
}

