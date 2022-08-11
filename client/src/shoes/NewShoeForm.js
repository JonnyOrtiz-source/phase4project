import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from '../hooks/useForm';

const Dropdown = ({ label, value, options, handleChange, shoeTypes }) => {
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

function NewShoeForm({ handleAddShoe, shoeTypes }) {
   // need addShoe to set state
   // need shoeTypes to build the drop down

   const [shoeType, setShoeType] = useState('1');

   const history = useHistory();

   const initialData = {
      shoe_name: '',
      brand: '',
      sex: '',
      image_url: 'https://jallieortiz.com/media/Benji.jpeg',
   };

   const { formData, handleChange } = useForm(initialData);

   const options = shoeTypes.map((shoeType) => {
      return { label: shoeType.shoe_type_name, value: shoeType.id };
   });

   const handleShoeTypeChange = (e) => {
      setShoeType(e.target.value);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      const configObj = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
         },
         body: JSON.stringify({ ...formData, shoe_type_id: shoeType }),
      };

      fetch(`/shoes`, configObj)
         .then((r) => r.json())
         .then((newShoe) => {
            handleAddShoe(newShoe);
            history.push(`/shoes/`);
         });
   };

   return (
      <div>
         <h2>New Shoe</h2>
         {JSON.stringify(shoeType)}
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
                  Add Shoe
               </button>
            </form>
         </div>
      </div>
   );
}

export default NewShoeForm;
