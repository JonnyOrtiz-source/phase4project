import { Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Welcome from './Welcome';
import Nav from './Nav';
import Login from './Login';
import ShoesList from './shoes/ShoesList';
import NewShoeForm from './shoes/NewShoeForm';
import ShoeEditForm from './shoes/ShoeEditForm';
import ShoeShow from './shoes//ShoeShow';
import NewUserShoeForm from './shoes/NewUserShoeForm';

function Main() {
   const [currentUser, setCurrentUser] = useState(null);
   const [shoes, setShoes] = useState([]);
   const [shoe_types, setShoeTypes] = useState([]);
   const [currentShoeId, setCurrentShoeId] = useState('');
   const [userShoes, setUserShoes] = useState([]);

   useEffect(() => {
      fetch(`/shoe_types`)
         .then((r) => r.json())
         .then((shoe_type) => {
            setShoeTypes(shoe_type);
         })
         .catch((err) => {
            alert(err);
         });
   }, []);

   useEffect(() => {
      fetch('/authorized_user').then((res) => {
         if (res.ok) {
            res.json().then((user) => {
               setCurrentUser(user);
            });
         }
      });
   }, []);

   useEffect(() => {
      fetch(`/shoes`)
         .then((r) => r.json())
         .then((shoes) => {
            setShoes(shoes);
         })
         .catch((err) => {
            alert(err);
         });
   }, []);

   useEffect(() => {
      fetch(`/user_shoes/`).then((res) => {
         if (res.ok) {
            res.json().then((userShoes) => {
               setUserShoes(userShoes);
            });
         }
      });
   }, []);

   const addShoe = (newShoe) => {
      setShoes((shoes) => [...shoes, newShoe]);
   };

   const updateShoe = (updatedShoe) => {
      const updatedShoes = shoes.map((prevShoe) => {
         if (prevShoe.id === updatedShoe.id) {
            return updatedShoe;
         } else {
            return prevShoe;
         }
      });
      setShoes(updatedShoes);
   };

   const deleteShoe = (deletedShoe) => {
      const updatedShoes = shoes.filter((shoe) => shoe.id !== deletedShoe.id);
      setShoes(updatedShoes);
   };

   const handleCurrentShoeId = (id) => {
      setCurrentShoeId(id);
   };

   const handleCurrentUser = (user) => {
      setCurrentUser(user);
   };

   const handleAddUserShoe = (shoe) => {
      console.log(shoe);
   };

   if (!currentUser) return <Login handleCurrentUser={handleCurrentUser} />;

   return (
      <div>
         <Nav handleCurrentUser={handleCurrentUser} />
         <Switch>
            <Route exact path="/shoes">
               <ShoesList
                  currentUser={currentUser}
                  shoes={shoes}
                  shoe_types={shoe_types}
                  userShoes={userShoes}
                  deleteShoe={deleteShoe}
                  handleCurrentShoeId={handleCurrentShoeId}
               />
            </Route>
            <Route exact path="/shoes/new">
               <NewShoeForm addShoe={addShoe} shoe_types={shoe_types} />
            </Route>
            <Route exact path="/user_shoes/new">
               <NewUserShoeForm
                  currentShoeId={currentShoeId}
                  currentUser={currentUser}
                  shoe_types={shoe_types}
                  handleAddUserShoe={handleAddUserShoe}
               />
            </Route>
            <Route
               exact
               path="/shoes/:id/edit"
               render={({ match }) => (
                  <ShoeEditForm
                     shoe={shoes.find(
                        (shoe) => shoe.id === parseInt(match.params.id)
                     )}
                     updateShoe={updateShoe}
                     shoe_types={shoe_types}
                  />
               )}
            />
            <Route
               exact
               path="/shoes/:id"
               render={({ match }) => (
                  <ShoeShow
                     shoe={shoes.find(
                        (shoe) => shoe.id === parseInt(match.params.id)
                     )}
                     deleteShoe={deleteShoe}
                     shoe_types={shoe_types}
                     handleCurrentShoeId={handleCurrentShoeId}
                  />
               )}
            />
            <Route path="/login">
               <Login handleCurrentUser={handleCurrentUser} />
            </Route>
            <Route path="/">
               <Welcome />
            </Route>
         </Switch>
      </div>
   );
}

export default Main;
