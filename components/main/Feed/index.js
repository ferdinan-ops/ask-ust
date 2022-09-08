import LoadingFeed from "@components/loading/LoadingFeed";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

function Feed({ children, title, isLoading, isDetailPost }) {
  const [top, setTop] = useState(true);

  useEffect(() => {
    const scrollHandler = () => {
      setTop(window.pageYOffset <= 20);
    };
    window.addEventListener("scroll", scrollHandler);

    scrollHandler();

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <div
      className={`relative z-0 max-w-2xl min-h-screen flex-grow  sm:ml-[73px] xl:ml-[370px] text-font ${
        !isDetailPost && "border-l-2 border-r-2 border-[#EBEEF0]"
      } `}
    >
      <div
        className={`sticky z-[9999] top-0 bg-white flex items-center border-b-2 border-[#EBEEF0] p-3 sm:justify-between ${
          isDetailPost && "border-l-2 border-r-2"
        } ${!top && "bg-white bg-opacity-70 backdrop-blur-[5px]"}`}
      >
        <h2 className="text-lg font-bold sm:text-xl">{title}</h2>
      </div>
      {children}
      {isLoading && <LoadingFeed />}
    </div>
  );
}
const reduxState = (state) => ({ isLoading: state.isLoading });
export default connect(reduxState, null)(Feed);
