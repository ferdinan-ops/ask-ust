import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { authPage } from "middlewares/authorizationPage";
import { storage } from "config/firebase/firebase";
import Template from "@components/main/Template";
import { useState, useEffect } from "react";
import Profile from "@components/Profile";
import { useDispatch } from "react-redux";
import axios from "axios";

export async function getServerSideProps(ctx) {
  const { token, id } = await authPage(ctx);
  const { id: id_user } = ctx.query;
  const options = { headers: { Authorization: `Bearer ${token}` } };

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
  const [sessionData, setSessionData] = useState(session);

  useEffect(() => setPosts(allPosts), [allPosts]);

  const dispatch = useDispatch();

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
    await uploadString(imageRef, changeUser.image, "data_url");
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  };

  const bannerUpload = async () => {
    const bannerRef = ref(storage, `users/${changeUser.id}/banner`);
    await uploadString(bannerRef, changeUser.banner, "data_url");
    const downloadURL = await getDownloadURL(bannerRef);
    return downloadURL;
  };

  const updateUser = async (e) => {
    e.preventDefault();
    dispatch({ type: "CHANGE_LOADING", value: true });

    let data = { ...changeUser };

    if (changeUser.image !== dataUser.image) {
      const image = await imageUpload();
      setChangeUser({ ...changeUser, image });
      data = { ...data, image };
    }
    if (changeUser.banner !== dataUser.banner) {
      const banner = await bannerUpload();
      setChangeUser({ ...changeUser, banner });
      data = { ...data, banner };
    }

    const updateURL = `/api/profile/${sessionData.id}`;
    const update = await axios.put(updateURL, data, options);

    if (update.status !== 200) return console.log("Error" + update.status);

    dispatch({ type: "CHANGE_LOADING", value: false });
    setDataUser(changeUser);
    setSessionData(changeUser);
  };

  const textHandler = (e) => {
    const { id, value } = e.target;
    setChangeUser({ ...changeUser, [id]: value });
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

  const detailProps = { changeUser, textHandler, imageHandler, updateUser };
  const postProps = { allPosts: posts, user: dataUser, deleteHandler };

  return (
    <Template titleHead={user.username} user={sessionData}>
      <Profile
        user={dataUser}
        postProps={postProps}
        detailProps={detailProps}
        sessionId={session.id}
      />
    </Template>
  );
}
