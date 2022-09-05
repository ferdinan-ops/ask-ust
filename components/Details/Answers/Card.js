import DOMPurify from "isomorphic-dompurify";
import ProfileHeader from "@components/Home/ProfileHeader";
import AnswerReact from "./AnswerReact";

export default function Card({
  answerList,
  render,
  deleteHandler,
  setContent,
  setEdit,
  userId,
}) {
  const detail = DOMPurify.sanitize(answerList.content);

  return (
    <>
      <div className="mt-6 flex items-center font-medium">
        <ProfileHeader
          isAnswer
          deleteHandler={deleteHandler}
          answerList={answerList}
          setContent={setContent}
          setEdit={setEdit}
          postInfo={answerList}
          isUserHave={userId === answerList.id_user}
        />
      </div>
      {/* more={{
          isUserHave: userId === answerList.id_user,
          isAnswer: true,
          deleteHandler,
          answerList,
          setContent,
          setEdit,
        }} */}

      {render && (
        <div
          className="mt-5 prose text-font detail"
          dangerouslySetInnerHTML={{ __html: detail }}
        />
      )}

      <AnswerReact />
    </>
  );
}
