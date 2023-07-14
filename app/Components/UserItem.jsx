"use client"
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { firestore } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineLike } from "react-icons/ai";
import { MdOutlineAddComment, MdReadMore } from "react-icons/md";
import { likePost } from "../api/LikePost";
import { addComment } from "../api/CommentAdd";
import { deleteComment } from "../api/CommentDelete";
import { handleUpdateComment } from "../api/CommentUpdate";

export default function UserItem({ posts, user }) {
  const [commentValue, setCommentValue] = useState("");
  const [comments, setComments] = useState(posts ? posts.map(() => []) : []);
  const [isActive, setIsActive] = useState(posts ? posts.map(() => false) : []);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [visiblePosts, setVisiblePosts] = useState(10);
  const [selectedCommentIndex, setSelectedCommentIndex] = useState(-1);
  const [updatedCommentText, setUpdatedCommentText] = useState("");

  useEffect(() => {
    if (user) {
      const likedPosts = user.likedPosts || [];
      const updatedIsActive = posts?.map((post) => likedPosts.includes(post.id));
      setIsActive(updatedIsActive);
    }
  }, [posts, user]);

  useEffect(() => {
    if (posts?.length > 0) {
      const initialComments = posts.map((post) => post.comments || []);
      setComments(initialComments);
    }
  }, [posts]);

  const likeStyle = {
    border: "none",
    display: "block",
    backgroundColor: "rgba(250, 250, 250, 0.116)",
    marginTop: 10,
  };

  const handleButton = async (index, postId) => {
    if (!user) {
      toast("Please Sign In to like the post", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    try {
      await likePost(user, isActive, index, postId, setIsActive);
    } catch (error) {
      toast(error, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleCommentKeyDown = (event, index, postId) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddComment(index, postId);
    }
  };

  const handleAddComment = async (index, postId) => {
    await addComment(user, comments, setComments, commentValue, setCommentValue, index, postId);
  };

  const handleDeleteComment = async (index, postId, comment) => {
    await deleteComment(comments, setComments, index, postId, comment);
  };

  const handleUpdateComment = async (index, postId, comment) => {
    const updatedCommentText = prompt(
      "Enter the updated comment:",
      comment.text
    );
    if (updatedCommentText === null || updatedCommentText.trim() === "") {
      return;
    }
  
    try {
      const updatedComment = {
        ...comment,
        text: updatedCommentText,
      };
  
      const updatedComments = comments[index].map((c) =>
        c === comment ? updatedComment : c
      );
      const updatedCommentsState = [...comments];
      updatedCommentsState[index] = updatedComments;
      setComments(updatedCommentsState);
  
      await updateDoc(doc(firestore, "bloging", postId), {
        comments: updatedComments,
      });
    } catch (error) {
      toast(error, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleLoadMore = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 10);
  };

  const inputStyle = {
    backgroundColor: "rgba(167, 200, 373, 0.1)",
    width: 200,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    border: "1px solid rgba(146, 150, 173, 0.5)",
    borderRadius: 3,
    paddingTop: 5,
    paddingBottom: 5,
  };

  if (!user && !posts) {
    return null;
  }

  return (
    <>
      <div>
        <ul className="ms-0 ps-0">
          <h2 className=" mt-3">All Blogs...</h2>
          {
            posts?.slice(0, visiblePosts).map((post, index) => (
              <li
                style={{ listStyleType: "none" }}
                key={index}
                className="container mt-4 py-3 blog"
              >
                <p style={{ fontSize: 13 }}>
                  <b>Author:</b> &nbsp; <i> Mr. Muhammad Usman </i> - {post.date}{" "}
                </p>
                <img
                  src={post.url}
                  alt=""
                  width="300px"
                  className="card-image-top col-12 col-md-3 col-lg-4 pt-0 mb-2"
                />
                <div className="col-12 col-md-7 ms-2 d-inline-block">
                  <button className="btn btn-primary mb-2 px-4">{post.title}</button>
                  <h4
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    <Link
                      href={`/user/${post.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {post.message ? post.message.slice(0, 45) : ""}...
                    </Link>
                  </h4>

                  <p
                    className="edt"
                    dangerouslySetInnerHTML={{ __html: post.txt }}
                  />
                  <Link
                    href={`/user/${post.id}`}
                    className="btn btn-outline-light text-black border-1 border-black"
                  >
                    Read More <MdReadMore size={25} />
                  </Link>
                </div>
                <button style={likeStyle}>
                  <span
                    style={{
                      color: isActive && isActive[index] ? "#1877f2" : "black",
                      opacity: isActive && isActive[index] ? 100 : 0.6,
                    }}
                    onClick={() => handleButton(index, post.id)}
                  >
                    <AiOutlineLike size={25} />
                  </span>
                  <span>
                    {isActive && isActive[index]
                      ? post.likes
                        ? post.likes.length + 1
                        : 1
                      : post.likes
                      ? post.likes.length
                      : 0}
                  </span>
                </button>
                <div>
                  {comments[index]?.length > 0 &&(
                    <ul>
                      {comments[index].map((comment, commentIndex) => (
                        <li
                        className="my-2"
                        style={{ listStyleType: "square" }}
                        key={commentIndex}
                      >
                        <span>{comment.authorName}: &nbsp;</span>
                        {comment.text}
                        {comment.authorId === user.uid && (
                          <>
                            <button
                              style={{
                                paddingTop: 2,
                                paddingBottom: 2,
                                paddingLeft: 8,
                                paddingRight: 8,
                              }}
                              className="btn btn-success mx-2"
                              onClick={() =>
                                handleUpdateComment(index, post.id, comment)
                              }
                            >
                              <AiOutlineEdit />
                            </button>
                            <button
                              style={{
                                paddingTop: 2,
                                paddingBottom: 2,
                                paddingLeft: 8,
                                paddingRight: 8,
                              }}
                              className="btn btn-danger"
                              onClick={() =>
                                handleDeleteComment(index, post.id, comment)
                              }
                            >
                              <AiOutlineDelete />
                            </button>
                          </>
                        )}
                      </li>
                      ))}
                    </ul>
                  )}

                  <input
                    className="rounded"
                    type="text"
                    onKeyDown={(e) => handleCommentKeyDown(e, index, post.id)}
                    value={focusedIndex === index ? commentValue : ""}
                    onChange={(e) => setCommentValue(e.target.value)}
                    name="commentRef"
                    placeholder="Write Some Comment"
                    required
                    style={inputStyle}
                    onFocus={() => setFocusedIndex(index)}
                  />
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleAddComment(index, post.id)}
                  >
                    Add Comment <MdOutlineAddComment size={20} />
                  </button>
                </div>
              </li>
            ))}
        </ul>
        <div className="text-center">
          {visiblePosts < posts?.length && (
            <button className="btn btn-primary" onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </div>
      </div>
    </>
  );
}
