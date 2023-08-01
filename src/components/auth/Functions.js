// export const getUser = (dispatch)=>{
//     onAuthStateChanged(auth, (user) => {
//         if (user) {
//           console.log(user);
//           const displayUsername = user.displayName.charAt(0).toLocaleUpperCase();
//           setDisplay(displayUsername);
  
//           dispatch(
//             login(user)
//           )
//           dispatch(user_name({
//             username: displayUsername
//           }))
//         } else {
//           dispatch(logout());
//         }
//       });
// // }