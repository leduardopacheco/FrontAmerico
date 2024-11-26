import React, { useState, useEffect } from 'react';
import { getCategorias, createCategoria, updateCategoria, deleteCategoria } from '../api/api';

const CategoriaForm = ({ onCategoriaCreated }) => {
  const [categorias, setCategorias] = useState([]);
  const [nomeCategoria, setNomeCategoria] = useState('');
  const [editCategoriaId, setEditCategoriaId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategorias = async () => {
      const categoriasData = await getCategorias();
      setCategorias(categoriasData);
    };
    fetchCategorias();
  }, []);

  const handleSaveCategoria = async () => {
    if (!nomeCategoria) return;

    try {
      if (editCategoriaId) {
        await updateCategoria(editCategoriaId, { nome: nomeCategoria });
        setCategorias(categorias.map(cat => cat.id === editCategoriaId ? { ...cat, nome: nomeCategoria } : cat));
        setEditCategoriaId(null);
      } else {
        const novaCategoria = await createCategoria({ nome: nomeCategoria });
        setCategorias([...categorias, novaCategoria]);
        // Notifica o ProdutoForm sobre a criação de uma nova categoria
        if (typeof onCategoriaCreated === "function") {
          onCategoriaCreated();
        }
      }
      setNomeCategoria('');
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
    }
  };

  const handleEditCategoria = (categoria) => {
    setNomeCategoria(categoria.nome);
    setEditCategoriaId(categoria.id);
  };

  const handleDeleteCategoria = async (id) => {
    try {
      await deleteCategoria(id);
      setCategorias(categorias.filter(cat => cat.id !== id));
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setEditCategoriaId(null);
    setNomeCategoria('');
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Gerenciar Categorias</h2>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Nome da Categoria</label>
        <input
          type="text"
          value={nomeCategoria}
          onChange={(e) => setNomeCategoria(e.target.value)}
          placeholder="Nome da Categoria"
          style={inputStyle}
        />
        <button onClick={handleSaveCategoria} style={buttonStyle}>
          {editCategoriaId ? "Atualizar Categoria" : "Criar Categoria"}
        </button>
      </div>

      <button onClick={toggleModal} style={modalButtonStyle}>Ver Categorias Existentes</button>

      {isModalOpen && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3 style={modalHeadingStyle}>Categorias Existentes</h3>

            <div style={modalInputContainerStyle}>
              <input
                type="text"
                value={nomeCategoria}
                onChange={(e) => setNomeCategoria(e.target.value)}
                placeholder="Nome da Categoria"
                style={inputStyle}
              />
              <button onClick={handleSaveCategoria} style={buttonStyle}>
                {editCategoriaId ? "Atualizar Categoria" : "Criar Categoria"}
              </button>
              {editCategoriaId && (
                <button onClick={() => { setEditCategoriaId(null); setNomeCategoria(''); }} style={cancelButtonStyle}>
                  Cancelar
                </button>
              )}
            </div>

            <ul style={{ listStyle: 'none', padding: '0', marginTop: '20px' }}>
              {categorias.map((categoria) => (
                <li key={categoria.id} style={categoriaItemStyle}>
                  <span>{categoria.nome}</span>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => handleEditCategoria(categoria)} style={editButtonStyle}>Editar</button>
                    <button onClick={() => handleDeleteCategoria(categoria.id)} style={deleteButtonStyle}>
                      Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button onClick={toggleModal} style={closeButtonStyle}>Fechar</button>
          </div>
        </div>
      )}
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

const inputContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '20px'
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
  flex: '1'
};

const buttonStyle = {
  padding: '10px 15px',
  borderRadius: '5px',
  backgroundColor: '#4CAF50',
  color: 'white',
  fontSize: '14px',
  fontWeight: 'bold',
  cursor: 'pointer',
  border: 'none',
};

const modalButtonStyle = {
  padding: '10px 15px',
  borderRadius: '5px',
  backgroundColor: '#007BFF',
  color: 'white',
  fontSize: '14px',
  fontWeight: 'bold',
  cursor: 'pointer',
  border: 'none',
  width: '100%',
  marginBottom: '20px'
};

const modalStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: '1000'
};

const modalContentStyle = {
  backgroundColor: 'gray',
  padding: '20px',
  borderRadius: '8px',
  width: '400px',
  textAlign: 'center',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)'
};

const modalHeadingStyle = {
  color: '#333',
  marginBottom: '20px'
};

const modalInputContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '20px'
};

const categoriaItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 0',
  borderBottom: '1px solid #ccc',
};

const editButtonStyle = {
  padding: '6px 10px',
  borderRadius: '5px',
  backgroundColor: '#ffc107',
  color: 'white',
  cursor: 'pointer',
  border: 'none',
};

const deleteButtonStyle = {
  padding: '6px 10px',
  borderRadius: '5px',
  backgroundColor: 'red',
  color: 'white',
  cursor: 'pointer',
  border: 'none',
};

const closeButtonStyle = {
  padding: '10px 15px',
  borderRadius: '5px',
  backgroundColor: '#007BFF',
  color: 'white',
  fontSize: '14px',
  fontWeight: 'bold',
  cursor: 'pointer',
  border: 'none',
  marginTop: '20px'
};

const cancelButtonStyle = {
  padding: '6px 10px',
  borderRadius: '5px',
  backgroundColor: '#6c757d',
  color: 'white',
  cursor: 'pointer',
  border: 'none',
};

export default CategoriaForm;
