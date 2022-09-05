import Feed from "@components/main/Feed";
import NoPost from "./NoPost";
import AddButton from "./mobile/AddButton";
import Posts from "./Post";

export default function Home({ allPosts, session, deleteHandler }) {
  const postsProps = { sessionId: session.id, deleteHandler };

  return (
    <Feed title="Beranda">
      <div className="pb-72 text-font">
        {allPosts.length > 0 ? (
          allPosts.map((post, index) => (
            <Posts key={index} post={post} {...postsProps} />
          ))
        ) : (
          <NoPost />
        )}
      </div>

      <AddButton />
    </Feed>
  );
}
