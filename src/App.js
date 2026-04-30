import React, { useState, useEffect } from 'react';
import './App.css';
import profilePhoto from './profile.png';
import profile from './20231213123938_DSCF6616.JPG';
import { FaInstagram, FaEnvelope, FaGithub, FaTwitter, FaFacebookF, FaYoutube, FaLinkedinIn, FaBars, FaTimes } from 'react-icons/fa';

function App() {

  // ========== STATE DEFINISI (URUTAN PENTING) ==========

  // State untuk Role Teks Berganti
  const roles = ["BACK END DEVELOPER", "PHOTOGRAPHER FREELANCE"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // State untuk modal
  const [modalImage, setModalImage] = useState(null);

  // State untuk scroll
  const [imagePosition, setImagePosition] = useState('hero');

  // State untuk carousel
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentDesignSlide, setCurrentDesignSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Data foto untuk carousel photography
  const photoSlides = [
    { src: '/photos/KSM02528.JPG', title: 'Portrait Session' },
    { src: '/photos/ALD07542.JPG', title: 'Street Photography' },
    { src: '/photos/TNC06520.JPG', title: 'Event Documentation' },
    { src: '/photos/KSM02695.JPG', title: 'Event Documentation' }
  ];

  // Data foto untuk carousel design
  const designSlides = [
    { src: '/photos/Design_feed.png', title: 'Design Feed' },
    { src: '/photos/Educator\'s Conference.png', title: 'Educator\'s Conference' },
    { src: '/photos/Jumat Agung.png', title: 'Jumat Agung' },
    { src: '/photos/Monthly verse (3).png', title: 'Monthly Verse' }
  ];

  // ========== FUNCTIONS ==========

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    const mailtoLink = `mailto:pakpahanamsal1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    window.location.href = mailtoLink;
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  // ========== USE EFFECTS ==========

  // Animasi fade in saat scroll
  useEffect(() => {
    const fadeElements = document.querySelectorAll('.fade-in-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.3 });
    fadeElements.forEach(el => observer.observe(el));
    return () => {
      fadeElements.forEach(el => observer.unobserve(el));
    };
  }, []);
  useEffect(() => {
    const handleNavbarScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleNavbarScroll);
    return () => window.removeEventListener('scroll', handleNavbarScroll);
  }, []);

  // Scroll effect untuk hero image
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home');
      const aboutSection = document.getElementById('about');
      if (heroSection && aboutSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY + 100;
        if (scrollPosition > heroBottom) {
          setImagePosition('about');
        } else {
          setImagePosition('hero');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto slide role text
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  // Deteksi ukuran layar untuk mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto slide untuk carousel photography di mobile
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % photoSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isMobile, photoSlides.length]);

  // Auto slide untuk carousel design di mobile
  useEffect(() => {
    if (!isMobile) return;
    const designInterval = setInterval(() => {
      setCurrentDesignSlide((prev) => (prev + 1) % designSlides.length);
    }, 3000);
    return () => clearInterval(designInterval);
  }, [isMobile, designSlides.length]);

  return (
    <div className="portfolio-wrapper">
      <nav className="navbar">
        <div className="nav-container">
          <div className="burger-menu" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <a href="#home" onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>HOME</a>
            <a href="#about" onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
              const element = document.getElementById('about');
              if (element) window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
            }}>ABOUT</a>
            <a href="#skill" onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
              const element = document.getElementById('skill');
              if (element) window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
            }}>SKILLS</a>
            <a href="#project" onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
              const element = document.getElementById('project');
              if (element) window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
            }}>PROJECTS</a>
            <a href="#contact" onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
              const element = document.getElementById('contact');
              if (element) window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
            }}>CONTACT</a>
          </div>
        </div>
      </nav>

      {/* HOME Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <div className="text-group">
            <h1 className="name-title">AMSAL PAKPAHAN</h1>
            <div className="role-container">
              <h2 className="role-title keyframe-animation">
                {roles[currentRoleIndex]}
              </h2>
            </div>
          </div>
          <div className="social-group">
            <div className="social-group">
              <a href="https://www.instagram.com/amsal_paruhum?igsh=MW5lN25rbjA2NWVtMA==" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="mailto:pakpahanamsal1@gmail.com"><FaEnvelope /></a>
              <a href="https://github.com/Amsalpakpahan03" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            </div>
          </div>
        </div>
        <div className={`hero-image-container ${imagePosition === 'about' ? 'move-to-about' : ''}`}>
          <img src={profilePhoto} alt="Amsal" className="main-photo" />
        </div>
      </section>

      {/* ABOUT Section */}
      <section id="about" className="about-section">
        <div className="section-container">
          <div className="about-wrapper">
            <div className="about-image">
              <div
                className="about-photo-circle"
                style={{
                  backgroundImage: `url(${profile})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              ></div>
            </div>
            <div className="about-content fade-in-scroll">
              <h2 className="about-title">About Me</h2>
              <p className="about-text">
                I'm a final-year Informatics Engineering student who is currently learning Backend Development.
                I'm still a beginner in Node.js and Spring Boot, but I'm excited to keep learning and growing every day.
              </p>
              <p className="about-text" style={{ marginTop: '15px' }}>
                Besides coding, I also enjoy graphic design and photography. It's my way to stay creative
                and balanced while exploring the world of technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SKILL Section */}
      {/* SKILL Section */}
      <section id="skill" className="skill-section">
        <div className="section-container">
          <h2 className="skill-title">SKILLS & EXPERIENCE</h2>
          <p className="skill-subtitle">Technologies I learned during college</p>
          <div className="skills-grid">
            <div className="skill-card">
              <div className="skill-icon">
                <i className="devicon-java-plain colored"></i>
              </div>
              <h3 className="skill-name">Java Spring Boot</h3>
              <p className="skill-level">Beginner (Microservice)</p>
            </div>
            <div className="skill-card">
              <div className="skill-icon">
                <i className="devicon-laravel-plain colored"></i>
              </div>
              <h3 className="skill-name">Laravel</h3>
              <p className="skill-level">Beginner</p>
            </div>
            <div className="skill-card">
              <div className="skill-icon">
                <i className="devicon-nodejs-plain colored"></i>
              </div>
              <h3 className="skill-name">Node.js</h3>
              <p className="skill-level">Beginner</p>
            </div>
          </div>

          <div className="experience-list">
            <h3 className="experience-title">Course Projects & Assignments:</h3>
            <ul className="experience-items">
              <li>✓ Built RESTful API with Spring Boot & Microservice architecture for final project</li>
              <li>✓ Developed web application using Laravel for database course</li>
              <li>✓ Created backend services with Node.js for various assignments</li>
              <li>✓ Collaborated on team projects using Git & GitHub</li>
            </ul>
          </div>

          {/* Internship Experience with Game Project */}
          <div className="internship-experience">
            <h3 className="experience-title">Internship Experience</h3>
            <div className="internship-card">
              <div className="internship-header">
                <h4>Game Programmer Intern</h4>
                <span className="internship-duration">3 Months</span>
              </div>
              <p className="internship-description">
                Worked as a programmer in a team to develop a demo play game.
                Collaborated with the team for 3 months and successfully completed the game for demo play.
              </p>
              <div className="game-screenshots">
                <div className="screenshot-item" onClick={() => openModal('/photos/ss-1.png')}>
                  <img src="/photos/ss-1.png" alt="Game Screenshot 1" />
                  <div className="screenshot-overlay">
                    <span>Click to view</span>
                  </div>
                </div>
                <div className="screenshot-item" onClick={() => openModal('/photos/ss-2.png')}>
                  <img src="/photos/ss-2.png" alt="Game Screenshot 2" />
                  <div className="screenshot-overlay">
                    <span>Click to view</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* PROJECT Section */}
      <section id="project" className="project-section">
        <div className="section-container">
          <h2 className="project-title">PROJECTS</h2>

          {/* Photography Projects */}
          <h3 className="project-category">Photography</h3>

          {!isMobile ? (
            <div className="photo-gallery-symmetry">
              <div className="photo-col portrait">
                <div className="photo-item-masonry" onClick={() => openModal('/photos/KSM02528.JPG')}>
                  <img src="/photos/KSM02528.JPG" alt="Portrait Session" />
                  <div className="photo-overlay">
                    <span>Portrait Session</span>
                  </div>
                </div>
              </div>
              <div className="photo-col landscape-stack">
                <div className="photo-item-masonry" onClick={() => openModal('/photos/ALD07542.JPG')}>
                  <img src="/photos/ALD07542.JPG" alt="Street Photography" />
                  <div className="photo-overlay">
                    <span>Street Photography</span>
                  </div>
                </div>
                <div className="photo-item-masonry" onClick={() => openModal('/photos/TNC06520.JPG')}>
                  <img src="/photos/TNC06520.JPG" alt="Event Documentation" />
                  <div className="photo-overlay">
                    <span>Event Documentation</span>
                  </div>
                </div>
              </div>
              <div className="photo-col portrait">
                <div className="photo-item-masonry" onClick={() => openModal('/photos/KSM02695.JPG')}>
                  <img src="/photos/KSM02695.JPG" alt="Event Documentation" />
                  <div className="photo-overlay">
                    <span>Event Documentation</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="photo-carousel">
              <div className="carousel-container">
                {photoSlides.map((slide, index) => (
                  <div
                    key={index}
                    className={`carousel-slide ${currentSlide === index ? 'active' : ''}`}
                    onClick={() => openModal(slide.src)}
                  >
                    <img src={slide.src} alt={slide.title} />
                    <div className="carousel-overlay">
                      <span>{slide.title}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="carousel-dots">
                {photoSlides.map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
              <button className="carousel-prev" onClick={() => setCurrentSlide((prev) => (prev - 1 + photoSlides.length) % photoSlides.length)}>❮</button>
              <button className="carousel-next" onClick={() => setCurrentSlide((prev) => (prev + 1) % photoSlides.length)}>❯</button>
            </div>
          )}

          {/* Design Projects */}
          <h3 className="project-category">Graphic Design</h3>

          {!isMobile ? (
            <div className="photo-gallery-symmetry">
              {/* Kiri - Portrait (Story IG) */}
              <div className="photo-col portrait">
                <div className="photo-item-masonry" onClick={() => openModal('/photos/Jumat Agung.png')}>
                  <img src="/photos/Jumat Agung.png" alt="Jumat Agung" />
                  <div className="photo-overlay">
                    <span>Jumat Agung</span>
                  </div>
                </div>
              </div>

              {/* Tengah - 2 Square bertumpuk (Feed IG) */}
              <div className="photo-col landscape-stack">
                <div className="photo-item-masonry" onClick={() => openModal('/photos/Educator\'s Conference.png')}>
                  <img src="/photos/Educator's Conference.png" alt="Educator's Conference" />
                  <div className="photo-overlay">
                    <span>Educator's Conference</span>
                  </div>
                </div>
                <div className="photo-item-masonry" onClick={() => openModal('/photos/Monthly verse (3).png')}>
                  <img src="/photos/Monthly verse (3).png" alt="Monthly Verse" />
                  <div className="photo-overlay">
                    <span>Monthly Verse</span>
                  </div>
                </div>
              </div>

              {/* Kanan - Portrait Tinggi (Design Feed) */}
              <div className="photo-col portrait">
                <div className="photo-item-masonry" onClick={() => openModal('/photos/Design_feed.png')}>
                  <img src="/photos/Design_feed.png" alt="Design Feed" />
                  <div className="photo-overlay">
                    <span>Design Feed</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Mobile View - Carousel Design */
            <div className="photo-carousel">
              <div className="carousel-container">
                {designSlides.map((slide, index) => (
                  <div
                    key={index}
                    className={`carousel-slide ${currentDesignSlide === index ? 'active' : ''}`}
                    onClick={() => openModal(slide.src)}
                  >
                    <img src={slide.src} alt={slide.title} />
                    <div className="carousel-overlay">
                      <span>{slide.title}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="carousel-dots">
                {designSlides.map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-dot ${currentDesignSlide === index ? 'active' : ''}`}
                    onClick={() => setCurrentDesignSlide(index)}
                  />
                ))}
              </div>

              <button
                className="carousel-prev"
                onClick={() => setCurrentDesignSlide((prev) => (prev - 1 + designSlides.length) % designSlides.length)}
              >
                ❮
              </button>
              <button
                className="carousel-next"
                onClick={() => setCurrentDesignSlide((prev) => (prev + 1) % designSlides.length)}
              >
                ❯
              </button>
            </div>
          )}
          {/* Web Development Projects */}
          <h3 className="project-category">Web Development</h3>
          <div className="project-web-grid">
            <div className="project-web-card">
              <div className="web-card-icon">
                <img
                  src="https://www.google.com/s2/favicons?domain=cakraexport.com&sz=64"
                  alt="Cakra Export"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ffb84d"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>' }}
                />
              </div>
              <div className="web-card-content">
                <h3>Cakra Export</h3>
                <div className="web-tech-stack">
                </div>
                <p className="web-description">Company profile website for export business.</p>
                <a href="https://cakraexport.com" target="_blank" rel="noopener noreferrer" className="web-link">
                  View Project <span>→</span>
                </a>
              </div>
            </div>

            <div className="project-web-card">
              <div className="web-card-icon">
                <img
                  src="https://www.google.com/s2/favicons?domain=mathetes.sch.id&sz=64"
                  alt="Sekolah Mathetes"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ffb84d"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>' }}
                />
              </div>
              <div className="web-card-content">
                <h3>Mathetes School</h3>
                <div className="web-tech-stack">
                </div>
                <p className="web-description">School website for academic information and student resources.</p>
                <a href="https://mathetes.sch.id" target="_blank" rel="noopener noreferrer" className="web-link">
                  View Project <span>→</span>
                </a>
              </div>
            </div>

            <div className="project-web-card">
              <div className="web-card-icon">
                <img
                  src="https://www.google.com/s2/favicons?domain=detic.id&sz=64"
                  alt="Detic.id"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ffb84d"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>' }}
                />
              </div>
              <div className="web-card-content">
                <h3>Detic.id</h3>
                <div className="web-tech-stack">
                </div>
                <p className="web-description">Local concert ticketing system with payment integration.</p>
                <a href="https://detic.id" target="_blank" rel="noopener noreferrer" className="web-link">
                  View Project <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT Section */}
      <section id="contact" className="contact-section">
        <div className="contact-container">
          <div className="contact-content">
            <div className="contact-info">
              <p className="contact-label">Email me:</p>
              <h3 className="contact-info-text">pakpahanamsal1@gmail.com</h3>
              <p className="contact-label">Follow me:</p>
              <div className="contact-social-icons">
                <div className="contact-social-icons">
                  <a className="contact-social-btn" href="https://www.instagram.com/amsal_paruhum?igsh=MW5lN25rbjA2NWVtMA==" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                  <a className="contact-social-btn" href="https://github.com/Amsalpakpahan03" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                  <a className="contact-social-btn" href="mailto:pakpahanamsal1@gmail.com"><FaEnvelope /></a>
                </div>
              </div>
            </div>
            <div className="contact-form-wrapper">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required />
                  </div>
                </div>
                <div className="form-group-full">
                  <input type="text" className="form-control" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" required />
                </div>
                <div className="form-group-full">
                  <textarea className="form-control" name="message" value={formData.message} onChange={handleChange} placeholder="Message" rows="4" required></textarea>
                </div>
                <div className="form-group-full">
                  <button className="contact-submit-btn" type="submit">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-social">
            <div className="footer-social">
              <a href="https://www.instagram.com/amsal_paruhum?igsh=MW5lN25rbjA2NWVtMA==" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://github.com/Amsalpakpahan03" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
              <a href="mailto:pakpahanamsal1@gmail.com"><FaEnvelope /></a>
            </div>
          </div>
          <p className="footer-text">Amsal Pakpahan {new Date().getFullYear()}</p>
        </div>
      </footer>

      {/* Modal untuk preview foto */}
      {modalImage && (
        <div className="modal" onClick={closeModal}>
          <span className="modal-close" onClick={closeModal}>&times;</span>
          <img src={modalImage} alt="Preview" className="modal-image" />
          <div className="modal-caption">
            <span>Click anywhere to close</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;