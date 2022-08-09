import { useForm } from './hooks/useForm';
import { useHistory } from 'react-router-dom';

function Signup({ handleCurrentUser }) {
   const initialData = {
      email: '',
      password: '',
      password_confirmation: '',
   };

   const { formData, handleChange } = useForm(initialData);

   const history = useHistory();

   function handleSubmit(e) {
      e.preventDefault();

      const configObj = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
         },
         body: JSON.stringify({ ...formData }),
      };

      fetch(`/users`, configObj).then((res) => {
         if (res.ok) {
            res.json().then((user) => {
               console.log(user);
               handleCurrentUser(user);
               history.push('/shoes');
            });
         } else {
            res.json().then((json) => console.log(json.errors));
         }
      });
   }

   return (
      <div>
         <h2>Register</h2>
         <div className="form-center">
            <form onSubmit={handleSubmit}>
               <fieldset>
                  <label>
                     Email: &nbsp;&nbsp;
                     <input
                        type="text"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                     />
                  </label>
               </fieldset>
               <fieldset>
                  <label>
                     Password: &nbsp;&nbsp;
                     <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                     />
                  </label>
               </fieldset>
               <fieldset>
                  <label>
                     Confirm Password: &nbsp;&nbsp;
                     <input
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                     />
                  </label>
               </fieldset>
               <button className="btn-submit" type="submit">
                  Register!
               </button>

               {/* <input  type="submit" value="Register!" /> */}
            </form>
         </div>
      </div>
   );
}

export default Signup;
