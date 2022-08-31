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

function Login(props) {
  const [fields, setFields] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  // input handler
  const fieldHandler = (e) => {
    const { id, value } = e.target;
    setFields({ ...fields, [id]: value });
  };

  // login without google
  const loginHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: "CHANGE_LOADING", value: true });

    const login = await axios.post("/api/auth/login", fields, {
      headers: { "Content-Type": "Aplication/json" },
    });

    if (login.status !== 200) {
      dispatch({ type: "CHANGE_LOADING", value: false });
      return console.log("Error" + login.status);
    }

    const { token, data } = login.data;
    setFields({ email: "", password: "" });
    Cookies.set("token", token);
    Cookies.set("session", data.id);
    Router.push("/");
    dispatch({ type: "CHANGE_LOADING", value: false });
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
      const google = await axios.post("/api/auth/google", dataUser, {
        headers: { "Content-Type": "Aplication/json" },
      });

      if (google.status !== 200) console.log("error" + google.status);
      const { token, data } = google.data;
      Cookies.set("token", token);
      Cookies.set("session", data.id);
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
