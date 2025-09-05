'use client';

import Link from 'next/link';
import { useState } from 'react';

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
      // Here you would typically send the form data to your API
      console.log('Form submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        message: ''
      });
    } catch (error) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <nav className="navbar navbar-expand-lg">
            <Link className="logo" href="/">
              <img src="/logo.svg" alt="logo" />
            </Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto">
                <li><Link href="/">home</Link></li>
                <li><Link href="/holiday-packages">Holiday Packages</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
                <li className="current-menu-item"><Link href="/contact">Contact Us</Link></li>
              </ul>
              <button className="closebtn">
                <img src="/closeicon.png" alt="" />
              </button>
            </div>
          </nav>
        </div>
      </header>

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

      <footer className="footer gapsec">
        <div className="container">
          <div className="footerTop">
            <div className="row">
              <div className="col-lg-5">
                <h2>Subscribe to Our Newsletter</h2>
              </div>
              <div className="col-lg-7">
                <div className="NewsletterForm">
                  <input type="email" placeholder="Email Address" />
                  <button type="button" className="primaryBtn">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
          <div className="footerBot">
            <div className="footLogo">
              <Link href="/">
                <img src="/footlogo.png" alt="" />
              </Link>
            </div>
            <div className="footNav">
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/holiday-packages">Holiday Packages</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
              </ul>
            </div>
            <div className="socialsec">
              <ul>
                <li><Link href="#"><img src="/fb.svg" alt="" /></Link></li>
                <li><Link href="#"><img src="/insta.svg" alt="" /></Link></li>
                <li><Link href="#"><img src="/wh.svg" alt="" /></Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}