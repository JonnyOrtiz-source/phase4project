import { Link } from 'react-router-dom';
// import { useState } from 'react';

function ShoeListItem({
   currentUser,
   shoe,
   deleteShoe,
   shoe_types,
   userShoes,
   handleCurrentShoeId,
}) {
   // const [owned, setOwned] = useState(false);

   const { id, shoe_name, brand, sex, image_url, shoe_type_id } = shoe;

   // userShoes.forEach((userShoeObj) => {
   //    if (
   //       userShoeObj.shoe_id === id &&
   //       userShoeObj.user_id === currentUser.id
   //    ) {
   //       setOwned(true);
   //    }
   // });

   const shoe_type = shoe_types.find(
      (shoe_type) => shoe_type.id === shoe_type_id
   );

   const handleDelete = () => {
      fetch(`/shoes/${id}`, {
         method: 'DELETE',
      });
      deleteShoe(shoe);
   };

   return (
      <div className="card" key={id}>
         <figure>
            <img
               src={
                  image_url ||
                  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'
               }
               alt={shoe_name}
            />

            <div className="shoe-details">
               <Link to={`/shoes/${id}`}>
                  <p>Shoe Name: {shoe_name}</p>
               </Link>
               <p>Brand: {brand}</p>
               <p>Sex: {sex}</p>
               {shoe_type && <p>Shoe type: {shoe_type.shoe_type_name}</p>}
            </div>
         </figure>

         <div className="shoe-actions">
            {/* {!owned && ( */}
            <Link
               to={`/user_shoes/new`}
               onClick={() => handleCurrentShoeId(id)}
            >
               ✅
            </Link>
            {/* )} */}
            &nbsp; &nbsp;
            <Link to={`/shoes/${id}/edit`}>✍🏼</Link>
            &nbsp; &nbsp;
            <button onClick={() => handleDelete(id)}>❌</button>
         </div>
      </div>
   );
}
export default ShoeListItem;
