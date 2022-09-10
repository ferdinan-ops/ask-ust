import Feed from "@components/main/Feed";
import ProfileDetail from "./ProfileDetail";
import ProfileImage from "./ProfileImage";
import ProfilePost from "./ProfilePost";

export default function Profile({ user, sessionId, detailProps, postProps }) {
  const questions = postProps.allPosts.length;

  return (
    <Feed title={user.username}>
      <ProfileImage user={user} />
      <ProfileDetail
        user={user}
        questions={questions}
        isUserHave={sessionId === user.id}
        {...detailProps}
      />
      <ProfilePost {...postProps} />
    </Feed>
  );
}
