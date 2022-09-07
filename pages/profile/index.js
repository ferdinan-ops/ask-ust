import { authPage } from "middlewares/authorizationPage";
import Template from "@components/main/Template";
import axios from "axios";
import Profile from "@components/Profile";

export async function getServerSideProps(ctx) {
  const { token, id } = await authPage(ctx);
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // user session data
  const userURL = `${process.env.URL_SERVER}/api/auth/user/${id}`;
  const user = await axios.get(userURL, options);

  return { props: { user: user.data.data } };
}

export default function ProfilePages({ user }) {
  return (
    <Template titleHead={user.username} user={user}>
      <Profile user={user} />
    </Template>
  );
}
