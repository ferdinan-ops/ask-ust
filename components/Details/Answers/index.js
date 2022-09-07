import Card from "./Card";

export default function AnswersPost({ answers, allAnswerProps }) {
  const { render, deleteHandler, setContent, setEdit, userId } = allAnswerProps;
  return (
    <div className="border-b-2 border-[#EBEEF0] ">
      <h1 className="text-xl p-4 xl:px-6 font-semibold text-font">
        {answers.length > 0
          ? `${answers.length} Jawaban`
          : "Belum Ada Jawaban 😢"}
      </h1>

      {answers.map((answer) => (
        <div key={answer.id} className="border-y-2 last:border-none">
          <Card
            answerList={answer}
            render={render}
            deleteHandler={deleteHandler}
            setContent={setContent}
            setEdit={setEdit}
            userId={userId}
          />
        </div>
      ))}
    </div>
  );
}
