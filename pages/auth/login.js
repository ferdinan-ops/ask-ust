import Banner from "@components/auth/Banner";
import Form from "@components/auth/Form";
import Layout from "@components/auth/Layout";
// import Loading from "@components/Loading";
import React from "react";

function Login() {
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
        description="Diskusi secara online semakin mudah – tetap berdiskusi walaupun pake kuota dari Kemendikbud hehe~"
        image="login"
      />
      <Form
        description="Anda dapat login dengan akun terdaftar Anda atau login cepat dengan akun Google Anda."
        isLogin
        handleChangeText={handleChangeText}
        handleSubmit={handleSubmit}
        data={data}
      />

      {/* <Loading /> */}
    </Layout>
  );
}

export default Login;
