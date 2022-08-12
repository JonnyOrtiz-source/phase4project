import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from '../hooks/useForm';

const Dropdown = ({ label, value, options, handleChange }) => {
   return (
      <label>
         {label}
         <select value={value} onChange={handleChange}>
            {options.map((option) => (
               <option key={option.value} value={option.value}>
                  {option.label}
               </option>
            ))}
         </select>
      </label>
   );
};

function ShoeEditForm({ shoe = {}, updateShoe, shoeTypes }) {
   // TODO: setFormData should be able to invoke (formData => {...formData, shoe_type_id: shoe_type.id})

   const initialData = {
      shoe_name: '',
      brand: '',
      sex: '',
      image_url: '',
   };

   const { formData, setFormData, handleChange } = useForm(initialData);

   const [shoeType, setShoeType] = useState(shoe.shoe_type_id);

   const handleShoeTypeChange = (e) => {
      setShoeType(e.target.value);
   };

   const options = shoeTypes.map((shoe_type) => {
      return { label: shoe_type.shoe_type_name, value: shoe_type.id };
   });

   const history = useHistory();
   const { id } = useParams();

   useEffect(() => {
      fetch(`/shoes/${id}`)
         .then((r) => r.json())
         .then((shoe) => setFormData(shoe));
   }, [id, setFormData]);

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData);
      const configObj = {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
         },
         body: JSON.stringify({ ...formData, shoe_type_id: shoeType }),
      };

      fetch(`/shoes/${id}`, configObj)
         .then((r) => r.json())
         .then((updatedShoe) => {
            updateShoe(updatedShoe);
            history.push(`/shoes`);
         });
   };

   return (
      <div>
         <h2>Edit Shoe</h2>
         <div className="form-center">
            <form onSubmit={handleSubmit}>
               <fieldset>
                  <label htmlFor="shoe_name">Shoe Name: &nbsp;</label>
                  <input
                     type="text"
                     name="shoe_name"
                     id="shoe_name"
                     value={formData.shoe_name}
                     onChange={handleChange}
                  />
               </fieldset>
               <fieldset>
                  <label htmlFor="brand">Brand: &nbsp;</label>
                  <input
                     type="text"
                     name="brand"
                     id="brand"
                     value={formData.brand}
                     onChange={handleChange}
                  />
               </fieldset>
               <fieldset>
                  <label htmlFor="sex">Sex: &nbsp;</label>
                  <input
                     type="text"
                     name="sex"
                     id="sex"
                     value={formData.sex}
                     onChange={handleChange}
                  />
               </fieldset>
               <fieldset>
                  <label htmlFor="image_url">Image URL: &nbsp;</label>
                  <input
                     type="text"
                     name="image_url"
                     id="image_url"
                     value={formData.image_url}
                     onChange={handleChange}
                  />
               </fieldset>
               <fieldset>
                  <Dropdown
                     label="Select shoe type: "
                     options={options}
                     value={shoeType}
                     handleChange={handleShoeTypeChange}
                  />
               </fieldset>

               <button className="btn-submit" type="submit">
                  Update Shoe
               </button>
            </form>
         </div>
      </div>
   );
}

export default ShoeEditForm;
