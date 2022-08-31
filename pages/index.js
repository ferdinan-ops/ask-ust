import Feed from "@components/main/Feed";
import Sidebar from "@components/main/Sidebar";
import Widget from "@components/main/Widget";
import { authPage } from "middlewares/authorizationPage";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

export async function getServerSideProps(ctx) {
  const { token, id } = await authPage(ctx);

  // user session data
  const userURL = `${process.env.URL_SERVER}/api/auth/user/${id}`;
  const user = await axios.get(userURL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  // posts data
  const posts = await axios.get(process.env.URL_SERVER + "/api/posts/", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return { props: { user: user.data.data, allposts: posts.data.data } };
}

export default function Home({ user, allposts }) {
  const [userData, setUserData] = useState(user);
  const [posts, setPosts] = useState(allposts);
  const dispatch = useDispatch();
  dispatch({ type: "CHANGE_LOADING", value: false });

  return (
    <main className="mx-auto flex min-h-screen max-w-[1500px]">
      <Sidebar session={userData} />
      <Feed allPosts={posts} />
      <Widget />
    </main>
  );
}
