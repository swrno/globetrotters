const FAQ = () => {
  return (
    <div>
      {/* Inner Banner */}
      <div className="innerBanner">
        <figure><img src="/images/holidaybanner.jpg" alt="" /></figure>
        <div className="bannerCont container">
          <div className="innerBanCont">
            <div className="bannerTxt">
              <h1>FAQ</h1>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Page */}
      <div className="faqPg gapsec">
        <img src="/images/dotted-plane.png" alt="" className="faqPlane" />
        <div className="container">
          <div className="headingsec">
            <p>Welcome to our FAQ section! We understand that planning a trip can bring up lots of questions, and we're here to make the process as smooth as possible. Whether you're curious about how to book an itinerary, customize your travel plans, or learn about our payment options, you'll find all the answers right here.</p>
            <p>
              Explore our categorized questions below to quickly find the information you need. If you can't find what you're looking for, don't hesitate to reach out to our friendly support team—we're always happy to help!
              Let's make your travel planning stress-free and enjoyable!
            </p>
          </div>
          <div className="accordionWrapper">
            <div className="accordion" id="accordionExample1">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Question 1
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample1">
                  <div className="accordion-body">
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus delectus deleniti ex facere dolorem error voluptatem repellat esse amet. Nulla cum obcaecati dolorem tempore laborum totam autem eius iste commodi?</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Question 2
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample1">
                  <div className="accordion-body">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta in neque exercitationem iure voluptatibus praesentium molestias, eum at quidem. Quidem quibusdam amet tempore voluptatibus nobis optio deleniti aliquam reiciendis error.</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Question 3
                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample1">
                  <div className="accordion-body">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam incidunt dolor cupiditate veniam maxime earum. Eaque illum ex veritatis ipsum ad ratione optio sunt perspiciatis hic in voluptatum, labore numquam?</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                    Question 4
                  </button>
                </h2>
                <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample1">
                  <div className="accordion-body">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam incidunt dolor cupiditate veniam maxime earum. Eaque illum ex veritatis ipsum ad ratione optio sunt perspiciatis hic in voluptatum, labore numquam?</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                    Question 5
                  </button>
                </h2>
                <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample1">
                  <div className="accordion-body">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam incidunt dolor cupiditate veniam maxime earum. Eaque illum ex veritatis ipsum ad ratione optio sunt perspiciatis hic in voluptatum, labore numquam?</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                    Question 6
                  </button>
                </h2>
                <div id="collapseSix" className="accordion-collapse collapse" data-bs-parent="#accordionExample1">
                  <div className="accordion-body">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam incidunt dolor cupiditate veniam maxime earum. Eaque illum ex veritatis ipsum ad ratione optio sunt perspiciatis hic in voluptatum, labore numquam?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
