import { Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Welcome from './Welcome';
import Nav from './Nav';
import Login from './Login';
import ShoesList from './shoes/ShoesList';
import NewShoeForm from './shoes/NewShoeForm';
import ShoeEditForm from './shoes/ShoeEditForm';
import ShoeShow from './shoes/ShoeShow';
// import UserShoeShow from './shoes/UserShoeShow';
import NewUserShoeForm from './shoes/NewUserShoeForm';
import OwnedShoes from './shoes/OwnedShoes';

function Main() {
   const [currentUser, setCurrentUser] = useState(null);
   const [shoes, setShoes] = useState([]);
   const [shoeTypes, setShoeTypes] = useState([]);
   const [currentShoeId, setCurrentShoeId] = useState('');
   const [userShoes, setUserShoes] = useState([]);

   useEffect(() => {
      fetch(`/shoe_types`)
         .then((r) => r.json())
         .then((shoeType) => {
            setShoeTypes(shoeType);
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
      fetch(`/user_shoes`)
         .then((r) => r.json())
         .then((userShoes) => {
            setUserShoes(userShoes);
         })
         .catch((err) => {
            alert(err);
         });
   }, []);

   const handleAddShoe = (newShoe) => {
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

   const handleSetUserShoes = (userShoes) => {
      setUserShoes(userShoes);
   };

   const handleAddUserShoe = (newUserShoe) => {
      setUserShoes((userShoes) => [...userShoes, newUserShoe]);
   };

   const deleteUserShoe = (deletedUserShoe) => {
      const updatedUserShoes = userShoes.filter(
         (userShoe) => userShoe.id !== deletedUserShoe.id
      );
      setUserShoes(updatedUserShoes);
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
                  shoeTypes={shoeTypes}
                  deleteShoe={deleteShoe}
                  handleCurrentShoeId={handleCurrentShoeId}
               />
            </Route>

            <Route exact path="/shoes/new">
               <NewShoeForm
                  handleAddShoe={handleAddShoe}
                  shoeTypes={shoeTypes}
               />
            </Route>

            <Route exact path="/user_shoes">
               <OwnedShoes
                  currentUser={currentUser}
                  userShoes={userShoes}
                  deleteUserShoe={deleteUserShoe}
                  handleSetUserShoes={handleSetUserShoes}
               />
            </Route>

            <Route exact path="/user_shoes/new">
               <NewUserShoeForm
                  currentShoeId={currentShoeId}
                  currentUser={currentUser}
                  shoeTypes={shoeTypes}
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
                     shoeTypes={shoeTypes}
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
                     shoeTypes={shoeTypes}
                     handleCurrentShoeId={handleCurrentShoeId}
                  />
               )}
            />

            {/* <Route exact path="/user_shoes/:id">
               <UserShoeShow currentUser={currentUser} />
            </Route> */}

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
