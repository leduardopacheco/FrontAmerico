import React, { useEffect, useState } from "react";
import {
  getProdutosWithCategory,
  deleteProduto,
  updateProduto,
  createProduto,
  getCategorias,
} from "../api/api";
import ProdutoEditForm from "./ProdutoEditForm";
import Modal from "./Modal";

const ProdutoList = () => {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para buscar produtos e categorias
  const fetchProdutos = async () => {
    try {
      const produtosData = await getProdutosWithCategory();
      setProdutos(produtosData);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const categoriasData = await getCategorias();
      setCategorias(categoriasData);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  useEffect(() => {
    fetchProdutos();
    fetchCategorias();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este item?")) return;

    try {
      await deleteProduto(id);
      fetchProdutos();
      alert("Produto deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  const handleEdit = (produto) => {
    setProdutoSelecionado(produto);
    setIsModalOpen(true);
  };

  const handleUpdate = async (produtoAtualizado) => {
    try {
      await updateProduto(produtoAtualizado.id, produtoAtualizado);
      fetchProdutos();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

  const handleCreate = async (novoProduto) => {
    try {
      await createProduto(novoProduto);
      fetchProdutos();
    } catch (error) {
      console.error("Erro ao criar produto:", error);
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Lista de Produtos</h1>
      <ul style={productListStyle}>
        {produtos.map((produto) => (
          <li key={produto.id} style={productItemStyle}>
            <p><strong>Nome:</strong> {produto.nome}</p>
            <p><strong>Descrição:</strong> {produto.descricao}</p>
            <p><strong>Preço:</strong> R$ {produto.preco}</p>
            <p>
              <strong>Categoria:</strong> {produto.categoria_id} - {produto.categoria_descricao}
            </p>
            <div style={buttonContainerStyle}>
              <button onClick={() => handleEdit(produto)} style={editButtonStyle}>
                Editar
              </button>
              <button onClick={() => handleDelete(produto.id)} style={deleteButtonStyle}>
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {produtoSelecionado && (
          <ProdutoEditForm
            produto={produtoSelecionado}
            onUpdate={handleUpdate}
            onCancel={() => setIsModalOpen(false)}
            categorias={categorias}
          />
        )}
      </Modal>
    </div>
  );
};

const containerStyle = {
  maxWidth: '100vh',
  margin: '20px 0 auto',
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

const productListStyle = {
  listStyle: 'none',
  padding: '0',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '15px',
};

const productItemStyle = {
  padding: '20px',
  borderRadius: '8px',
  backgroundColor: '#fff',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  fontSize: '14px',
  color: '#333',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
  marginTop: '10px',
};

const editButtonStyle = {
  padding: '8px 12px',
  borderRadius: '5px',
  backgroundColor: '#4CAF50',
  color: 'white',
  fontSize: '14px',
  fontWeight: 'bold',
  cursor: 'pointer',
  border: 'none',
};

const deleteButtonStyle = {
  padding: '8px 12px',
  borderRadius: '5px',
  backgroundColor: 'red',
  color: 'white',
  fontSize: '14px',
  fontWeight: 'bold',
  cursor: 'pointer',
  border: 'none',
};

export default ProdutoList;
