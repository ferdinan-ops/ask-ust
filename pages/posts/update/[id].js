import { authPage } from "middlewares/authorizationPage";
import Template from "@components/main/Template";
import CreatePost from "@components/Created";
import Router from "next/router";
import { useState } from "react";
import axios from "axios";

export async function getServerSideProps(ctx) {
  const { token, id } = await authPage(ctx);
  const options = { headers: { Authorization: `Bearer ${token}` } };

  // user session data
  const userURL = `${process.env.URL_SERVER}/api/auth/user/${id}`;
  const user = await axios.get(userURL, options);

  // post data
  const { id: postId } = ctx.query;
  const postURL = `${process.env.URL_SERVER}/api/posts/detail/${postId}`;
  const post = await axios.get(postURL, options);

  return { props: { user: user.data.data, token, post: post.data.data } };
}

export default function Update({ user, token, post }) {
  const [content, setContent] = useState(post.content);
  const [title, setTitle] = useState(post.title);
  const [isLoading, setIsLoading] = useState(false);

  const updateHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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
    setIsLoading(false);
    Router.push("/");
  };

  const inputProps = { setTitle, setContent, title, isLoading, content };

  return (
    <Template titleHead="Edit Pertanyaan" user={user}>
      <CreatePost
        {...inputProps}
        createHandler={updateHandler}
        feedTitle="Edit Pertanyaan"
      />
    </Template>
  );
}
