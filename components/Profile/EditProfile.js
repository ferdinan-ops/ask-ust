import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Fragment, useState } from "react";
import ProfileImage from "./ProfileImage";

export default function EditProfile(props) {
  const { user, fieldsHandler, imageHandler, changeUser, updateUser } = props;
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        className="block ml-auto font-bold rounded-full border-2 py-2 px-4 text-sm hover:bg-gray-100"
        onClick={() => setIsOpen(true)}
      >
        Edit Profile
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[600px] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <div>
                    <div className="flex items-center p-4">
                      <div className="icon mr-4" onClick={closeModal}>
                        <XIcon className="h-6" />
                      </div>
                      <h1 className="text-xl font-semibold">Ubah Profil</h1>
                      <button
                        className="ml-auto font-semibold bg-font text-white text-sm px-4 py-2 rounded-full"
                        onClick={(e) => {
                          setIsOpen(false);
                          updateUser(e);
                        }}
                      >
                        Simpan
                      </button>
                    </div>
                    <div className="mb-20">
                      <ProfileImage
                        user={changeUser}
                        imageHandler={imageHandler}
                        changeUser={changeUser}
                        isEdit
                      />
                    </div>
                    <form className="px-6 pb-6 text-base space-y-6">
                      <label className="font-bold flex flex-col">
                        Username
                        <input
                          id="username"
                          value={changeUser.username}
                          onChange={fieldsHandler}
                          className="input-auth p-0 px-4 py-4"
                        />
                      </label>
                      <label className="font-bold flex flex-col">
                        Bio
                        <textarea
                          id="bio"
                          value={changeUser.bio}
                          onChange={fieldsHandler}
                          className="input-auth p-0 px-4 py-4"
                          placeholder="Saya adalah seorang mahasiswa"
                        ></textarea>
                      </label>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
