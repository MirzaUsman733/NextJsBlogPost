import { updateDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export const handleUpdateComment = async (
  index,
  postId,
  comment,
  comments,
  setComments
) => {
  const updatedCommentText = prompt(
    'Enter the updated comment:',
    comment?.text
  );
  if (updatedCommentText === null || updatedCommentText.trim() === '') {
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

    await updateDoc(doc(firestore, 'bloging', postId), {
      comments: updatedComments,
    });
  } catch (error) {
    toast(error, {
      position: 'top-right',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  }
};
