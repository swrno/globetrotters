'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source: 'footer' }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message || 'Successfully subscribed to newsletter!');
        setEmail('');
        setIsError(false);
      } else {
        setMessage(data.error || 'Failed to subscribe');
        setIsError(true);
      }
    } catch (error) {
      setMessage('Failed to subscribe. Please try again.');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="NewsletterForm">
      <form onSubmit={handleSubmit} className="newsletter-form">
        <div className="newsletter-input-wrapper">
          <input 
            type="email" 
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <button 
            type="submit" 
            className="primaryBtn"
            disabled={loading || !email}
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
        {message && (
          <div className={`newsletter-message ${isError ? 'error' : 'success'}`}>
            {message}
          </div>
        )}
      </form>
      
      <style jsx>{`
        .newsletter-form {
          width: 100%;
        }
        
        .newsletter-input-wrapper {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        
        .newsletter-input-wrapper input {
          flex: 1;
          min-width: 0;
        }
        
        .newsletter-message {
          margin-top: 10px;
          padding: 8px 12px;
          border-radius: 4px;
          font-size: 14px;
        }
        
        .newsletter-message.success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        
        .newsletter-message.error {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
        
        @media (max-width: 768px) {
          .newsletter-input-wrapper {
            flex-direction: column;
            gap: 15px;
          }
          
          .newsletter-input-wrapper input,
          .newsletter-input-wrapper button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}