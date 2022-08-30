import Sidebar from "@components/main/Sidebar";
import Widget from "@components/main/Widget";
import { authPage } from "middlewares/authorizationPage";
import { useState } from "react";
import axios from "axios";
import Main from "@components/main/Main";
import Input from "@components/create/Input";

export async function getServerSideProps(ctx) {
  const { token, id } = await authPage(ctx);

  // user session data
  const userURL = `${process.env.URL_SERVER}/api/auth/user/${id}`;
  const user = await axios.get(userURL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return { props: { user: user.data.data } };
}

export default function Create({ user }) {
  const [userData, setUserData] = useState(user);

  return (
    <main className="mx-auto flex min-h-screen max-w-[1500px]">
      <Sidebar session={userData} />
      <Main title="Buat Pertanyaan">
        <Input />
      </Main>
      <Widget />
    </main>
  );
}
