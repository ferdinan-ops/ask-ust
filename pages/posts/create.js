import Sidebar from "@components/main/Sidebar";
import Widget from "@components/main/Widget";
import { authPage } from "middlewares/authorizationPage";
import { useState } from "react";
import axios from "axios";
import Main from "@components/main/Main";
import Input from "@components/create/Input";
import { useDispatch } from "react-redux";
import Router from "next/router";

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
  const [userData, setUserData] = useState(user);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  dispatch({ type: "CHANGE_LOADING", value: false });

  console.log(content);

  const createHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = { title, content, id_user: userData.id, answered: false };
    const create = await axios.post("/api/posts/create", data, {
      headers: {
        "Content-Type": "Aplication/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (create.status !== 200) return console.log("Error" + create.status);

    console.log("Berhasil");
    setLoading(false);
    Router.push("/");
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-[1500px]">
      <Sidebar session={userData} />
      <Main title="Buat Pertanyaan">
        <Input
          setTitle={setTitle}
          setContent={setContent}
          title={title}
          createHandler={createHandler}
          isLoading={loading}
        />
      </Main>
      <Widget />
    </main>
  );
}
