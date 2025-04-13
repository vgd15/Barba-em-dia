import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from './ProductItem';
import Header from '../header/header.jsx';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // Inicialmente vazio
  const [inputValue, setInputValue] = useState('');
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // Fetch all products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      if (!token) {
        console.error('No token available. You must log in first.');
        return;
      }
      try {
        const response = await axios.get('https://pj2-biblioteca-univesp.onrender.com/api/Book', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [token]);

  // Filter products based on search term (ISBN)
  const handleSearch = () => {
    const term = inputValue.trim();
    if (term) {
      // Filtra apenas o produto que contém o ISBN correspondente
      const filtered = products.filter((product) =>
        product.isbn10.includes(term) || product.isbn13.includes(term)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]); // Se o campo de busca estiver vazio, oculta todos os produtos
    }
  };

  return (
    <div>
      <Header />
      
        <div className="home-inside">
        <div className="container">
          <div className="cabecalho__pesquisar">
            <input
              type="search"
              placeholder="Digite aqui o ISBN"
              className="pesquisar__input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="pesquisar__botao" onClick={handleSearch}>
              Buscar
            </button>
          </div>

          <div className="produtos">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductItem key={product.id} product={product} isAdmin={isAdmin} />
              ))
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
