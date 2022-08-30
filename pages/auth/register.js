import Banner from "@components/auth/Banner";
import Form from "@components/auth/Form";
import Layout from "@components/auth/Layout";
import Cookies from "js-cookie";
import { unauthPage } from "middlewares/authorizationPage";
import React, { useState } from "react";
import Router from "next/router";

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({
    username: "",
    email: "",
    password: "",
    image: null,
  });

  const registerHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const registerReq = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(fields),
      headers: { "Content-Type": "Aplication/json" },
    });
    const registerRes = await registerReq.json();

    if (registerReq.status === 401) {
      setIsLoading(false);
      setFields({
        username: "",
        email: "",
        password: "",
        image: null,
      });
      return alert(registerRes.message);
    }

    setIsLoading(false);
    setFields({
      username: "",
      email: "",
      password: "",
      image: null,
    });

    Cookies.set("token", registerRes.token);
    Cookies.set("session", JSON.stringify(registerRes.data.id));
    Router.push("/");
  };

  const fieldHandler = (e) => {
    const { id, value } = e.target;
    setFields({ ...fields, [id]: value });
  };

  return (
    <Layout>
      <Banner image="register" />
      <Form
        isRegister
        handleChangeText={fieldHandler}
        handleSubmit={registerHandler}
        data={fields}
        isLoading={isLoading}
      />
    </Layout>
  );
}

export default Register;

export async function getServerSideProps(ctx) {
  await unauthPage(ctx);
  return { props: {} };
}
