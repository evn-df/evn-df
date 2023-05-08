const { webcrypto } = require("node:crypto");

const tasks = [
  {
    id: "test",
    question: "How are you?",
    successText: "You're right!",
    answers: ["ok", "bad"],
  },
  {
    id: "test2",
    question: "How is your mom?",
    successText: "unbelivable, ha?",
    answers: ["she's alright"],
  },
];

module.exports = () => {
  return {
    questions: tasks,
    answers: tasks.flatMap((task) =>
      task.answers.map((answer) => ({
        taskId: task.id,
        answer: answer.trim().toLocaleLowerCase(),
        successText: task.successText,
      }))
    ),
  };
};
