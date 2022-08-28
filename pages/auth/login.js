import Banner from "@components/auth/Banner";
import Form from "@components/auth/Form";
import Layout from "@components/auth/Layout";
import Cookies from "js-cookie";
import { unauthPage } from "middlewares/authorizationPage";
import Router from "next/router";
import { useState } from "react";

export async function getServerSideProps(ctx) {
  await unauthPage(ctx);
  return { props: {} };
}

function Login() {
  const [fields, setFields] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const fieldHandler = (e) => {
    const { id, value } = e.target;
    setFields({ ...fields, [id]: value });
    console.log(fields);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const loginReq = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(fields),
      headers: { "Content-Type": "Aplication/json" },
    });

    if (!loginReq.ok) {
      setIsLoading(false);
      return console.log("Error" + loginReq.status);
    }

    const loginRes = await loginReq.json();
    setIsLoading(false);
    setFields({ email: "", password: "" });

    Cookies.set("token", loginRes.token);
    Router.push("/");
  };

  return (
    <Layout>
      <Banner
        description="Diskusi secara online semakin mudah – tetap berdiskusi walaupun pake kuota dari Kemendikbud hehe~"
        image="login"
      />
      <Form
        description="Anda dapat login dengan akun terdaftar Anda atau login cepat dengan akun Google Anda."
        isLogin
        handleChangeText={fieldHandler}
        handleSubmit={loginHandler}
        data={fields}
        isLoading={isLoading}
      />
    </Layout>
  );
}

export default Login;
