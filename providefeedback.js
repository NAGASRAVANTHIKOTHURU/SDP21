import React, { useState } from 'react';
import './providefeedback.css';
import { callApi, errorResponse, getSession } from '../main';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const tableStyle = { width: '100%' };

const ProvideFeedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [suggestions, setSuggestions] = useState('');

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmitFeedback = async () => {
    try {
      if (!name || !email || !rating) {
        alert('All fields marked with * must be filled.');
        return;
      }
  
      const url = 'http://localhost:5000/api/submitFeedback';
      const data = JSON.stringify({
        name,
        email,
        rating,
        suggestions,
      });
  
      const response = await callApi('POST', url, data, handleSuccess, handleError);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleSuccess = (res) => {
    alert('Feedback submitted successfully!');
  };

  const handleError = (error) => {
    console.error('Error submitting feedback:', error);
  };

  return (
    <div className='feedbackheight'>
      <div className='provide-feedback-content'>
        <h3>Provide Feedback</h3>
        <table className='feedback-table' style={tableStyle}>
          <tbody>
            <tr>
              <td>
                Name*{' '}
                <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='feedback-txtbox'
                />
              </td>
            </tr>
            <tr>
              <td>
                Email*{' '}
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='feedback-txtbox'
                />
              </td>
            </tr>
            <tr>
              <td>
                Rating*
                {[1, 2, 3, 4, 5].map((value) => (
                  <span
                    key={value}
                    className={`star-icon ${rating >= value ? 'filled' : ''}`}
                    onClick={() => handleRatingChange(value)}
                  >
                    <FontAwesomeIcon icon={faStar} />
                  </span>
                ))}
              </td>
            </tr>
            <tr>
              <td>
                Suggestions{' '}
                <textarea
                  value={suggestions}
                  onChange={(e) => setSuggestions(e.target.value)}
                  rows={4}
                  cols={50}
                  className='feedback-txtbox'
                />
              </td>
            </tr>
            <tr>
              <td>
                <button className='feedback-button' onClick={handleSubmitFeedback}>
                  Submit Feedback
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProvideFeedback;
