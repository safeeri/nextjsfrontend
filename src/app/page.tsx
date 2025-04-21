'use client';

import { useState, useEffect } from 'react';
import { Form, Container, Button, Table } from 'react-bootstrap';


type Product = {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
};

type FormDataType = {
  title: string;
  description: string;
  price: string;
  image: File | null;
};

export default function ProductForm() {
  const [formData, setFormData] = useState<FormDataType>({
    title: '',
    description: '',
    price: '',
    image: null,
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files?.[0] || null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8001/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Fetch Error:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const response = await fetch('http://127.0.0.1:8001/api/products', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();
      if (response.ok) {
        alert('✅ Product added successfully!');
        setFormData({ title: '', description: '', price: '', image: null });
        setErrors({});
        fetchProducts();
      } else {
        if (data.errors) {
          setErrors(data.errors);
        }
      }
    } catch (error) {
      console.error('❌ Error:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4">ADD PRODUCTS PAGE</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter Product Title"
            value={formData.title}
            onChange={handleChange}
            isInvalid={!!errors.title}
            
          />
          {errors.title && <Form.Control.Feedback type="invalid">{errors.title[0]}</Form.Control.Feedback>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            placeholder="Enter Description"
            value={formData.description}
            onChange={handleChange}
            isInvalid={!!errors.description}
            
          />
          {errors.description && <Form.Control.Feedback type="invalid">{errors.description[0]}</Form.Control.Feedback>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            placeholder="Enter Price"
            value={formData.price}
            onChange={handleChange}
            isInvalid={!!errors.price}
            
          />
          {errors.price && <Form.Control.Feedback type="invalid">{errors.price[0]}</Form.Control.Feedback>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formImage">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            isInvalid={!!errors.image}
          />
          {errors.image && <Form.Control.Feedback type="invalid">{errors.image[0]}</Form.Control.Feedback>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <hr className="my-5" />

      <h4 className="mb-3">Product List</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((prod, index) => (
              <tr key={prod.id}>
                <td>{index + 1}</td>
                <td>{prod.title}</td>
                <td>{prod.description}</td>
                <td>{prod.price}</td>
                <td>
                  <img
                    src={`http://127.0.0.1:8001/storage/${prod.image}`}
                    alt={prod.title}
                    width="70"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}