import React, { useState, useEffect } from 'react';
import { createProduto, getCategorias } from '../api/api';
import CategoriaForm from './CategoriaForm';

const ProdutoForm = ({ onProdutoCreated }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState([]);

  // Função para buscar categorias
  const fetchCategorias = async () => {
    const categoriasData = await getCategorias();
    setCategorias(categoriasData);
  };

  // Carregar categorias na montagem do componente
  useEffect(() => {
    fetchCategorias();
  }, []);

  // Função para atualizar categorias ao criar uma nova
  const handleCategoriaCreated = () => {
    fetchCategorias(); // Recarrega as categorias quando uma nova é criada
  };

  const handleSubmitProduto = async (e) => {
    e.preventDefault();
    if (!nome || !preco || !descricao || !categoriaId) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
  
    const produto = { nome, descricao, preco, categoria_id: categoriaId };
    
    try {
      await createProduto(produto);
      if (typeof onProdutoCreated === "function") {
        onProdutoCreated();
      }
      alert("Produto criado com sucesso!");
      setNome('');
      setDescricao('');
      setPreco('');
      setCategoriaId('');
    } catch (error) {
      console.error("Erro ao criar produto:", error);
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Cadastro de Produtos</h1>
      <form onSubmit={handleSubmitProduto} style={formStyle}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Nome do Produto</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Descrição</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Preço</label>
          <input
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Categoria</label>
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(Number(e.target.value))}
            required
            style={inputStyle}
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" style={buttonStyle}>Criar Produto</button>
      </form>
      <CategoriaForm onCategoriaCreated={handleCategoriaCreated} />
    </div>
  );
};


// Estilos para os elementos
const containerStyle = {
  maxWidth: '100vh',
  margin: '0 auto',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'gray',
  fontFamily: 'Arial, sans-serif'
};

const headingStyle = {
  textAlign: 'center',
  color: '#333',
  marginBottom: '20px',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

const fieldStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
};

const labelStyle = {
  fontSize: '14px',
  fontWeight: 'bold',
  color: 'white',
};

const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '14px',
};

const buttonStyle = {
  padding: '10px 15px',
  borderRadius: '5px',
  backgroundColor: '#4CAF50',
  color: 'white',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  border: 'none',
  marginTop: '10px',
};

export default ProdutoForm;
