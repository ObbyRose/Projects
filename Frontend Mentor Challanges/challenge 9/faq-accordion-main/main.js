const questions = document.querySelectorAll(".questions .question");

questions.forEach((question) => {
    const h4 = question.querySelector("h4");
    const plus = question.querySelector(".plus");
    const minus = question.querySelector(".minus");
    const paragraph = question.querySelector(".paragraph");

    h4.addEventListener("click", () => {
        const isHidden = paragraph.classList.contains("hidden");

        if (isHidden) {
            paragraph.classList.remove("hidden");
            plus.classList.add("hidden");
            minus.classList.remove("hidden");
        } else {
            paragraph.classList.add("hidden");
            plus.classList.remove("hidden");
            minus.classList.add("hidden");
        }
    });
});
