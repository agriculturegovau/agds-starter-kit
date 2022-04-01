import Head from "next/head";

export const DocumentTitle = ({ title }: { title?: string }) => (
  <Head>
    <title>
      {[title, "Export Service"].filter(Boolean).join(" | ")}
    </title>
  </Head>
);
