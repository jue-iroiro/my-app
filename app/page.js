'use client';

import { useState, useEffect } from 'react';

export default function ThingPage() {
  const [things, setThings] = useState([]);
  const [formData, setFormData] = useState({ name: '', color: '', price: 0, quantity: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchThings();
  }, []);

  const fetchThings = async () => {
    const res = await fetch('/api/thing');
    const data = await res.json();
    setThings(data.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const createOrUpdateThing = async (e) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `/api/thing/${editId}` : '/api/thing';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    setFormData({ name: '', color: '', price: 0, quantity: 0 });
    setIsEditing(false);
    setEditId(null);
    fetchThings();
  };

  const handleEdit = (thing) => {
    setFormData({
      name: thing.name,
      color: thing.color,
      price: thing.price,
      quantity: thing.quantity,
    });
    setIsEditing(true);
    setEditId(thing._id);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/thing/${id}`, {
      method: 'DELETE',
    });
    fetchThings();
  };

  return (
    <div>
      <h1>Things</h1>
      <form onSubmit={createOrUpdateThing}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={{ color: '#000', margin: '5px 0' }}
          />
        </div>
        <div>
          <label htmlFor="color">Color:</label>
          <input
            id="color"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
            style={{ color: '#000', margin: '5px 0' }}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            style={{ color: '#000', margin: '5px 0' }}
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleInputChange}
            style={{ color: '#000', margin: '5px 0' }}
          />
        </div>
        <button type="submit">{isEditing ? 'Update Thing' : 'Add Thing'}</button>
      </form>

      <ul style={{ marginTop: '20px' }}>
        {things.map((thing) => (
          <li key={thing._id} style={{ marginBottom: '10px' }}>
            {thing.name} - {thing.color} - ${thing.price} - {thing.quantity}
            <button onClick={() => handleEdit(thing)} style={{ marginLeft: '10px' }}>Edit</button>
            <button onClick={() => handleDelete(thing._id)} style={{ marginLeft: '5px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}