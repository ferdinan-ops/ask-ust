import Feed from "@components/main/Feed";
import Sidebar from "@components/main/Sidebar";
import Widget from "@components/main/Widget";
import { authPage } from "middlewares/authorizationPage";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

export async function getServerSideProps(ctx) {
  const { token, id } = await authPage(ctx);
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // user session data
  const userURL = `${process.env.URL_SERVER}/api/auth/user/${id}`;
  const user = await axios.get(userURL, options);

  // posts data
  const posts = await axios.get(
    process.env.URL_SERVER + "/api/posts/",
    options
  );

  return { props: { user: user.data.data, allposts: posts.data.data, token } };
}

export default function Home({ user, allposts, token }) {
  const [userData, setUserData] = useState(user);
  const [posts, setPosts] = useState(allposts);
  const dispatch = useDispatch();
  dispatch({ type: "CHANGE_LOADING", value: false });

  const deleteHandler = async (id, e) => {
    e.preventDefault();
    const ask = confirm("Apakah Anda Yakin, Ingin Menghapus Data ini?");
    if (ask) {
      const deletePost = await axios.delete(`/api/posts/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const postFiltered = posts.filter((post) => post.postId !== id);
      setPosts(postFiltered);
      console.log(postFiltered);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-[1500px]">
      <Sidebar session={userData} />
      <Feed allPosts={posts} session={userData} deleteHandler={deleteHandler} />
      <Widget />
    </main>
  );
}
