import Posts from "@components/Home/Post";

export default function ProfilePost({ allPosts, user, deleteHandler }) {
  return (
    <div>
      <h1 className="p-4 text-xl font-semibold">
        {allPosts.length > 0 ? "Semua Pertanyaan" : "Belum Ada Pertanyaan"}
      </h1>
      {allPosts.map((post, index) => (
        <Posts
          key={index}
          post={post}
          sessionId={user.id}
          deleteHandler={deleteHandler}
        />
      ))}
    </div>
  );
}
