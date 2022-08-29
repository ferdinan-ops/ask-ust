import { loginUserGoogle } from "config/redux/actions/auth";
import { unauthPage } from "middlewares/authorizationPage";
import Loading from "@components/loading/Loading";
import Banner from "@components/auth/Banner";
import Layout from "@components/auth/Layout";
import { useDispatch } from "react-redux";
import Form from "@components/auth/Form";
import { connect } from "react-redux";
import { useState } from "react";
import Router from "next/router";
import Cookies from "js-cookie";

function Login(props) {
  const [fields, setFields] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

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
    Cookies.set("session", JSON.stringify(loginRes.data.id));
    Router.push("/");
  };

  const authGoogle = async (e) => {
    const response = await props.loginGoogle();
    if (response) {
      const dataUser = {
        username: response.username,
        email: response.email,
        password: null,
        image: response.image,
      };

      dispatch({ type: "CHANGE_LOADING", value: true });
      const googleReq = await fetch("/api/auth/google", {
        method: "POST",
        body: JSON.stringify(dataUser),
        headers: { "Content-Type": "Aplication/json" },
      });

      if (!googleReq.ok) return console.log("error => " + googleReq.status);
      const googleRes = await googleReq.json();

      Cookies.set("token", googleRes.token);
      Cookies.set("session", JSON.stringify(googleRes.data.id));
      Router.push("/");
    }
  };

  return (
    <>
      <Layout>
        <Banner isLogin image="login" />
        <Form
          isLogin
          handleChangeText={fieldHandler}
          handleSubmit={loginHandler}
          data={fields}
          authGoogle={authGoogle}
        />
      </Layout>
      {props.isLoading && <Loading />}
    </>
  );
}

const reduxState = (state) => ({ isLoading: state.isLoading });

const reduxDispatch = (dispatch) => ({
  loginGoogle: () => dispatch(loginUserGoogle()),
});

export default connect(reduxState, reduxDispatch)(Login);

export async function getServerSideProps(ctx) {
  await unauthPage(ctx);
  return { props: {} };
}
