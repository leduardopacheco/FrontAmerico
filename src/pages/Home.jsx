import React from 'react';
import ProdutoForm from '../components/ProdutoForm';
import ProdutoList from '../components/ProdutoList';
import CategoriaForm from '../components/CategoriaForm';

const Home = () => {
  return (
    <div style={{height:'100vh', width:'100vh'}}>
      <ProdutoForm />
      {/* <CategoriaForm/> */}
      <ProdutoList />
    </div>
  );
};

export default Home;
