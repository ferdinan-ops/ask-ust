const intialState = {
  popup: "false",
  isLogin: false,
  isLoading: false,
  message: "",
  user: {},
  notes: {},
};

const reducer = (state = intialState, action) => {
  if (action.type === "CHANGE_POPUP") {
    return {
      ...state,
      popup: action.value,
    };
  }
  if (action.type === "CHANGE_ISLOGIN") {
    return {
      ...state,
      isLogin: action.value,
    };
  }
  if (action.type === "CHANGE_USER") {
    return {
      ...state,
      user: action.value,
    };
  }
  if (action.type === "CHANGE_LOADING") {
    return {
      ...state,
      isLoading: action.value,
    };
  }
  if (action.type === "CHANGE_MSG") {
    return {
      ...state,
      message: action.value,
    };
  }
  if (action.type === "SET_NOTES") {
    return {
      ...state,
      notes: action.value,
    };
  }
  return state;
};

export default reducer;

/* Catatan!!! */
/* Jadi redux ini berguna utk membuat state yang global, bisa 
 dipakai oleh semua component, jadi setiap state akan di init 
 terlebih dahulu menggunakan "initialState" yang berisikan state-
 state global yg ingin dibuat/dikirimkan. Lalu kita dapat membuat 
 "reducer" sebagai fungsi utk menggantikan nilai state dari state 
 global yg terdapat pada "initialState" */

/* Ingat!!! */
/* 
   1. redux = useState
   2. initialState = state = value
   3. reducer = setState = fungsi mengganti value pd state
 */
