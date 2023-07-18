import { toast } from 'react-toastify';
import { firestore } from '../../firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

export const likePost = async (user, isActive, index, postId, setIsActive) => {
  if (!user) {
    toast('Please Sign In to like the post', {
      position: 'top-right',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
    return;
  }

  try {
    if (isActive[index]) {
      await updateDoc(doc(firestore, 'bloging', postId), {
        likes: arrayRemove(user.uid),
      });
    } else {
      await updateDoc(doc(firestore, 'bloging', postId), {
        likes: arrayUnion(user.uid),
      });
    }

    setIsActive((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = !prevState[index];
      return updatedState;
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
