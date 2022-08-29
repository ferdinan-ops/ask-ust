import Feed from "@components/main/Feed";
import Sidebar from "@components/main/Sidebar";
import { authPage } from "middlewares/authorizationPage";

export async function getServerSideProps(ctx) {
  const { token, id } = await authPage(ctx);

  const userReq = await fetch(`${process.env.URL_SERVER}/api/auth/user/${id}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  const user = await userReq.json();

  return { props: { user: user.data } };
}

export default function Home({ user }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-[1500px]">
      <Sidebar session={user} />
      <Feed />
    </main>
  );
}
