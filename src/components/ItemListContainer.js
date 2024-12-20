import React from 'react';

const ItemListContainer = ({ greeting }) => {
  return (
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#e9ecef' }}>
      <h2>{greeting}</h2>
    </div>
  );
};

export default ItemListContainer;
