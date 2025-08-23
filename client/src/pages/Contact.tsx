const Contact = () => {
  return (
    <div>
      {/* Inner Banner */}
      <div className="innerBanner">
        <figure><img src="/images/holidaybanner.jpg" alt="" /></figure>
        <div className="bannerCont container">
          <div className="innerBanCont">
            <div className="bannerTxt">
              <h1>Contact</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Page */}
      <div className="contactPg gapsec">
        <img src="/images/planeimg2.svg" alt="" className="faqPlane" />
        <div className="container">
          <div className="contactTop">
            <p>Welcome to our FAQ section! We understand that planning a trip can bring up lots of questions, and we're here to make the process as smooth as possible. Whether you're curious about how to book an itinerary, customize your travel plans, or learn about our payment options, you'll find all the answers right here.</p>
            <p>
              Explore our categorized questions below to quickly find the information you need. If you can't find what you're looking for, don't hesitate to reach out to our friendly support team—we're always happy to help!
              Let's make your travel planning stress-free and enjoyable!
            </p>
          </div>
          <div className="contactBot">
            <div className="headingsec">
              <h3>Plan your upcoming trip with us</h3>
              <h2>Contact Us</h2>
            </div>
            <div className="formSec">
              <form>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input type="text" placeholder="Full Name" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input type="tel" placeholder="Phone No." />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <input type="email" placeholder="Email Address" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea placeholder="Your Message"></textarea>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="btnwrap">
                      <input type="button" value="Submit" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
