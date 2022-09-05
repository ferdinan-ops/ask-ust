import Card from "./Card";

export default function AnswersPost({ answers, allAnswerProps }) {
  return (
    <div className="border-b-2 p-4 border-[#EBEEF0] xl:py-4 xl:px-6">
      <h1 className="text-xl font-semibold text-font">
        {answers.length > 0
          ? `${answers.length} Jawaban`
          : "Belum Ada Jawaban 😢"}
      </h1>
      {answers.map((answer) => (
        <div key={answer.id}>
          <Card answerList={answer} {...allAnswerProps} />
        </div>
      ))}
    </div>
  );
}
