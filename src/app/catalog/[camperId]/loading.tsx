import Loader from "@/components/Loader";

export default function Loading() {
  return (
    <main
      id="main"
      className="container"
      style={{ paddingTop: 64, paddingBottom: 64 }}
    >
      <Loader />
    </main>
  );
}
