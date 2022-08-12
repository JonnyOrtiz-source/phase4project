import ShoeListItem from './ShoeListItem';

function ShoesList({
   currentUser,
   shoes,
   deleteShoe,
   shoeTypes,
   userShoes,
   handleCurrentShoeId,
}) {
   const shoesEl = shoes.map((shoe) => (
      <ShoeListItem
         key={shoe.id}
         currentUser={currentUser}
         shoe={shoe}
         shoeTypes={shoeTypes}
         deleteShoe={deleteShoe}
         handleCurrentShoeId={handleCurrentShoeId}
      />
   ));
   return (
      <div>
         <h2>All Shoes</h2>
         <div className="wrapper">{shoesEl}</div>
      </div>
   );
}

export default ShoesList;
