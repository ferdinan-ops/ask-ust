import { authPage } from "middlewares/authorizationPage";
import Sidebar from "@components/main/Sidebar";
import Widget from "@components/main/Widget";
import Input from "@components/create/Input";
import { useDispatch } from "react-redux";
import Main from "@components/main/Main";
import Router from "next/router";
import { useState } from "react";
import axios from "axios";

export async function getServerSideProps(ctx) {
  const { token, id } = await authPage(ctx);

  // user session data
  const userURL = `${process.env.URL_SERVER}/api/auth/user/${id}`;
  const user = await axios.get(userURL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const { id: postId } = ctx.query;
  const postURL = `${process.env.URL_SERVER}/api/posts/detail/${postId}`;
  const post = await axios.get(postURL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return { props: { user: user.data.data, token, post: post.data.data } };
}

export default function Update({ user, token, post }) {
  console.log(post);
  const [content, setContent] = useState(post.content);
  const [userData, setUserData] = useState(user);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(post.title);

  const dispatch = useDispatch();
  dispatch({ type: "CHANGE_LOADING", value: false });

  const updateHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = { title, content };
    const update = await axios.put(`/api/posts/update/${post.id}`, data, {
      headers: {
        "Content-Type": "Aplication/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (update.status !== 200) return console.log("Error" + update.status);

    setTitle("");
    setContent("<p>Masukkan Deskripsi disini...<p>");
    setLoading(false);
    Router.push("/");
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-[1500px]">
      <Sidebar session={userData} />
      <Main title="Edit Pertanyaan">
        <Input
          setTitle={setTitle}
          setContent={setContent}
          title={title}
          createHandler={updateHandler}
          isLoading={loading}
          content={content}
        />
      </Main>
      <Widget />
    </main>
  );
}
