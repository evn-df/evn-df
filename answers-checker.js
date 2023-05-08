const forms = Array.from(document.querySelectorAll(".js-answer-form"));

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    console.log(form);
    const taskId = form.dataset.taskId;
    const answer = form.elements.answer.value.toLowerCase().trim();
    const rightAnswerEl = form.querySelector(".answer-card__answer");

    rightAnswerEl.classList.remove("answer-card__answer--wrong");
    rightAnswerEl.innerText = "Проверяем ответ...";
    form.classList.remove("answer-card--success");

    fetch(`/answer/${taskId}--${answer}.json`)
      .then((response) => response.json())
      .then((result) => {
        rightAnswerEl.innerText = result.successText;
        form.classList.add("answer-card--success");
      })
      .catch(() => {
        rightAnswerEl.innerText = "Неправильный ответ. Попробуйте еще раз";
        rightAnswerEl.classList.add("answer-card__answer--wrong");
      });
  });
});
