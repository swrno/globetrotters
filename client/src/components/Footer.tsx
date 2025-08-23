import { Link } from 'react-router-dom';

const Footer = () => {
  return (
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
            <Link to="/">
              <img src="/images/footlogo.png" alt="" />
            </Link>
          </div>
          <div className="footNav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/holiday-packages">Holiday Packages</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className="socialsec">
            <ul>
              <li><a href="#"><img src="/images/fb.svg" alt="" /></a></li>
              <li><a href="#"><img src="/images/insta.svg" alt="" /></a></li>
              <li><a href="#"><img src="/images/wh.svg" alt="" /></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
