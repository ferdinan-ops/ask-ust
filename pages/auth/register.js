import Banner from "@components/auth/Banner";
import Form from "@components/auth/Form";
import Layout from "@components/auth/Layout";
import { unauthPage } from "middlewares/authorizationPage";
import React, { useState } from "react";

export async function getServerSideProps(req, res) {
  await unauthPage(ctx);
  return { props: {} };
}

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

    if (!registerReq.ok) {
      setIsLoading(false);
      return console.log("Error" + registerReq.status);
    }

    const registerRes = await registerReq.json();
    setIsLoading(false);
    setFields({
      username: "",
      email: "",
      password: "",
      image: null,
    });
  };

  const fieldHandler = (e) => {
    const { id, value } = e.target;
    setFields({ ...fields, [id]: value });
  };

  return (
    <Layout>
      <Banner
        description="Ayo mendaftar dan rajin berdiskusi di sini supaya masalah Anda cepat terselesaikan biar gak stress mulu~"
        image="register"
      />
      <Form
        description="Masukkan detail data Anda di bawah."
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
