'use client';

import Link from 'next/link';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function FAQ() {
  const [openAccordion, setOpenAccordion] = useState(0);

  const faqs = [
    {
      id: 1,
      question: 'How do I book a travel package?',
      answer: 'You can book a travel package by browsing our holiday packages, selecting your preferred destination and package, and filling out the inquiry form. Our team will then contact you to finalize the booking details and payment.'
    },
    {
      id: 2,
      question: 'Can I customize my travel itinerary?',
      answer: 'Yes, we offer fully customizable travel itineraries. You can discuss your preferences with our travel experts, and we\'ll create a personalized package that suits your budget, interests, and travel dates.'
    },
    {
      id: 3,
      question: 'What payment methods do you accept?',
      answer: 'We accept various payment methods including credit cards, debit cards, net banking, UPI, and bank transfers. You can also opt for installment payments for certain packages.'
    },
    {
      id: 4,
      question: 'What is your cancellation policy?',
      answer: 'Our cancellation policy varies depending on the package and timing of cancellation. Generally, cancellations made 30+ days before travel receive full refund minus processing fees. Please check specific terms for your package.'
    },
    {
      id: 5,
      question: 'Do you provide travel insurance?',
      answer: 'Yes, we highly recommend travel insurance and can arrange comprehensive travel insurance coverage for your trip. This includes medical emergencies, trip cancellations, and baggage protection.'
    },
    {
      id: 6,
      question: 'Are your tour guides certified?',
      answer: 'All our tour guides are certified professionals with extensive knowledge of local destinations. They are trained to provide informative and safe touring experiences for all our travelers.'
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? -1 : index);
  };

  return (
    <>
      <Header currentPage="faq" />

      <div className="innerBanner">
        <figure><img src="/holidaybanner.jpg" alt="" /></figure>
        <div className="bannerCont container">
          <div className="innerBanCont">
            <div className="bannerTxt">
              <h1>FAQ</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="faqPg gapsec">
        <img src="/dotted-plane.png" alt="" className="faqPlane" />
        <div className="container">
          <div className="headingsec">
            <p>Welcome to our FAQ section! We understand that planning a trip can bring up lots of questions, and we&apos;re here to make the process as smooth as possible. Whether you&apos;re curious about how to book an itinerary, customize your travel plans, or learn about our payment options, you&apos;ll find all the answers right here.</p>
            <p>
              Explore our categorized questions below to quickly find the information you need. If you can&apos;t find what you&apos;re looking for, don&apos;t hesitate to reach out to our friendly support team—we&apos;re always happy to help!
              Let&apos;s make your travel planning stress-free and enjoyable!
            </p>
          </div>
          <div className="accordionWrapper">
            <div className="accordion" id="accordionExample1">
              {faqs.map((faq, index) => (
                <div key={faq.id} className="accordion-item">
                  <h2 className="accordion-header">
                    <button 
                      className={`accordion-button ${openAccordion !== index ? 'collapsed' : ''}`}
                      type="button" 
                      onClick={() => toggleAccordion(index)}
                      aria-expanded={openAccordion === index}
                    >
                      {faq.question}
                    </button>
                  </h2>
                  <div 
                    className={`accordion-collapse collapse ${openAccordion === index ? 'show' : ''}`}
                    style={{ display: openAccordion === index ? 'block' : 'none' }}
                  >
                    <div className="accordion-body">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}