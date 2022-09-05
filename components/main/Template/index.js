import Head from "next/head";
import Sidebar from "../Sidebar";
import Widget from "../Widget";

export default function Template({ user, children, titleHead }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-[1500px]">
      <Head>
        <title>{titleHead}</title>
      </Head>
      <Sidebar session={user} />
      {children}
      <Widget />
    </main>
  );
}
