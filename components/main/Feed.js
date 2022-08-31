import Posts from "@components/posts/Posts";
import Main from "./Main";
import { useState } from "react";

function Feed({ allPosts }) {
  const [posts, setPosts] = useState(allPosts);

  return (
    <Main title="Beranda">
      <div className="pb-72 text-font">
        {posts.map((post, index) => (
          <Posts
            key={index}
            title={post.title}
            username={post.username}
            image={post.userImage}
            timestamp={post.updated_at}
            answered={post.answered}
          />
        ))}
      </div>
    </Main>
  );
}

export default Feed;
