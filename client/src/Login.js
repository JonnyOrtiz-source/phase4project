import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from './hooks/useForm';
import Signup from './Signup';

function Login({ handleCurrentUser }) {
   const [toggle, setToggle] = useState(true);

   const [error, setError] = useState('');

   const history = useHistory();

   const initialData = {
      email: '',
      password: '',
   };

   const { formData, handleChange } = useForm(initialData);

   function handleClick() {
      setToggle((preToggle) => !preToggle);
   }

   function handleSubmit(e) {
      e.preventDefault();
      fetch('/login', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ ...formData }),
      }).then((r) => {
         if (r.ok) {
            r.json().then((user) => {
               handleCurrentUser(user);
               history.push('/shoes');

               // setFormData({
               //    email: '',
               //    password: '',
               // });
            });
         } else {
            r.json().then((json) => setError(json.error));
         }
      });
   }

   return (
      <div>
         {toggle ? (
            <div>
               <h2>Login</h2>
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
                     {error && <div className="login-error">{error}.</div>}
                     <button className="btn-submit" type="submit">
                        Login!
                     </button>
                  </form>
               </div>
            </div>
         ) : (
            <Signup handleCurrentUser={handleCurrentUser} />
         )}
         <div className="form-center">
            <button onClick={handleClick}>
               {' '}
               {toggle ? 'Register' : 'Login'}
            </button>
         </div>
      </div>
   );
}

export default Login;
