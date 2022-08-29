import { SparklesIcon } from "@heroicons/react/outline";

function Feed() {
  return (
    <div className="max-w-2xl flex-grow border-l border-[#EBEEF0] text-white sm:ml-[73px] xl:ml-[370px]">
      <div className="sticky flex items-center border-b border-[#EBEEF0] py-2 px-3 text-black sm:justify-between">
        <h2 className="text-lg font-bold sm:text-xl">Home</h2>
        <div className="ml-auto flex h-9 w-9 items-center justify-center xl:px-0">
          <SparklesIcon className="h-5 text-black" />
        </div>
      </div>

      {/* <Input /> */}

      <div className="pb-72">
        {/* {posts.map((post) => (
       <Post key={post.id} id={post.id} post={post.data()} />
     ))} */}
      </div>
    </div>
  );
}

export default Feed;
