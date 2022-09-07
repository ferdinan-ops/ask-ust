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
import axios from "axios";
import Head from "next/head";

function Login(props) {
  const [fields, setFields] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const options = { headers: { "Content-Type": "Aplication/json" } };

  // input handler
  const fieldHandler = (e) => {
    const { id, value } = e.target;
    setFields({ ...fields, [id]: value });
  };

  const finishLogin = (token, data) => {
    Cookies.set("token", token);
    Cookies.set("session", data);
    Router.push("/");
    dispatch({ type: "CHANGE_LOADING", value: false });
  };

  // login without google
  const loginHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: "CHANGE_LOADING", value: true });

    const login = await axios.post("/api/auth/login", fields, options);

    if (login.status !== 200) {
      dispatch({ type: "CHANGE_LOADING", value: false });
      return console.log("Error" + login.status);
    }

    const { token, data } = login.data;
    setFields({ email: "", password: "" });
    finishLogin(token, data.id);
  };

  // login with google
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
      const google = await axios.post("/api/auth/google", dataUser, options);

      if (google.status !== 200) return console.log("error" + google.status);
      const { token, data } = google.data;
      finishLogin(token, data.id);
    }
  };

  const formProps = {
    fields,
    authGoogle,
    fieldHandler,
    handleSubmit: loginHandler,
  };

  return (
    <>
      <Head>
        <title>UDF - Ayo masuk dan mulai tanyakan</title>
      </Head>
      <Layout>
        <Banner isLogin image="login" />
        <Form isLogin {...formProps} />
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
