import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [isbn10, setIsbn10] = useState('');
  const [isbn13, setIsbn13] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchBookByIsbn = async () => {
    if (isbn) {
      try {
        const response = await axios.get(`https://pj2-biblioteca-univesp.onrender.com/api/Book/External/${isbn}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const bookData = response.data.data;
        setTitle(bookData.title || '');
        setDescription(bookData.description || '');
        setAuthor(bookData.author || '');
        setGenre(bookData.genre || '');
        setImageLink(bookData.imageLink || '');
        setIsbn10(bookData.isbn10 || '');
        setIsbn13(bookData.isbn13 || '');
      } catch (error) {
        console.error('Error fetching book by ISBN:', error);
      }
    }
  };

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`https://pj2-biblioteca-univesp.onrender.com/api/Book/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const product = response.data.data;
          setTitle(product.title || '');
          setDescription(product.description || '');
          setAuthor(product.author || '');
          setGenre(product.genre || '');
          setImageLink(product.imageLink || '');
          setIsbn10(product.isbn10 || '');
          setIsbn13(product.isbn13 || '');
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
      fetchProduct();
    }
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = { title, description, author, genre, imageLink, isbn10, isbn13 };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      if (id) {
        await axios.put(`https://pj2-biblioteca-univesp.onrender.com/api/Book/${id}`, product, config);
      } else {
        await axios.post('https://pj2-biblioteca-univesp.onrender.com/api/Book', product, config);
      }

      navigate('/products');
    } catch (error) {
      console.error('Error submitting product:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
      }
    }
  };

  return (
    <div className="page d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="d-flex justify-content-center align-items-center">
          <div className="formulario col-6">
            <form className="d-flex flex-column" onSubmit={handleSubmit}>
              <h2 className="text-center">{id ? 'Edit Product' : 'Create Product'}</h2>

              <input
                type="text"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                placeholder="Digite o ISBN para buscar"
              />
              <button className="isbn" type="button" onClick={fetchBookByIsbn}>
                Buscar Livro por ISBN
              </button>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
              />
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author"
                required
              />
              <input
                type="text"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="Genre"
                required
              />
              <input
                type="url"
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
                placeholder="Link da imagem"
                required
              />
              <input
                type="number"
                value={isbn10}
                onChange={(e) => setIsbn10(e.target.value)}
                placeholder="ISBN-10"
                required
              />
              <input
                type="number"
                value={isbn13}
                onChange={(e) => setIsbn13(e.target.value)}
                placeholder="ISBN-13"
                required
              />
              <button type="submit">{id ? 'Update' : 'Create'}</button>
              <a className="pb-2" href="/products">
                Voltar para página inicial
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
