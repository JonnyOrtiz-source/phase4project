import { useState, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { useHistory } from 'react-router-dom';

function NewUserShoeForm({
   currentShoeId,
   currentUser,
   shoe_types,
   handleAddUserShoe,
}) {
   const [currentShoe, setCurrentShoe] = useState('');

   const history = useHistory();

   useEffect(() => {
      fetch(`/shoes/${currentShoeId}`)
         .then((r) => r.json())
         .then((shoe) => setCurrentShoe(shoe));
   }, [currentShoeId]);

   const initialData = {
      purchase_date: '',
      color: '',
      size: '',
   };

   const { formData, handleChange } = useForm(initialData);

   const currentShoeTypeName = !shoe_types.find(
      (shoe_type) => currentShoe.shoe_type_id === shoe_type.id
   )
      ? 'tbd'
      : shoe_types.find(
           (shoe_type) => currentShoe.shoe_type_id === shoe_type.id
        ).shoe_type_name;

   const handleSubmit = async (e) => {
      e.preventDefault();

      const configObj = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
         },
         body: JSON.stringify({
            ...formData,
            user_id: currentUser.id,
            shoe_id: currentShoe.id,
         }),
      };

      fetch(`/user_shoes`, configObj)
         .then((r) => r.json())
         .then((newUserShoe) => {
            handleAddUserShoe(newUserShoe);
            history.push(`/shoes`);
         });
   };

   return (
      <div>
         <h2>Own Shoe</h2>
         <figure>
            <img src={currentShoe.image_url} alt={currentShoe.shoe_name} />
         </figure>
         <div className="shoe-details">
            <p>Shoe Name: {currentShoe.shoe_name}</p>
            <p>Brand: {currentShoe.brand}</p>
            <p>Sex: {currentShoe.sex}</p>
            <p>Shoe Type: {currentShoeTypeName}</p>
         </div>
         <div className="form-center">
            <form onSubmit={handleSubmit}>
               <fieldset>
                  <label htmlFor="purchase_date">Purchase Date: &nbsp;</label>
                  <input
                     required
                     name="purchase_date"
                     type="date"
                     value={formData.purchase_date}
                     onChange={handleChange}
                  />
               </fieldset>
               <fieldset>
                  <label htmlFor="color">Color: &nbsp;</label>
                  <input
                     required
                     name="color"
                     type="text"
                     value={formData.color}
                     onChange={handleChange}
                  />
               </fieldset>
               <fieldset>
                  <label htmlFor="size">Size: &nbsp;</label>
                  <input
                     required
                     name="size"
                     type="text"
                     value={formData.size}
                     onChange={handleChange}
                  />
               </fieldset>
               <button type="submit">Own Shoe</button>
            </form>
         </div>
      </div>
   );
}

export default NewUserShoeForm;
