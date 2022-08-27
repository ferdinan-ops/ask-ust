import { auth, db, provider } from "./firebase";
import { onValue, push, ref, remove, set } from "firebase/database";

// menambahkan data dengan firebase dgn module "push"
export const addDataToAPI = (data) => (dispatch) => {
  push(ref(db, "notes/" + data.userId), {
    title: data.title,
    content: data.content,
    date: data.date,
  });
};

// Mengambil data dari firebase
export const getDataFromAPI = (userId) => (dispatch) => {
  const urlNotes = ref(db, "notes/" + userId);
  return new Promise((resolve, reject) => {
    onValue(urlNotes, (snapshot) => {
      const data = [];
      Object.keys(snapshot.val()).map((key) => {
        data.push({
          id: key,
          data: snapshot.val()[key],
        });
      });
      dispatch({ type: "SET_NOTES", value: data });
      resolve(data);
    });
  });
};

// mengupdate data dengan firebase dgn module "set"
export const updateDataToAPI = (data) => (dispatch) => {
  set(ref(db, `notes/${data.userId}/${data.noteId}`), {
    title: data.title,
    content: data.content,
    date: data.date,
  })
    .then(() => true)
    .catch((err) => false);
};

// menghapus data dengan firebase dgn module "remove"
export const deleteDataFromAPI = (data) => (dispatch) => {
  remove(ref(db, `notes/${data.userId}/${data.noteId}`), {})
    .then(() => true)
    .catch((err) => false);
};

/* Catatan Function Login!!! */
/* Login function ini kita buat jadi promise agar kita bisa 
mengetahui atau mengirim pesan TRUE OR FALSE pd component login 
saat user ingin login dia melakukan kesalahan atau tidak. Serta 
sebagai logika untuk memindahkan pages dari "login" ke "Dashboard" 
jika user-nya benar dengan promise resolve(true) dan akan tetap pada 
login jika user salah dengan promise reject(false). */

/* Untuk mengisi urlNotes ini kau dapat liat di firebase mau ngambil data yg 
  bagaimana, klo disini karna aku ingin ambil data semua notes dari user yg login
  maka aku ambil urlnya=> db/notes/user_id. */

/* Fungsi utk mengatasi asyc func dgn menggunakan redux-thunk. Cara- 
nya adalah asyc func tsb buat mengirimkan func lg yg merupakan func 
dispatch, jd dia di daftarkan utk di tunggu. */
