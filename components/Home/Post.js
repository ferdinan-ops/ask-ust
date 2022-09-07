import Router from "next/router";
import { useDispatch } from "react-redux";
import PostReact from "./PostReact";
import ProfileHeader from "./ProfileHeader";

function Posts({ post, sessionId, deleteHandler }) {
  const { username, userImage, updated_at, postId, userId } = post;
  const dispatch = useDispatch();

  return (
    <div
      className="cursor-pointer p-3 border-b-2 border-[#EBEEF0] hover:bg-slate-50 font-medium"
      onClick={() => {
        Router.push(`/posts/${post.postId}`);
        dispatch({ type: "CHANGE_LOADING", value: true });
      }}
    >
      <ProfileHeader
        username={username}
        image={userImage}
        updated_at={updated_at}
        isUserHave={sessionId === userId}
        deleteHandler={deleteHandler}
        postId={postId}
      />

      <h1 className="my-5 text-lg text-font font-bold">{post.title}</h1>

      <PostReact answered={post.answered} />
    </div>
  );
}

export default Posts;
