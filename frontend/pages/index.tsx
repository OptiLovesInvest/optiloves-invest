import type { GetServerSideProps } from "next";
export const getServerSideProps: GetServerSideProps = async () => {
  return { redirect: { destination: "/thank-you", permanent: false } };
};
export default function Index(){ return null; }
