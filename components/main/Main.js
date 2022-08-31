import LoadingFeed from "@components/loading/LoadingFeed";
import { connect } from "react-redux";

function Main({ children, title, isLoading }) {
  return (
    <div className="relative max-w-2xl min-h-screen flex-grow border-l-2 border-r-2 border-[#EBEEF0] text-white sm:ml-[73px] xl:ml-[370px]">
      <div className="sticky z-50 top-0 bg-white flex items-center border-b-2 border-[#EBEEF0] p-3 text-font sm:justify-between">
        <h2 className="text-lg font-bold sm:text-xl">{title}</h2>
      </div>
      {children}
      {isLoading && <LoadingFeed />}
    </div>
  );
}
const reduxState = (state) => ({ isLoading: state.isLoading });
export default connect(reduxState, null)(Main);
