export default function SecondItem({ posts }) {
  return (
    <>
      <div className="mt-5">
        <ul className="ps-0">
          <h2 className="">Recently added...</h2>
          {posts.map((post, index) => (
            <li
              style={{ listStyleType: "none" }}
              key={index}
              className="container col-12 py-3 mt-4 py-1 blog"
            >
              <img
                src={post.url}
                alt=""
                width="100px"
                className="col-12 col-lg-4"
              />
              <div className="col-12 col-lg-7 d-inline-block mt-3 ms-1">
                <h5>{post.title}</h5>
                <h6
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                  }}
                >
                  {post.message}
                </h6>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
