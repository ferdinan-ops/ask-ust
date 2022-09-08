export default function ProfileImage({ user }) {
  return (
    <div className="relative bg-gray-400">
      <div className="h-[200px]">
        {user.banner && (
          <img
            src={user.banner}
            alt=""
            className="w-full h-[200px] object-cover"
          />
        )}
      </div>
      <img
        src={user.image ? user.image : "/profile.jpg"}
        alt=""
        className="w-[134px] h-[134px] rounded-full border-4 -bottom-[67px] left-6 border-white  absolute"
      />
    </div>
  );
}
