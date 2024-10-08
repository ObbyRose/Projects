const rating_cards = document.querySelectorAll (".main-rating a")
const submit_btn = document.querySelector(".submitButton")
const rate_point = document.getElementById("rate")
const main_section = document.querySelector(".main-content")
const rating_section = document.querySelector(".hidden")

let rate = null

rating_cards.forEach ((rating_card) => {
    rating_card.addEventListener("click", (e) => {
        const active = document.querySelector(".checked");
        if (active) {
            active.classList.remove('checked')
        }
        const card = e.target.closest("a")
        card.classList.add("checked")
        rate = e.target.innerText;
    })
})

submit_btn.addEventListener("click", () => {
    if (rate) {
        rate_point.innerText = rate;
        main_section.classList.add("hidden")
        rating_section.classList.remove("hidden")
    }
})
