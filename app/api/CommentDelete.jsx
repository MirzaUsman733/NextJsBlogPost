import { toast } from "react-toastify";
import { firestore } from "../../firebase";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";

export const deleteComment = async (comments, setComments, index, postId, comment) => {
  try {
    const updatedComments = comments[index].filter((c) => c !== comment);
    const updatedCommentsState = [...comments];
    updatedCommentsState[index] = updatedComments;
    setComments(updatedCommentsState);

    await updateDoc(doc(firestore, "bloging", postId), {
      comments: arrayRemove(comment),
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
