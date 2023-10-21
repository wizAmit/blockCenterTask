import React, { useState, useEffect } from 'react';
import PDFButton from './PDFButton';

const UserForm = () => {
  // Initialize form data state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: 'male',
    dateOfBirth: '',
    email: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send the form data to a Python API using fetch or an Axios instance
      const response = await fetch('http://127.0.0.1:5000/birthdate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful submission
        console.log('Form data submitted successfully');
        setFormSubmitted(true);
      } else {
        // Handle errors
        console.error('Form data submission failed');
      }
    } catch (error) {
      console.error('An error occurred while submitting the form data:', error);
    }
  };

  return (
    <div>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Gender:</label>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleInputChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleInputChange}
            />
            Female
          </label>
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>

      {/* Conditionally render the "Get PDF" button when the form is successfully submitted */}
      {formSubmitted && <PDFButton pdfUrl="http://127.0.0.1:5000/get-pdf/" buttonText="Download PDF" />}

    </div>
  );
};

export default UserForm;
