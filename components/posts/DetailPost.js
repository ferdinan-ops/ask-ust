import Answer from "@components/answer/Answer";
import InputAnswer from "@components/answer/InputAnswer";
import ImageHeader from "./ImageHeader";
import PostReaction from "./PostReaction";
import Layout from "./Layout";
import Main from "@components/main/Main";

function DetailPost({ post, answers, inputProps, answerProps }) {
  const { title, content: postDetail } = post;
  const { setContent, setEdit } = inputProps
  const { render } = answerProps
  const allAnswerProps = { ...answerProps, setContent, setEdit }

  return (
    <Main title="Detail Pertanyaan" isDetailPost>
      <Layout>
        <div className="flex flex-col p-4 xl:px-6 border-b-2 border-[#EBEEF0] font-medium text-font">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <ImageHeader {...post} />

          {render && (
            <div
              className="mt-5 prose text-font detail"
              dangerouslySetInnerHTML={{ __html: postDetail }}
            />
          )}

          <PostReaction />
        </div>

        <div className="border-b-2 p-4 border-[#EBEEF0] xl:py-4 xl:px-6">
          <h1 className="text-xl font-semibold text-font">{answers.length > 0 ? `${answers.length} Jawaban` : "Belum Ada Jawaban 😢"}</h1>
          {answers.map((answer) => (
            <div key={answer.id}>
              <Answer answerList={answer} {...allAnswerProps} />
            </div>
          ))}
        </div>

        <InputAnswer {...inputProps} />
      </Layout>
    </Main>
  );
}

export default DetailPost;
