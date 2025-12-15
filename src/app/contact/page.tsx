'use client';

import Link from 'next/link';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          message: ''
        });
      } else {
        setError(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header currentPage="contact" />

      <div className="innerBanner">
        <figure><img src="/holidaybanner.jpg" alt="" /></figure>
        <div className="bannerCont container">
          <div className="innerBanCont">
            <div className="bannerTxt">
              <h1>Contact</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="contactPg gapsec">
        <img src="/planeimg2.svg" alt="" className="faqPlane" />
        <div className="container">
          <div className="contactTop">
            <p>Ready to embark on your next adventure? We&apos;re here to help you plan the perfect trip! Whether you have questions about our packages, need assistance with booking, or want to create a custom itinerary, our travel experts are just a message away.</p>
            <p>
              Get in touch with us today and let&apos;s start planning your dream vacation. We pride ourselves on providing personalized service and creating unforgettable travel experiences for our clients.
              Your journey begins with a simple conversation!
            </p>
          </div>
          <div className="contactBot">
            <div className="headingsec">
              <h3>Plan your upcoming trip with us</h3>
              <h2>Contact Us</h2>
            </div>
            
            {success && (
              <div className="alert alert-success mb-4">
                Thank you for your message! We&apos;ll get back to you soon.
              </div>
            )}
            
            {error && (
              <div className="alert alert-danger mb-4">
                {error}
              </div>
            )}
            
            <div className="formSec">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input 
                        type="text" 
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input 
                        type="tel" 
                        name="phone"
                        placeholder="Phone No."
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <input 
                        type="email" 
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea 
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="btnwrap">
                      <input 
                        type="submit" 
                        value={loading ? "Sending..." : "Submit"}
                        disabled={loading}
                        className={loading ? "loading" : ""}
                      />
                    </div>
                  </div>
                </div>
              </form> 
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}