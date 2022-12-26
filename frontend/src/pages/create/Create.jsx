import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Ring } from "@uiball/loaders";

import { createTag, getAllTags } from "../../config/redux/features/tagSlice";
import { createPost, getPost, getPosts, updatePost } from "../../config/redux/features/postSlice";
import { Modal, TextEditor, Warning } from "../../components";
import { AuthContext } from "../../context/authContext";
import "./create.scss";

const Create = () => {
   const [isModalShow, setIsModalShow] = useState(false);
   const [isUpdate, setIsUpdate] = useState(false);
   const [listTags, setListTags] = useState([]);
   const [nameTag, setNameTag] = useState("");
   const [descTag, setDescTag] = useState("");
   const [keyword, setKeyword] = useState("");
   const [title, setTitle] = useState("");
   const [tags, setTags] = useState([]);
   const [desc, setDesc] = useState("");

   const { postId } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { currentUser } = useContext(AuthContext);
   const { isLoading, tags: tagsData } = useSelector((state) => state.tag);
   const { isLoading: isLoadingPost, post } = useSelector((state) => state.post);

   useEffect(() => {
      if (postId) {
         dispatch(getPost());
         setTitle(post.title);
         setTags(post.tags);
         setDesc(post.desc);
         setIsUpdate(true);
      }
   }, [postId, dispatch, post]);
   useEffect(() => { document.title = `${isUpdate ? "Ubah" : "Ayo buat"} pertanyaan 😀 | ask.UST` }, [isUpdate]);
   useEffect(() => { dispatch(getAllTags()) }, [dispatch]);

   const handleFilter = (e) => {
      setKeyword(e.target.value);
      const filteredTags = tagsData.filter((tag) => {
         return tag.name.toLowerCase().includes(e.target.value.toLowerCase());
      });
      setListTags(filteredTags);
   };

   const modalShowHandler = (e) => {
      e.preventDefault();
      setIsModalShow(true);
   };

   const createTagHandler = (e) => {
      e.preventDefault();
      if (!nameTag || !descTag) return toast.error("Nama dan deskripsi tag tidak boleh kosong");
      dispatch(createTag({ name: nameTag, desc: descTag }));
      setNameTag("");
      setDescTag("");
   };

   const addTags = (name) => {
      const isSame = tags.some((tag) => tag === name);
      if (!isSame) setTags([...tags, name]);
      setKeyword("");
   }

   const deleteTags = (id) => {
      const newTags = tags.filter((tag) => tag !== id);
      setTags(newTags);
   }

   const submitHandler = (e) => {
      e.preventDefault();
      if (!title || !desc || tags.length === 0) return toast.error("Judul, deskripsi, dan tags tidak boleh kosong");
      if (isUpdate) {
         dispatch(updatePost({ postId, title, tags, desc }));
      } else {
         dispatch(createPost({ title, tags, desc }));
      }
      setTitle("");
      setDesc("");
      setTags([]);
      dispatch(getPosts(3));
      navigate("/forum/questions");
   }

   return (
      <div className="create">
         <Modal title="Buat Tag Baru" isModalShow={isModalShow} setIsModalShow={setIsModalShow} modalSubmit={createTagHandler} isLoading={isLoading}>
            <div className="modalWrapper">
               <label>
                  <span>Nama tags</span>
                  <input placeholder="ms-word" value={nameTag} onChange={(e) => setNameTag(e.target.value)} />
               </label>
               <label>
                  <span>Deskripsi tags</span>
                  <textarea placeholder="Jelaskan sedikit mengenai tag baru ini, bisa dicari lewat google" value={descTag} onChange={(e) => setDescTag(e.target.value)} />
               </label>
            </div>
         </Modal>

         <div className="createContainer">
            <Warning name={currentUser.name} />
            <h1>{isUpdate ? "Ubah" : "Ayo buat"} pertanyaan 😀</h1>

            <form className="createForm" onSubmit={submitHandler}>
               <div className="createInput">
                  <span>Judul</span>
                  <input placeholder="e.g. Bagaimana cara untuk custom margin pada ms.word?" value={title} onChange={(e) => setTitle(e.target.value)} />
               </div>
               <div className="createInput">
                  <div className="createTags">
                     <span>Tags</span>
                     <button className="tagsButton" onClick={modalShowHandler}>
                        <PlusCircleIcon className="icons" />
                        Tags baru
                     </button>
                  </div>
                  {tags.length > 0 && (
                     <div className="allTags">
                        {tags.map((tag) => (
                           <span key={tag}>
                              # {tag} <XMarkIcon className="icons" onClick={() => deleteTags(tag)} />
                           </span>
                        ))}
                     </div>
                  )}
                  <input placeholder="e.g. ms-word (maks:4)" onChange={handleFilter} value={keyword} disabled={tags.length > 3 && true} />
                  {keyword && (
                     <ul>
                        {listTags.length > 0 ? (
                           listTags.map((tag) => (
                              <li key={tag.name} onClick={() => addTags(tag.name)}># {tag.name}</li>
                           ))
                        ) : (
                           <li>Maaf tag {keyword} belum ada, silahkan buat tag baru 😢</li>
                        )}
                     </ul>
                  )}
               </div>
               <div className="createInput">
                  <span>Deskripsi</span>
                  <TextEditor setContent={setDesc} content={desc} />
               </div>
               <button className={`createButton ${isLoadingPost ? "loading" : ""}`}>
                  {isLoadingPost ? <Ring size={16} lineWeight={8} speed={2} color="#fff" /> : isUpdate ? "Simpan" : "Kirim Pertanyaan"}
               </button>
            </form>
         </div>
      </div>
   );
};

export default Create;
