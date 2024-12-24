import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: ''
  });

  const [records, setRecords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/records');
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/records', formData);
      alert('Data submitted successfully!');
      clearForm();
      fetchRecords();
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting data');
    }
  };

  const clearForm = () => {
    setFormData({
      field1: '',
      field2: '',
      field3: '',
      field4: '',
      field5: ''
    });
    setCurrentIndex(-1);
  };

  const handleDelete = async () => {
    if (currentIndex === -1 || !records[currentIndex]) {
      alert('No record selected');
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/records/${records[currentIndex].id}`);
      alert('Record deleted successfully!');
      fetchRecords();
      clearForm();
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting record');
    }
  };

  const handleForward = () => {
    if (currentIndex < records.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setFormData(records[nextIndex]);
    }
  };

  const handleBackward = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setFormData(records[prevIndex]);
    }
  };

  return (
    <div className="App">
      <h1>PERN Stack Form</h1>
      <div className="navigation-buttons">
        <button type="button" onClick={handleBackward} disabled={currentIndex <= 0}>
          ← Previous
        </button>
        <button type="button" onClick={clearForm}>
          Add New
        </button>
        <button type="button" onClick={handleDelete} disabled={currentIndex === -1}>
          Delete
        </button>
        <button type="button" onClick={handleForward} disabled={currentIndex >= records.length - 1}>
          Next →
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="field1">Name:</label>
          <input
            type="text"
            id="field1"
            name="field1"
            value={formData.field1}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="field2">Email:</label>
          <input
            type="email"
            id="field2"
            name="field2"
            value={formData.field2}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="field3">Phone Number:</label>
          <input
            type="tel"
            id="field3"
            name="field3"
            value={formData.field3}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="field4">Address:</label>
          <input
            type="text"
            id="field4"
            name="field4"
            value={formData.field4}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="field5">Message:</label>
          <textarea
            id="field5"
            name="field5"
            value={formData.field5}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
