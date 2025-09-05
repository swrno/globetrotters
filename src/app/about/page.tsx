import Link from 'next/link';

export default function About() {
  const features = [
    {
      id: 1,
      title: 'Time-Saving',
      description: 'Users can reclaim hours spent researching and booking by using your platform\'s efficient features.',
      icon: '/travelpartnerimg1.svg'
    },
    {
      id: 2,
      title: 'Cost-Effective',
      description: 'Users can reclaim hours spent researching and booking by using your platform\'s efficient features.',
      icon: '/travelpartnerimg1.svg'
    },
    {
      id: 3,
      title: 'Expert Guidance',
      description: 'Users can reclaim hours spent researching and booking by using your platform\'s efficient features.',
      icon: '/travelpartnerimg1.svg'
    },
    {
      id: 4,
      title: 'Worldwide Coverage',
      description: 'Users can reclaim hours spent researching and booking by using your platform\'s efficient features.',
      icon: '/travelpartnerimg1.svg'
    },
    {
      id: 5,
      title: '24/7 Support',
      description: 'Users can reclaim hours spent researching and booking by using your platform\'s efficient features.',
      icon: '/travelpartnerimg1.svg'
    }
  ];

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
                <li className="current-menu-item"><Link href="/about">About Us</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
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
              <h1>About Us</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="aboutHistory gapsec">
        <img src="/dotted-plane.png" alt="" className="aboutPlaneimg" />
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <figure><img src="/abouthistoryimg.png" alt="" /></figure>
            </div>
            <div className="col-lg-6">
              <div className="aboutHistoryCont">
                <div className="headingsec">
                  <h3>Stepping Stones to Success</h3>
                  <h2>Our History, Your Journey</h2>
                </div>
                <p>Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.</p>
                <p>Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentum ullamcorper quis venenatis nisi. Proin vitae facilisis nisi, ac posuere leo</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="trustedPartners gapsec">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="item">
                <div className="headingsec">
                  <h3>Your trusted partner in travel</h3>
                  <h2>Globetrotters</h2>
                  <p>Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.</p>
                </div>
              </div>
            </div>
            {features.map((feature) => (
              <div key={feature.id} className="col-lg-4 col-6">
                <div className="item">
                  <figure><img src={feature.icon} alt="" /></figure>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ourMission gapsec">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="headingsec">
                <h3>To Make Travel Planning a Breeze</h3>
                <h2>Our Mission</h2>
              </div>
              <p>Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.</p>
              <p>Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentum ullamcorper quis venenatis nisi. Proin vitae facilisis nisi, ac posuere leo.</p>
            </div>
            <div className="col-lg-6">
              <figure><img src="/missionrightimg.png" alt="" /></figure>
            </div>
          </div>
        </div>
      </div>

      <div className="expTheWorld gapsec">
        <img src="/planeimg2.svg" alt="" className="expPlaneImg" />
        <div className="container">
          <div className="innerExpTheWorld">
            <figure><img src="/exptheworldimg.png" alt="" /></figure>
            <div className="expCont">
              <div className="expContInner">
                <h2>Ignite your wanderlust. Explore the world.</h2>
                <Link href="/holiday-packages" className="primaryBtn">Explore Our Packages</Link>
              </div>
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