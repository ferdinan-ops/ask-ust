import Banner from "@components/auth/Banner";
import Form from "@components/auth/Form";
import Layout from "@components/auth/Layout";
// import Loading from "@components/Loading";
import React, { useState } from "react";

function Register() {
  const [data, setData] = useState({ email: "", password: "" });

  const handleChangeText = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        handleChangeText={handleChangeText}
        handleSubmit={handleSubmit}
        data={data}
      />
      {/* {isLoading && <Loading />} */}
    </Layout>
  );
}

export default Register;
