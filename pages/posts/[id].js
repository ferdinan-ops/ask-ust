import InputAnswer from "@components/answer/InputAnswer";
import { authPage } from "middlewares/authorizationPage";
import DetailPost from "@components/posts/DetailPost";
import Sidebar from "@components/main/Sidebar";
import Answer from "@components/answer/Answer";
import Layout from "@components/posts/Layout";
import Widget from "@components/main/Widget";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "prismjs/themes/prism-dracula.css";
import Main from "@components/main/Main";
import Prism from "prismjs";
import axios from "axios";

export async function getServerSideProps(ctx) {
  const { token, id } = await authPage(ctx);
  const { id: postId } = ctx.query;
  const options = {
    headers: {
      "Content-Type": "Aplication/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // user session data
  const userURL = `${process.env.URL_SERVER}/api/auth/user/${id}`;
  const user = await axios.get(userURL, options);

  // post detail data
  const postURL = `${process.env.URL_SERVER}/api/posts/detail/${postId}`;
  const post = await axios.get(postURL, options);

  // answer list
  const answerURL = `${process.env.URL_SERVER}/api/answer/detail/${postId}`;
  const answerList = await axios.get(answerURL, options);

  return {
    props: {
      user: user.data.data,
      post: post.data.data,
      answerList: answerList.data.data,
      token,
    },
  };
}

export default function Home({ user, post, answerList, token }) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState(answerList);
  const [render, setRender] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
    setRender(true);
  }, []);

  const dispatch = useDispatch();
  dispatch({ type: "CHANGE_LOADING", value: false });

  const answerHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = { id_post: post.id, id_user: user.id, content };
    const addAnswer = await axios.post("/api/answer/create", data, {
      headers: {
        "Content-Type": "Aplication/json",
        Authorization: `Bearer ${token}`,
      },
    });

    setAnswers([...answers, addAnswer.data.data]);
    setIsLoading(false);
    setContent("");
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-[1500px]">
      <Sidebar session={user} />
      <Main title="Detail Pertanyaan" isDetailPost>
        <Layout>
          <DetailPost post={post} render={render} />
          {answers.map((answer, index) => (
            <Answer
              answerList={answer}
              render={render}
              userId={user.id}
              key={index}
            />
          ))}
          <InputAnswer
            content={content}
            setContent={setContent}
            isLoading={isLoading}
            commentHandler={answerHandler}
          />
        </Layout>
      </Main>
      <Widget />
    </main>
  );
}
