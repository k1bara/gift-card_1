const card = document.querySelector(".card");
const cardTitle = document.querySelector(".card__title");
const cardContacts = document.querySelector(".card__contacts");


const rearrangeElement = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 580) {
        card.after(cardContacts);
    } else {
        cardTitle.after(cardContacts);
    }
};
rearrangeElement ();