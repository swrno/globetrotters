import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

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
      <Header currentPage="about" />

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
                <p>Founded in 2010, Globetrotters began with a simple mission: to make travel accessible and extraordinary for everyone. Over the years, we have expanded our reach to cover over 50 countries, partnering with top-rated hotels and local guides to ensure authentic experiences. Our journey has been defined by our commitment to quality and customer satisfaction.</p>
                <p>From humble beginnings as a small startup, we have grown into a global team of travel experts. We believe that every journey is a story waiting to be told, and we are here to help you write yours. Whether it&apos;s a solo adventure, a family vacation, or a corporate retreat, we handle every detail with care and precision.</p>
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
                  <p>As your trusted travel partner, we go the extra mile to ensure your safety and comfort. We work tirelessly to negotiate the best rates and exclusive perks for our clients.</p>
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
              <p>Our mission is to inspire and enable people to explore the world with confidence. We strive to take the stress out of travel planning, allowing you to focus on what truly matters – immersing yourself in new cultures and creating lifelong memories.</p>
              <p>We are dedicated to sustainable tourism practices that respect local communities and the environment. By choosing Globetrotters, you are not only seeing the world but also contributing to its preservation for future generations.</p>
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

      <Footer />
    </>
  );
}