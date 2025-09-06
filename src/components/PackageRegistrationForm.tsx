'use client';

import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface PackageRegistrationFormProps {
  packageId: string;
  packageTitle: string;
  onSuccess: () => void;
}

export default function PackageRegistrationForm({ 
  packageId, 
  packageTitle, 
  onSuccess 
}: PackageRegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
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

    if (!captchaValue) {
      setError('Please complete the CAPTCHA verification');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/packages/${packageId}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          captcha: captchaValue,
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      onSuccess();
      setFormData({ name: '', email: '', phone: '', message: '' });
      setCaptchaValue(null);
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-6">
          <div className="form-group">
            <input 
              type="text" 
              name="name"
              placeholder="Full Name" 
              value={formData.name}
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
              placeholder="Your Message (Optional)" 
              value={formData.message}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-group">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
              onChange={setCaptchaValue}
            />
          </div>
        </div>
        {error && (
          <div className="col-lg-12">
            <div className="alert alert-danger">
              {error}
            </div>
          </div>
        )}
        <div className="col-lg-12">
          <div className="btnwrap">
            <input 
              type="submit" 
              value={loading ? "Registering..." : "Register Interest"} 
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </form>
  );
}