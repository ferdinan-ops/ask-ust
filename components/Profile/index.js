import Feed from "@components/main/Feed";

export default function Profile({ user }) {
  const tag = user.username.split(" ").join("").toLocaleLowerCase();

  return (
    <Feed title={user.username}>
      <div className="relative">
        <img
          src="/banner.jpg"
          alt=""
          className="w-full h-[200px] object-cover"
        />
        <img
          src={user.image !== null ? user.image : "/profile.jpg"}
          alt=""
          className="w-[134px] h-[134px] rounded-full border-4 -bottom-[67px] left-6 border-white  absolute"
        />
      </div>

      <div className="pt-3 pb-6 px-4 border-b-2">
        <div className="flex pb-10">
          <button className="ml-auto font-bold rounded-full border-2 py-2 px-4 text-sm hover:bg-gray-100">
            Edit Profile
          </button>
        </div>
        <div>
          <h1 className="font-bold text-xl">{user.username}</h1>
          <p className="text-gray-500 font-medium -mt-1">@{tag}</p>
          <p className="mt-3 text-[15px] font-medium">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio quos
            laboriosam et aliquid rem eos nobis magnam minus molestiae, eius
            voluptatibus dolore sunt id quae! Mollitia delectus in cum dolorem!
          </p>
        </div>

        <div className="flex font-semibold gap-4 mt-4 text-[15px]">
          <p>
            0 <span className="text-gray-500">Poin</span>
          </p>
          <p>
            0 <span className="text-gray-500">Pertanyaan</span>
          </p>
        </div>
      </div>
    </Feed>
  );
}
