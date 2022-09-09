import { authPage } from "middlewares/authorizationPage";
import Template from "@components/main/Template";
import Profile from "@components/Profile";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "config/firebase/firebase";

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
  const [dataUser, setDataUser] = useState(user);
  const [changeUser, setChangeUser] = useState(user);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionData, setSessionData] = useState(session);
  const [banner, setBanner] = useState(null);

  useEffect(() => setPosts(allPosts), [allPosts]);

  const options = {
    headers: {
      "Content-Type": "Aplication/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const deleteHandler = async (id, e) => {
    e.preventDefault();
    const ask = confirm("Apakah Anda Yakin, Ingin Menghapus Data ini?");
    if (ask) {
      const deletePost = await axios.delete(`/api/posts/delete/${id}`, options);
      const postFiltered = posts.filter((post) => post.postId !== id);
      setPosts(postFiltered);
    }
  };

  const imageUpload = async () => {
    const imageRef = ref(storage, `users/${changeUser.id}/image`);

    if (changeUser.image) {
      await uploadString(imageRef, changeUser.image, "data_url");
      const downloadURL = await getDownloadURL(imageRef);
      return downloadURL;
    }
  };

  const bannerUpload = async () => {
    const bannerRef = ref(storage, `users/${changeUser.id}/banner`);

    if (changeUser.banner) {
      await uploadString(bannerRef, changeUser.banner, "data_url");
      const downloadURL = await getDownloadURL(bannerRef);
      return downloadURL;
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const image = await imageUpload();
    const banner = await bannerUpload();
    setChangeUser({ ...changeUser, image, banner });
    const data = { ...changeUser, image, banner };

    const updateURL = `/api/profile/${sessionData.id}`;
    const update = await axios.put(updateURL, data, options);

    if (update.status !== 200) return console.log("Error" + update.status);

    setIsLoading(false);
    setDataUser(changeUser);
    setSessionData(changeUser);
  };

  const textHandler = (e) => {
    const { id, value } = e.target;
    setChangeUser({ ...changeUser, [id]: e.target.value });
  };

  const imageHandler = (e) => {
    const { id } = e.target;
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setChangeUser({ ...changeUser, [id]: readerEvent.target.result });
    };
  };

  console.log(changeUser);

  return (
    <Template titleHead={user.username} user={sessionData}>
      <Profile
        user={dataUser}
        allPosts={posts}
        userSessionId={session.id}
        deleteHandler={deleteHandler}
        fieldsHandler={textHandler}
        imageHandler={imageHandler}
        changeUser={changeUser}
        updateUser={updateUser}
      />
    </Template>
  );
}
