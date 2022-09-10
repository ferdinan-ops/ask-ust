import Layout from "./Layout";
import Feed from "@components/main/Feed";
import AnswersPost from "./Answers";
import Editor from "./Answers/Editor";
import ImageHeader from "./ImageHeader";
import AnswerReact from "./Answers/AnswerReact";
import ProfileHeader from "@components/Home/ProfileHeader";

function DetailPost({ post, answers, inputProps, answerProps }) {
  const { title, content: postDetail, username, image, update_at, id } = post;
  const { setContent, setEdit } = inputProps;
  const { render, userId, deleteHandler } = answerProps;
  const allAnswerProps = { ...answerProps, setContent, setEdit };
  const more = {
    isUserHave: answerProps.userId === post.id,
    deleteHandler: answerProps.deleteHandler,
    postId: post.id,
  };

  return (
    <Feed title="Detail Pertanyaan" isDetailPost>
      <Layout>
        <div className="flex flex-col p-4 xl:px-6 border-b-2 border-[#EBEEF0] font-medium text-font">
          <h1 className="text-2xl font-semibold mb-6">{title}</h1>
          <ProfileHeader
            isDetailPost
            userId={id}
            username={username}
            image={image}
            update_at={update_at}
            isUserHave={userId === id}
            deleteHandler={deleteHandler}
            postId={id}
          />

          {render && (
            <div
              className="mt-5 prose text-font detail"
              dangerouslySetInnerHTML={{ __html: postDetail }}
            />
          )}

          <AnswerReact />
        </div>

        <AnswersPost answers={answers} allAnswerProps={allAnswerProps} />

        <Editor {...inputProps} />
      </Layout>
    </Feed>
  );
}

export default DetailPost;
