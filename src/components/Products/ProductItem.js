import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductItem = ({ product, isAdmin }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`update-product/${product.id}`);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://pj2-biblioteca-univesp.onrender.com/api/Book/${product.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.reload();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  const handleReturn = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`https://pj2-biblioteca-univesp.onrender.com/api/Book/Return/${product.id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Livro devolvido com sucesso!');
      window.location.reload();
    } catch (error) {
      console.error('Error returning book:', error);
      alert('Failed to return book. Please try again.');
    }
  };

  console.log("Admin status in ProductItem:", isAdmin); // Verifique se o valor de isAdmin está correto

  return (
    <div>
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>{product.author}</p>
      <p>{product.genre}</p>
      <p>{product.imagelink}</p>
      <p>{product.isbn10}</p>
      <p>{product.isbn13}</p>
      {isAdmin ? ( // Condicional para mostrar os botões apenas para administradores
        <div className="d-flex button-item">
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        // Botão para não administradores
        <button onClick={handleReturn}>Devolver Livro</button>
      )}
    </div>
  );
};

export default ProductItem;
