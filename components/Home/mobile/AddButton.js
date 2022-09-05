import { PlusIcon } from "@heroicons/react/outline";
import { Router } from "next/router";
import { useDispatch } from "react-redux";

export default function AddButton() {
  const dispatch = useDispatch();

  return (
    <button
      className="fixed bottom-4 flex w-14 h-14 bg-primary right-4 sm:hidden rounded-full shadow-lg shadow-primary/30"
      onClick={() => {
        Router.push("/posts/create");
        dispatch({ type: "CHANGE_LOADING", value: true });
      }}
    >
      <PlusIcon className="h-7 m-auto" />
    </button>
  );
}
