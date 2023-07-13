import Link from "next/link";
export default function Home()
{
  return (
    <main>
      <div className="container divHome">
        <div className="row">
          <div className="col-6 divStyle">
            <h1
              className="d-flex flex-column justify-content-center heading1">
              Stay curious.
            </h1>
            <p className="paragraph">
              Discover stories, thinking, and expertise from writers on any topic.
            </p>

            <Link
              href="/login"
              className="animate__animated animate__backInLeft divBtn btn btn-primary rounded-pill px-0 py-2 mt-3"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
