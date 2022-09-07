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
  const { id_user, username, image, updated_at, content } = answerList;
  const detail = DOMPurify.sanitize(content);

  return (
    <div className="pb-6 check px-4 xl:px-6">
      <div className="mt-6 flex items-center font-medium">
        <ProfileHeader
          isAnswer
          deleteHandler={deleteHandler}
          setContent={setContent}
          setEdit={setEdit}
          username={username}
          image={image}
          updated_at={updated_at}
          isUserHave={userId == id_user}
          answerList={answerList}
        />
      </div>

      {render && (
        <div
          className="mt-5 prose text-font detail "
          dangerouslySetInnerHTML={{ __html: detail }}
        />
      )}

      <AnswerReact />
    </div>
  );
}
