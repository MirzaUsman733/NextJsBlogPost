import { Suspense } from "react";
import Loading from "./loading";

export default function adminLayout({ children }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>
}