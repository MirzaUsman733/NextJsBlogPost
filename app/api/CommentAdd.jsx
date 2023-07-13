import { toast } from "react-toastify";
import { firestore } from "../../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

export const addComment = async (
  user,
  comments,
  setComments,
  commentValue,
  setCommentValue,
  index,
  postId
) =>
{
  const comment = commentValue.trim();
  if (!comment)
  {
    toast("Please Write the comment in the comment box", {
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

  try
  {
    const newComment = {
      authorId: user.uid,
      authorName: user.displayName,
      text: comment,
    };

    const updatedComments = [...comments[index], newComment];
    const updatedCommentsState = [...comments];
    updatedCommentsState[index] = updatedComments;
    setComments(updatedCommentsState);

    await updateDoc(doc(firestore, "bloging", postId), {
      comments: arrayUnion(newComment),
    });
    toast("Congrats, You enter the comment", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setCommentValue("");
  } catch (error)
  {
    console.error("Error adding comment:", error);
  }
};
