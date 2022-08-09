import ShoeListItem from './ShoeListItem';

function ShoesList({
   currentUser,
   shoes,
   deleteShoe,
   shoe_types,
   userShoes,
   handleCurrentShoeId,
}) {
   const shoesEl = shoes.map((shoe) => (
      <ShoeListItem
         currentUser={currentUser}
         key={shoe.id}
         shoe={shoe}
         shoe_types={shoe_types}
         userShoes={userShoes}
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
