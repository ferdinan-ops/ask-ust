import { authPage } from "middlewares/authorizationPage";
import Template from "@components/main/Template";
import Profile from "@components/Profile";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export async function getServerSideProps(ctx) {
  const { token, id } = await authPage(ctx);
  const { id: id_user } = ctx.query;
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // session session data
  const sessionURL = `${process.env.URL_SERVER}/api/auth/user/${id}`;
  const session = await axios.get(sessionURL, options);

  const postURL = `${process.env.URL_SERVER}/api/posts/session/${id_user}`;
  const posts = await axios.get(postURL, options);

  return {
    props: {
      session: session.data.data,
      allPosts: posts.data.dataPost,
      user: posts.data.dataUser,
      token,
    },
  };
}

export default function ProfilePages({ session, allPosts, token, user }) {
  const [posts, setPosts] = useState(allPosts);
  useEffect(() => setPosts(allPosts), [allPosts]);

  const deleteHandler = async (id, e) => {
    e.preventDefault();
    const ask = confirm("Apakah Anda Yakin, Ingin Menghapus Data ini?");
    if (ask) {
      const deletePost = await axios.delete(`/api/posts/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const postFiltered = posts.filter((post) => post.postId !== id);
      setPosts(postFiltered);
    }
  };

  return (
    <Template titleHead={user.username} user={session}>
      <Profile
        user={user}
        allPosts={posts}
        deleteHandler={deleteHandler}
        userSessionId={session.id}
      />
    </Template>
  );
}
