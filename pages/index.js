import { authPage } from "middlewares/authorizationPage";
import { useDispatch } from "react-redux";
import Home from "@components/Home";
import { useState } from "react";
import axios from "axios";
import Template from "@components/main/Template";

export async function getServerSideProps(ctx) {
  const { token, id } = await authPage(ctx);
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // user session data
  const userURL = `${process.env.URL_SERVER}/api/auth/user/${id}`;
  const user = await axios.get(userURL, options);

  // posts data
  const postsURL = process.env.URL_SERVER + "/api/posts/";
  const posts = await axios.get(postsURL, options);

  return { props: { user: user.data.data, allposts: posts.data.data, token } };
}

export default function HomePages({ user, allposts, token }) {
  const [posts, setPosts] = useState(allposts);
  const dispatch = useDispatch();
  dispatch({ type: "CHANGE_LOADING", value: false });

  const options = { headers: { Authorization: `Bearer ${token}` } };

  const deleteHandler = async (id, e) => {
    e.preventDefault();
    const ask = confirm("Apakah Anda Yakin, Ingin Menghapus Data ini?");
    if (ask) {
      const deletePost = await axios.delete(`/api/posts/delete/${id}`, options);
      const postFiltered = posts.filter((post) => post.postId !== id);
      setPosts(postFiltered);
    }
  };

  const savePost = async (id_post, e) => {
    e.preventDefault();
    const data = { id_user: user.id, id_post };
    const save = await axios.post("/api/save/create", data, options);
    alert("Pertanyaan berhasil disimpan");
  };

  return (
    <Template titleHead="UDF - Beranda" user={user}>
      <Home
        allPosts={posts}
        session={user}
        deleteHandler={deleteHandler}
        savePost={savePost}
      />
    </Template>
  );
}
