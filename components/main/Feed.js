import Posts from "@components/posts/Posts";
import Main from "./Main";
import { PlusIcon } from "@heroicons/react/outline";
import Router from "next/router";
import { useDispatch } from "react-redux";

function Feed({ allPosts, session, deleteHandler }) {
  const dispatch = useDispatch();

  return (
    <Main title="Beranda">
      <div className="pb-72 text-font">
        {allPosts.length > 0 ? (
          allPosts.map((post, index) => (
            <Posts
              key={index}
              post={post}
              sessionId={session.id}
              deleteHandler={deleteHandler}
            />
          ))
        ) : (
          <div className="mx-auto flex w-full min-h-screen justify-center items-center flex-col max-w-[70%] text-gray-700">
            <p className="font-bold text-3xl  text-center">
              Belum Ada Pertanyaan 😢
            </p>
            <span className="font-medium text-center mt-4 text-sm">
              Maaf saat ini kami masih belum memiliki list pertanyaan pada
              aplikasi kami ini. Silahkan buat pertanyaan untuk memunculkannya
              🥰.
            </span>
          </div>
        )}
      </div>

      <button
        className="fixed bottom-4 flex w-14 h-14 bg-primary right-4 sm:hidden rounded-full shadow-lg shadow-primary/30"
        onClick={() => {
          Router.push("/posts/create");
          dispatch({ type: "CHANGE_LOADING", value: true });
        }}
      >
        <PlusIcon className="h-7 m-auto" />
      </button>
    </Main>
  );
}

export default Feed;
