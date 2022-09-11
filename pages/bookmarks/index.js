import Template from "@components/main/Template";
import Markah from "@components/Markah";
import axios from "axios";
import { authPage } from "middlewares/authorizationPage";

export async function getServerSideProps(ctx) {
  const { id, token } = await authPage(ctx);
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const userURL = `${process.env.URL_SERVER}/api/auth/user/${id}`;
  const user = await axios.get(userURL, options);

  const saveURL = `${process.env.URL_SERVER}/api/save/${user.data.data.id}`;
  const save = await axios.get(saveURL, options);

  return { props: { session: user.data.data, save: save.data.data } };
}

export default function BookmarksPages({ session, save }) {
  console.log(save);
  return (
    <Template titleHead="UDF - Disimpan" user={session}>
      <Markah save={save} />
    </Template>
  );
}
