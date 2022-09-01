import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../config/redux/store";
import "prismjs/themes/prism-dracula.css";
import Prism from "prismjs";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    Prism.highlightAll();
  });
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
