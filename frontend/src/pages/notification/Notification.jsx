import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Ring } from "@uiball/loaders";
import { useSWRConfig } from "swr";
import Moment from "react-moment";

import { markAllAsReadAPI, markAsReadAPI } from "../../config/api";
import { getNotif } from "../../config/redux/features/notifSlice";
import { InfiniteScroll } from "../../components";
import { IMG_URI } from "../../utils/dummy";
import "./notification.scss";

const Notification = () => {
   const [page, setPage] = useState(6);
   const [loadingBtn, setLoadingBtn] = useState(false);

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { mutate } = useSWRConfig();
   const { notif, counts, isLoading } = useSelector((state) => state.notif);

   useEffect(() => { document.title = "Notifikasi | ask.UST" }, []);
   useEffect(() => { dispatch(getNotif(page)) }, [dispatch, page]);

   const readHandler = async (id, link) => {
      try {
         await markAsReadAPI(id);
         navigate(link);
         mutate("notif");
      } catch (error) {
         console.log(error);
      }
   };

   const readAllHandler = async () => {
      try {
         setLoadingBtn(true);
         await markAllAsReadAPI();
         dispatch(getNotif(page));
         mutate("notif");
         setLoadingBtn(false);
      } catch (error) {
         console.log(error);
      }
   };

   const loadHandler = (e) => {
      e.preventDefault();
      setPage(page + 6);
   };

   return (
      <div className="notification">
         <div className="notifWrapper">
            <div className="pagesTitle">
               <h1>Notifikasi</h1>
               <span>
                  Disini anda bisa melihat semua notifikasi berhubungan dengan
                  topik yang terkait dengan anda.
               </span>
               <p>
                  <b>Klik notifikasinya untuk menuju ke topik.</b>
               </p>
            </div>
            {notif.length > 0 ? (
               <>
                  <button className={`allRead ${loadingBtn ? "loading" : ""}`} onClick={readAllHandler}>
                     {loadingBtn ? <Ring size={16} lineWeight={4} speed={2} color="#fff" /> : "Tandai Sudah dibaca"}
                  </button>
                  <div className="notifContent">
                     {notif.map((item) => (
                        <div
                           className={`notifCard ${item.read ? "read" : ""}`}
                           key={item._id}
                           onClick={() => readHandler(item._id, item.link)}
                        >
                           <div className="notifUserInfo">
                              <img
                                 alt=""
                                 src={
                                    item?.userSender?.profilePicture
                                       ? `${IMG_URI}/${item?.userSender?.profilePicture}`
                                       : "/profile.svg"
                                 }
                              />
                              <div className="notifDetails">
                                 <span>
                                    {item?.userSender?.name}
                                    <span className="notifDesc"> {item.message}</span>
                                 </span>
                                 <Moment className="notifDate" fromNow>
                                    {item.createdAt}
                                 </Moment>
                              </div>
                           </div>
                        </div>
                     ))}
                     {notif.length > 5 && (
                        <InfiniteScroll
                           counts={counts}
                           dataLength={notif.length}
                           isLoading={isLoading}
                           loadMoreHandler={loadHandler}
                        />
                     )}
                  </div>
               </>
            ) : (
               !isLoading ? (
                  <h4 className="noNotif">Belum ada notifikasi</h4>
               ) : (
                  <div className="loadingPage">
                     <Ring size={40} lineWeight={4} speed={2} color="#00bac7" />
                  </div>
               )
            )}
         </div>
      </div>
   );
};

export default Notification;
