import { authPage } from "middlewares/authorizationPage";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Router from "next/router";
import axios from "axios";
import Template from "@components/main/Template";
import CreatePost from "@components/Created";

export async function getServerSideProps(ctx) {
  const { token, id } = await authPage(ctx);

  // user session data
  const userURL = `${process.env.URL_SERVER}/api/auth/user/${id}`;
  const user = await axios.get(userURL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return { props: { user: user.data.data, token } };
}

export default function Create({ user, token }) {
  const [content, setContent] = useState("");
  const [userData, setUserData] = useState(user);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();
  dispatch({ type: "CHANGE_LOADING", value: false });

  const createHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = { title, content, id_user: userData.id, answered: false };
    const create = await axios.post("/api/posts/create", data, {
      headers: {
        "Content-Type": "Aplication/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (create.status !== 200) return console.log("Error" + create.status);

    setTitle("");
    setContent("");
    setIsLoading(false);
    Router.push("/");
  };

  const inputProps = {
    setTitle,
    setContent,
    title,
    createHandler,
    isLoading,
    content,
  };

  return (
    <Template titleHead="Buat Pertanyaan" user={user}>
      <CreatePost {...inputProps} feedTitle="Buat Pertanyaan" />
    </Template>
  );
}
