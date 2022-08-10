import OwnedShoeItem from './OwnedShoeItem';

function OwnedShoes({ currentUser }) {
   const ownedShoesEl = currentUser.shoes.map((shoe) => (
      <OwnedShoeItem key={shoe.id} shoe={shoe} />
   ));

   console.log(currentUser.shoes);

   return (
      <div>
         <h2>Own Shoes</h2>
         <div className="wrapper">{ownedShoesEl}</div>
      </div>
   );
}

export default OwnedShoes;
