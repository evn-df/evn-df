const { webcrypto } = require("node:crypto");

const tasks = [
  {
    title: 'Test title1',
    question: "How are you?",
    answers: ["ok", "bad"],
  },
  {
    title: 'Test title2',
    question: "How is your mom?",
    answers: ["ok"],
  },
];

const coder = new TextEncoder();

module.exports = async () =>
  await Promise.all(
    tasks.map(async (task) => {
      let hashedAnswerBuffers = await Promise.all(
        task.answers.map((answer) =>
          webcrypto.subtle
            .digest("SHA-1", coder.encode(answer.toLowerCase()))
            .then((ab) => new Uint8Array(ab))
        )
      );

      const hashedAnswers = hashedAnswerBuffers.map((answerBuffer) =>
        Array.from(answerBuffer)
          .map((el) => (el.toString(16)).padStart(2,'0'))
          .join("")
      );

      return {
        ...task,
        hashedAnswers,
      };
    })
  );
