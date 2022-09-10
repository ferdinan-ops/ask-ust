import Template from "@components/main/Template";
import Markah from "@components/Markah";
import axios from "axios";
import { authPage } from "middlewares/authorizationPage";

export async function getServerSideProps(ctx) {
  const { id, token } = await authPage(ctx);
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const userURL = `${process.env.URL_SERVER}/api/auth/user/${id}`;
  const user = await axios.get(userURL, options);

  return { props: { session: user.data.data } };
}

export default function BookmarksPages({ session }) {
  return (
    <Template titleHead="UDF - Disimpan" user={session}>
      <Markah />
    </Template>
  );
}
