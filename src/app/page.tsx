'use client';
import Table from 'react-bootstrap/Table';

import { Form, Container, Button } from 'react-bootstrap';

export default function ProductForm() {
  return (
    <>
    <Container className="mt-4">
      <h3 className="text-center mb-4">ADD PRODUCTS PAGE</h3>
      <Form>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter Product Title" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Enter Description" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" placeholder="Enter Price" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formImage">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
    <div  className='container mt-5'>
          <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td>@mdo</td>
        </tr>
       
      </tbody>
    </Table>

    </div>
    </>
  )}
  