import { authPage } from "middlewares/authorizationPage";
import DetailPost from "@components/posts/DetailPost";
import Sidebar from "@components/main/Sidebar";
import Widget from "@components/main/Widget";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "prismjs/themes/prism-dracula.css";
import moment from "moment/moment";
import Prism from "prismjs";
import axios from "axios";
import Head from "next/head";

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

  // answer 
  const answerURL = `${process.env.URL_SERVER}/api/answer/detail/${postId}`;
  const answer = await axios.get(answerURL, options);

  return {
    props: { user: user.data.data, post: post.data.data, answer: answer.data.data, token },
  };
}

export default function Home({ user, post, answer, token }) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState(answer);
  const [render, setRender] = useState(false);
  const [edit, setEdit] = useState({});

  const options = {
    headers: {
      "Content-Type": "Aplication/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    Prism.highlightAll();
    setRender(true);
  }, []);

  const dispatch = useDispatch();
  dispatch({ type: "CHANGE_LOADING", value: false });

  const cancelHandler = (e) => {
    e.preventDefault();
    setIsLoading(false);
    setContent("");
    setEdit({});
  };

  const answerHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (edit.id) {
      const updated_at = moment(new Date().getTime()).format(
        "YYYY-MM-DD H:mm:ss"
      );
      edit["updated_at"] = updated_at;

      const data = { content, updated_at };
      const updateURL = `/api/answer/update/${edit.id}`;
      const update = await axios.put(updateURL, data, options);
      if (update.status !== 200) return console.log("Error" + update.status);

      const updateAnswer = { ...edit, content };
      const editAnswerIndex = answers.findIndex(
        (answer) => answer.id === edit.id
      );
      const updatedAnswers = [...answers];
      updatedAnswers[editAnswerIndex] = updateAnswer;
      setAnswers(updatedAnswers);

      return cancelHandler(e);
    }

    const data = { id_post: post.id, id_user: user.id, content };
    const addAnswer = await axios.post("/api/answer/create", data, options);

    setAnswers([...answers, addAnswer.data.data]);
    setIsLoading(false);
    setContent("");
  };

  const deleteHandler = async (id, e) => {
    e.preventDefault();
    const ask = confirm("Anda yakin ingin menghapus jawaban ini?");
    if (ask) {
      const deleted = await axios.delete(`/api/answer/delete/${id}`, options);
      const answerFiltered = answers.filter((answer) => answer.id !== id);
      setAnswers(answerFiltered);
    }
  };

  const inputProps = { answerHandler, cancelHandler, content, setContent, edit: edit.id, setEdit, isLoading };
  const answerProps = { render, userId: user.id, deleteHandler };

  return (
    <main className="mx-auto flex min-h-screen max-w-[1500px]">
      <Head><title>{post.title}</title></Head>
      <Sidebar session={user} />
      <DetailPost
        post={post}
        answers={answers}
        inputProps={inputProps}
        answerProps={answerProps}
      />
      <Widget />
    </main>
  );
}
