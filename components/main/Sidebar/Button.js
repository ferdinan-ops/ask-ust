import { PlusCircleIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export default function Button() {
  const router = useRouter();
  const dispatch = useDispatch();

  const makeQuestion = (e) => {
    router.push("/posts/create");
    dispatch({ type: "CHANGE_LOADING", value: true });
  };

  return (
    <button
      className="xl:ml-auto xl:h-[52px] xl:w-56 rounded-full text-primary hover:text-[#C21D28] xl:hover:text-white xl:bg-primary text-base font-bold xl:text-white shadow-md xl:hover:bg-[#C21D28] xl:inline mt-10"
      onClick={makeQuestion}
      title="Buat Pertanyaan"
    >
      <span className="hidden xl:inline">Buat Pertanyaan</span>
      <PlusCircleIcon className="h-10 m-auto block xl:hidden" />
    </button>
  );
}
