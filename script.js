const buttons = document.querySelectorAll("[data-carousel-button]")
const indicators = document.querySelectorAll(".indicator");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        const slides = button.closest("[data-carousel]").querySelector("[data-slides]");
        const activeSlide = slides.querySelector("[data-active]");
        let newIndex = [...slides.children].indexOf(activeSlide) + offset;

        if (newIndex < 0) newIndex = slides.children.length - 1;
        if (newIndex >= slides.children.length) newIndex = 0;

        slides.children[newIndex].dataset.active = true;
        delete activeSlide.dataset.active;

        // Actualiza indicadores
        updateIndicators(newIndex);

        // if image=3 disable
        const carousel = button.closest("[data-carousel]");
        const disableNext = newIndex === slides.children.length - 1;
        const disablePrev = newIndex === 0;
        carousel.querySelector("[data-carousel-button=next]").disabled = disableNext;
        carousel.querySelector("[data-carousel-button=prev]").disabled = disablePrev;
    });
});

// Manejo de clic en los indicadores
indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
        const slides = document.querySelector("[data-slides]");
        const activeSlide = slides.querySelector("[data-active]");

        slides.children[index].dataset.active = true;
        delete activeSlide.dataset.active;

        // Actualiza indicadores
        updateIndicators(index);

        // if image=3 disable
        const carousel = document.querySelector("[data-carousel]");
        const disableNext = index === slides.children.length - 1;
        const disablePrev = index === 0;
        carousel.querySelector("[data-carousel-button=next]").disabled = disableNext;
        carousel.querySelector("[data-carousel-button=prev]").disabled = disablePrev;
    });
});

function updateIndicators(activeIndex) {
    indicators.forEach((indicator, index) => {
        if (index === activeIndex) {
            indicator.dataset.active = true;
        } else {
            delete indicator.dataset.active;
        }
    });
}


