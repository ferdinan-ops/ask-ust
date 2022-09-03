import { unauthPage } from "middlewares/authorizationPage";
import Banner from "@components/auth/Banner";
import Layout from "@components/auth/Layout";
import Form from "@components/auth/Form";
import React, { useState } from "react";
import Router from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
import Head from "next/head";

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({
    username: "",
    email: "",
    password: "",
  });

  const registerHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const register = await axios.post("/api/auth/register", fields, {
      headers: { "Content-Type": "Aplication/json" },
    });

    if (register.status === 401) {
      setIsLoading(false);
      setFields({ username: "", email: "", password: "" });
      return alert(register.data.message);
    }

    const { token, data } = register.data;
    setIsLoading(false);
    setFields({ username: "", email: "", password: "" });
    Cookies.set("token", token);
    Cookies.set("session", data.id);
    Router.push("/");
  };

  const fieldHandler = (e) => {
    const { id, value } = e.target;
    setFields({ ...fields, [id]: value });
  };

  const formProps = { fieldHandler, handleSubmit: registerHandler, fields, isLoading }

  return (
    <>
      <Head><title>UDF - Ayo Segera Daftarkan Dirimu</title></Head>
      <Layout>
        <Banner image="register" />
        <Form isRegister {...formProps} />
      </Layout>
    </>
  );
}

export default Register;

export async function getServerSideProps(ctx) {
  await unauthPage(ctx);
  return { props: {} };
}
