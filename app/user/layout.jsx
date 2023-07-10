import { Suspense } from "react";
import Loading from "./loading";
import ErrorBoundary from "../Components/ErrorBoundary";
export default function adminLayout({ children }) {
  return(
    <ErrorBoundary fallback={<Error/>}>

   <Suspense fallback={<Loading />}>
    {children}
    </Suspense>
    </ErrorBoundary>
  )
}