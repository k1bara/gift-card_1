const API_URL = "https://eight-catkin-raccoon.glitch.me/"

const swiperThumb = new Swiper('.gift__swipper--thumb', {
spaceBetween: 16,
slidesPerView: "auto",
freeMode: true,
watchSlidesProgress: true,
breakpoints: {
    320: {
        spaceBetween: 12,
    },
    1141: {
        spaceBetween: 16,
    }
}
});

const swiperMain = new Swiper('.gift__swipper--card', {
spaceBetween: 20,
thumbs: {
    swiper: swiperThumb
}
});

const form = document.querySelector(".form");
const submitButton = form.querySelector(".form__button");
const phoneInputs = form.querySelectorAll(".form__field--phone");
const cardInput = document.querySelector('.form__card');


const updateCardInput = () => {
    const activeSlide = document.querySelector(".gift__swipper--card .swiper-slide-active",
    );

    const cardData = activeSlide.querySelector(".gift__card-image").dataset.card;
    cardInput.value = cardData;
};

updateCardInput();

swiperMain.on("slideChangeTransitionEnd", updateCardInput);

for (let i = 0; i < phoneInputs.length; i++) {
    const element = phoneInputs[i];
    IMask(element, {
        mask: "+{7}(000)000-00-00",
        });
}

const updateSubmitButton = () => {
    let isFormField = true;

    for (const field of form.elements) {
        if (field.classList.contains("form__field")) {
            if (!field.value.trim()) {
                isFormField = false;
                break;
            }
        }
    }
    submitButton.disabled = !isFormField;
};

const phoneValidateOption = {
    format: {
        pattern: "\\+7\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2}",
        message: 'Номер телефона должен соответствовать формату: "+7(XXX)XXX-XX-XX"',
    },
}

form.addEventListener("input", updateSubmitButton);

form.addEventListener("submit", async(event) => {
    event.preventDefault();

    const errors = validate(form, {
        sender_phone: phoneValidateOption,
        receiver_phone: phoneValidateOption,
    })
    
if (errors){
    for (const key in errors) {
        const errorString = errors[key];
        alert(errorString);
    }
    return;
}
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
    const response = await fetch(`${API_URL}/api/gift`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
        if (response.ok) {
            prompt('Открытка успешно сохранена. Доступна по адресу: ', `${location.origin}/card.html?id=${result.id}`,);
            form.reset();
        } else {
            alert(`Ошибка при отправке: ${result.message}`)
        }



    } catch (error) {
        console.error(`Ошибка при отправке: ${error}`)
        alert(`Произошла ошибка, попробуйте снова!`)
    }

});
