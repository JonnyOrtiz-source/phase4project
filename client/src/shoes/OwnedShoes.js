import OwnedShoeItem from './OwnedShoeItem';

function OwnedShoes({ currentUser, userShoes, handleSetUserShoes }) {
   const deleteUserShoe = (deletedUserShoe) => {
      const updatedUserShoes = userShoes.filter(
         (userShoe) => userShoe.id !== deletedUserShoe.id
      );
      handleSetUserShoes(updatedUserShoes);
   };

   const ownedShoesEl = currentUser.user_shoes.map((userShoe) => (
      <OwnedShoeItem
         key={userShoe.id}
         userShoe={userShoe}
         deleteUserShoe={deleteUserShoe}
      />
   ));

   return (
      <div>
         <h2>Your Shoes</h2>
         <div className="wrapper">{ownedShoesEl}</div>
      </div>
   );
}

export default OwnedShoes;
