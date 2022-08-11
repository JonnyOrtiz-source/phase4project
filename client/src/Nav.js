function Nav({ handleCurrentUser }) {
   const logout = () => {
      fetch('/logout', {
         method: 'DELETE',
      }).then(() => {
         handleCurrentUser(null);
      });
   };

   return (
      <ul className="nav-container">
         <li className="nav-item">
            <a className="nav-link" href="/shoes">
               Home
            </a>
         </li>
         <li className="nav-item">
            <a className="nav-link" href="/shoes/new">
               Add a Shoe
            </a>
         </li>
         <li className="nav-item">
            <a className="nav-link" href="/user_shoes">
               Your Shoes
            </a>
         </li>
         <li className="nav-item">
            <button id="btn-logout" onClick={logout}>
               Logout
            </button>
         </li>
      </ul>
   );
}

export default Nav;
