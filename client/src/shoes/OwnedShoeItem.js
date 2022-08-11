import { Link } from 'react-router-dom';

function OwnedShoeItem({ userShoe, deleteUserShoe }) {
   const {
      id,
      shoe_name,
      brand,
      sex,
      image_url,
      shoe_type_name,
      purchase_date,
      color,
      size,
   } = userShoe;

   const handleDelete = () => {
      fetch(`/user_shoes/${id}`, {
         method: 'DELETE',
      });
      deleteUserShoe(userShoe);
   };

   return (
      <div>
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
                  <p>Shoe Type: {shoe_type_name}</p>
                  <p>Purchase Date: {purchase_date}</p>
                  <p>Color: {color}</p>
                  <p>Size: {size}</p>
               </div>
            </figure>

            <div className="shoe-actions">
               <Link to={`/shoes/${id}/edit`}>✍🏼</Link>
               &nbsp; &nbsp;
               <button onClick={() => handleDelete(id)}>❌</button>
            </div>
         </div>
      </div>
   );
}

export default OwnedShoeItem;
