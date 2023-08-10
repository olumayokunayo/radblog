import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  deleteDoc,
} from "firebase/firestore";

// function to add a liked post to firestore

const addLikedPost = async (userId, postId) => {
  try {
    await addDoc(collection(db, "likedPosts"), {
      userId: userId,
      postId: postId,
      createdAt: new Date(),
    });
  } catch (error) {
    console.log(error.message);
  }
};

// function to add a bookmarked post to firestore

const addBookmarkedPost = async (userId, postId) => {
  try {
    await addDoc(collection(db, "bookmarkedPosts"), {
      userId: userId,
      postId: postId,
      createdAt: new Date(),
    });
  } catch (error) {
    console.log(error.message);
  }
};

// function to get liked posts from firestore

const getLikedPosts = async (userId) => {
  const likedPostsRef = collection(db, "likedPosts");
  const q = query(likedPostsRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const likedPosts = [];
  querySnapshot.forEach((doc) => likedPosts.push(doc.data().postId));
  return likedPosts;
};

// function to get bookmarked posts from firestore

const getBookmarkedPosts = async (userId) => {
  const bookmarkedPostsRef = collection(db, "bookmarkedPosts");
  const q = query(bookmarkedPostsRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const bookmarkedPosts = [];
  querySnapshot.forEach((doc) => bookmarkedPosts.push(doc.data().postId));
  return bookmarkedPosts;
};

// function to remove liked post
const removeLikedPost = async (userId, postId) => {
  const likedPostsRef = collection(db, "likedPosts");
  const q = query(
    likedPostsRef,
    where("userId", "==", userId),
    where("postId", "==", postId)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => deleteDoc(doc.ref));
};

// function to removed bookmarked post

const removedBookmarkedPost = async (userId, postId) => {
  const bookmarkedPostsRef = collection(db, "bookmarkedPosts");
  const q = query(
    bookmarkedPostsRef,
    where("userId", "==", userId),
    where("postId", "==", postId)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => deleteDoc(doc.ref));
};
export {
  addLikedPost,
  addBookmarkedPost,
  getLikedPosts,
  getBookmarkedPosts,
  removeLikedPost,
  removedBookmarkedPost,
};
