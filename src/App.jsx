import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logoImg from './assets/logo.jpg';
import { sanityClient, urlFor, isSanityConfigured } from './sanityClient';
import { 
  Coffee, 
  MapPin, 
  Clock, 
  Phone, 
  Instagram, 
  Facebook, 
  Menu as MenuIcon, 
  X, 
  ChevronRight, 
  Sparkles,
  ArrowRight,
  Droplet,
  Compass
} from 'lucide-react';

// Baseline fallback content data
const DEFAULT_CONTENT = {
  hero: {
    tagline: "Anti-Gravity Coffee",
    title: "Where Flavor Floats, and Roots Remain.",
    description: "Ver.Cafe - Roots is Thrissur’s modern specialty coffee sanctuary. We blend floating, weightless design with deeply grounded local Kerala flavors to bring you a premium sensory experience."
  },
  story: {
    label: "Our Story",
    title: "Deeply Grounded, ",
    titleItalic: "Always Elevated",
    paragraph1: "In Malayalam, \"Ver\" (വേര്) means root. It represents our deep-seated connection to the rich soil, heritage, and unique spice trails of Kerala.",
    quote: "\"We root ourselves in authentic local ingredients, while elevating them using modern, avant-garde brewing techniques.\"",
    paragraph2: "From cardamom-infused espresso to cold brew extracted with sweet tender coconut nectar, every cup we serve is a tribute to our home. We welcome you to experience Thrissur’s finest specialty coffee, served in a calm, modern space designed to make you feel light, floating, and at home."
  },
  signatures: [
    {
      id: "sig-1",
      title: "Malabar Spiced Latte",
      desc: "Double-shot espresso infused with cardamom, dried ginger, and locally sourced organic jaggery.",
      price: "₹240",
      image: "/product_1.jpg",
      iconType: "sparkles"
    },
    {
      id: "sig-2",
      title: "Roots Cold Brew",
      desc: "18-hour slow-steeped cold brew, cold-filtered and infused with sweet, fresh tender coconut nectar.",
      price: "₹220",
      image: "/product_2.jpg",
      iconType: "droplet"
    },
    {
      id: "sig-3",
      title: "Cardamom Affogato",
      desc: "Velvety double shot of hot espresso poured over premium house-crafted cardamom bean ice cream.",
      price: "₹260",
      image: "/product_3.jpg",
      iconType: "compass"
    }
  ],
  menu: {
    coffee: [
      { name: "Single Origin Pour Over", price: "₹180", desc: "Locally sourced beans from Wayanad, brewed to bring out bright citrus and honey notes." },
      { name: "Traditional Espresso", price: "₹120", desc: "Double shot of our signature house blend with a rich hazelnut crema." },
      { name: "Classic Flat White", price: "₹160", desc: "Velvety steamed milk poured over a double ristretto shot." },
      { name: "Vanilla Bean Latte", price: "₹180", desc: "Espresso with house-made natural Madagascar vanilla syrup." },
      { name: "Kerala Jaggery Macchiato", price: "₹190", desc: "Espresso marked with micro-foam and a drizzle of local organic jaggery syrup." }
    ],
    infusions: [
      { name: "Spiced Hibiscus Cold Brew Tea", price: "₹150", desc: "Refreshing cold steep of organic hibiscus flowers with a hint of cinnamon." },
      { name: "Tender Coconut Cold Brew", price: "₹190", desc: "Our signature cold brew layered with fresh, sweet tender coconut water." },
      { name: "Ginger Lemongrass Matcha", price: "₹180", desc: "Stone-ground Japanese matcha whisked with fresh ginger juice and lemongrass." },
      { name: "Cardamom Rose Latte", price: "₹170", desc: "Steamed milk with cardamon infusion and organic rosewater syrup (caffeine-free)." }
    ],
    bakes: [
      { name: "Banana Bread with Spiced Ghee", price: "₹120", desc: "Warm slice of moist banana bread served with a dollop of cardamom-spiced ghee." },
      { name: "Sourdough Croissant", price: "₹140", desc: "Classic flaky butter croissant made with our 48-hour wild yeast sourdough starter." },
      { name: "Jackfruit Almond Tart", price: "₹160", desc: "Sweet pastry crust filled with almond frangipane and caramelized local jackfruit." },
      { name: "Dark Chocolate Sea Salt Cookie", price: "₹90", desc: "Chewy double chocolate cookie topped with flaky sea salt from the Malabar coast." }
    ]
  },
  location: {
    address: "Ver.Cafe - Roots, MG Road,\nNear Thrissur Round,\nThrissur, Kerala - 680001",
    hours: "Open Daily\n11:00 AM – 11:00 PM",
    phone: "+91 98765 43210",
    email: "hello@vercafe.com",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3922.7533816654215!2d76.21200237586071!3d10.520150989617208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ee46d32aa653%3A0xc3c5f49e0a25fae8!2sM.G.%20Road%2C%20Thrissur%2C%20Kerala!5e0!3m2!1sen!2sin!4v1719875000000!5m2!1sen!2sin"
  }
};

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('coffee');
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [usingSanity, setUsingSanity] = useState(false);

  // Load content dynamically from Headless Sanity CMS on mount
  useEffect(() => {
    if (!isSanityConfigured()) {
      console.log("Sanity projectId is not configured. Serving local default values.");
      return;
    }

    setUsingSanity(true);
    const queryContent = '*[_type == "cafeContent"][0]';
    const querySignatures = '*[_type == "signatureItem"] | order(order asc)';
    const queryMenuItems = '*[_type == "menuItem"] | order(order asc)';

    Promise.all([
      sanityClient.fetch(queryContent),
      sanityClient.fetch(querySignatures),
      sanityClient.fetch(queryMenuItems)
    ])
    .then(([pageData, sigData, menuItems]) => {
      setContent(prev => {
        const updated = { ...prev };
        
        // Map page level copy
        if (pageData) {
          updated.hero = {
            tagline: pageData.heroTagline || prev.hero.tagline,
            title: pageData.heroTitle || prev.hero.title,
            description: pageData.heroDescription || prev.hero.description,
          };
          updated.story = {
            label: pageData.storyLabel || prev.story.label,
            title: pageData.storyTitle || prev.story.title,
            titleItalic: pageData.storyTitleItalic || prev.story.titleItalic,
            paragraph1: pageData.storyParagraph1 || prev.story.paragraph1,
            quote: pageData.storyQuote || prev.story.quote,
            paragraph2: pageData.storyParagraph2 || prev.story.paragraph2,
          };
          updated.location = {
            address: pageData.locationAddress || prev.location.address,
            hours: pageData.locationHours || prev.location.hours,
            phone: pageData.locationPhone || prev.location.phone,
            email: pageData.locationEmail || prev.location.email,
            mapUrl: pageData.locationMapUrl || prev.location.mapUrl,
          };
        }

        // Map Signature items
        if (sigData && sigData.length > 0) {
          updated.signatures = sigData.map((item, idx) => {
            let imgUrl = '';
            try {
              imgUrl = item.image && item.image.asset ? urlFor(item.image).url() : '';
            } catch (e) {
              console.error("Error parsing Sanity image url:", e);
            }
            return {
              id: item._id || `sig-${idx}`,
              title: item.title,
              desc: item.desc,
              price: item.price,
              image: imgUrl || `/product_${(idx % 3) + 1}.jpg`,
              iconType: item.iconType || 'coffee'
            };
          });
        }

        // Map regular menu lists
        if (menuItems && menuItems.length > 0) {
          const categorized = { coffee: [], infusions: [], bakes: [] };
          menuItems.forEach(item => {
            if (categorized[item.category]) {
              categorized[item.category].push({
                name: item.name,
                price: item.price,
                desc: item.desc
              });
            }
          });
          updated.menu = {
            coffee: categorized.coffee.length > 0 ? categorized.coffee : prev.menu.coffee,
            infusions: categorized.infusions.length > 0 ? categorized.infusions : prev.menu.infusions,
            bakes: categorized.bakes.length > 0 ? categorized.bakes : prev.menu.bakes,
          };
        }

        return updated;
      });
    })
    .catch(err => console.error("Error loading Sanity database:", err));
  }, []);

  // Map icon strings to Lucide components
  const renderIcon = (type) => {
    switch (type) {
      case 'sparkles': return <Sparkles size={24} />;
      case 'droplet': return <Droplet size={24} />;
      case 'compass': return <Compass size={24} />;
      default: return <Coffee size={24} />;
    }
  };

  return (
    <>
      {/* Sanity Config Warning (Only shown on local development if not configured) */}
      {!isSanityConfigured() && process.env.NODE_ENV === 'development' && (
        <div style={{ background: '#7A5E35', color: '#F4EEE0', fontSize: '0.85rem', padding: '0.5rem', textAlign: 'center', zIndex: 10000, position: 'relative' }}>
          Sanity Headless CMS is currently unconfigured. Using baseline fallback data. Replace credentials inside <code>src/sanityClient.js</code>.
        </div>
      )}

      {/* Navigation */}
      <motion.nav 
        className={`header-nav glass-panel ${mobileMenuOpen ? 'mobile-open' : ''}`}
        initial={{ y: -50, opacity: 0, x: "-50%" }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <a href="#home" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img 
            src={logoImg} 
            alt="Ver.Cafe Logo" 
            style={{ 
              height: '2.5rem', 
              width: '2.5rem', 
              borderRadius: '50%', 
              objectFit: 'cover', 
              border: '1px solid var(--color-brown-light)',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }} 
          />
          Ver.Cafe <span>/ Roots</span>
        </a>

        <ul className="nav-links">
          <li><a href="#home" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
          <li><a href="#story" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Our Story</a></li>
          <li><a href="#menu" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Menu</a></li>
          <li><a href="#find-us" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Find Us</a></li>
        </ul>

        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </motion.nav>

      {/* Hero Section */}
      <section id="home">
        <div className="ambient-glow glow-1"></div>
        <div className="ambient-glow glow-2"></div>
        
        <div className="hero-container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="hero-tagline">
              {content.hero.tagline}
            </div>
            <h1>{content.hero.title}</h1>
            <p className="hero-description">
              {content.hero.description}
            </p>
            <div className="hero-ctas">
              <a href="#menu" className="btn-primary">
                Explore Menu <ArrowRight size={18} />
              </a>
              <a href="#story" className="btn-secondary">
                Our Story
              </a>
            </div>
          </motion.div>

          <motion.div 
            className="hero-image-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="hero-image-frame float-animation">
              <img 
                src={content.signatures[0]?.image || "/product_1.jpg"} 
                alt="Signature specialty coffee with warm ambient lighting" 
              />
              <motion.div 
                className="floating-badge glass-panel float-delayed-animation"
                whileHover={{ scale: 1.05 }}
              >
                <div className="badge-icon">
                  <Coffee size={24} />
                </div>
                <div className="badge-text">
                  <h4>100% Arabica</h4>
                  <p>Sourced from sustainable farms in Wayanad</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story (The Roots Section) */}
      <section id="story">
        <div className="story-container">
          <motion.div 
            className="story-images"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="story-img-card story-img-1 float-delayed-animation">
              <img src={content.signatures[1]?.image || "/product_2.jpg"} alt="Cafe Roots Signature Product - Cold Brew" />
            </div>
            <div className="story-img-card story-img-2 float-animation">
              <img src={content.signatures[2]?.image || "/product_3.jpg"} alt="Cafe Roots Signature Product - Affogato" />
            </div>
          </motion.div>

          <motion.div 
            className="story-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label">{content.story.label}</span>
            <h2>{content.story.title}<span>{content.story.titleItalic}</span></h2>
            <div className="story-text">
              <p>{content.story.paragraph1}</p>
              <div className="story-quote">
                {content.story.quote}
              </div>
              <p>{content.story.paragraph2}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Menu Highlight Section */}
      <section id="menu" className="menu-section">
        <div className="menu-container">
          <motion.div 
            className="menu-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label">Curated Menu</span>
            <h2>Sensory Flavors</h2>
            <p>Carefully selected beans, local spices, and fresh artisanal bakes.</p>
          </motion.div>

          {/* Signature Highlights */}
          <h3 className="signatures-title">Signature Creations</h3>
          <div className="signatures-grid">
            {content.signatures.map((item, idx) => (
              <motion.div 
                key={item.id} 
                className="signature-card glass-panel"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ 
                  y: -10, 
                  rotateX: 3, 
                  rotateY: -3,
                  boxShadow: "0 20px 40px rgba(42, 29, 24, 0.15)"
                }}
              >
                <div className="signature-badge">Signature</div>
                <div style={{ width: '100%', height: '200px', borderRadius: '15px', overflow: 'hidden', position: 'relative', border: '1px solid var(--glass-border)' }}>
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="sig-prod-img" />
                  <div style={{ position: 'absolute', bottom: '0.75rem', right: '0.75rem', background: 'var(--color-cream-bg)', color: 'var(--color-sage)', borderRadius: '50%', width: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center', justify: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                    {renderIcon(item.iconType)}
                  </div>
                </div>
                <div className="signature-info" style={{ width: '100%', textAlign: 'left', marginTop: '0.5rem' }}>
                  <h3>{item.title}</h3>
                  <p style={{ minHeight: '3.5rem', fontSize: '0.95rem' }}>{item.desc}</p>
                  <div className="signature-price">{item.price}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Menu Selection Tabs */}
          <div className="menu-tabs">
            <button 
              className={`menu-tab-btn ${activeMenuTab === 'coffee' ? 'active' : ''}`}
              onClick={() => setActiveMenuTab('coffee')}
            >
              Specialty Coffee
            </button>
            <button 
              className={`menu-tab-btn ${activeMenuTab === 'infusions' ? 'active' : ''}`}
              onClick={() => setActiveMenuTab('infusions')}
            >
              Local Infusions
            </button>
            <button 
              className={`menu-tab-btn ${activeMenuTab === 'bakes' ? 'active' : ''}`}
              onClick={() => setActiveMenuTab('bakes')}
            >
              Artisanal Bakes
            </button>
          </div>

          {/* Regular Menu Grid */}
          <motion.div 
            className="menu-grid"
            key={activeMenuTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {content.menu[activeMenuTab].map((item, index) => (
              <div className="menu-item" key={index}>
                <div className="menu-item-details">
                  <h4>{item.name}</h4>
                  <p>{item.desc}</p>
                </div>
                <div className="menu-item-price">{item.price}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Location & Timings Section */}
      <section id="find-us">
        <div className="ambient-glow glow-1"></div>
        <div className="location-container">
          <motion.div 
            className="location-details"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label">Find Us</span>
            <h2>Come Gather Around the Roots</h2>
            
            <div className="location-info-block">
              <div className="location-icon-wrapper">
                <MapPin size={24} />
              </div>
              <div className="location-info-text">
                <h3>Our Sanctuary</h3>
                <p style={{ whiteSpace: 'pre-line' }}>{content.location.address}</p>
              </div>
            </div>

            <div className="location-info-block">
              <div className="location-icon-wrapper">
                <Clock size={24} />
              </div>
              <div className="location-info-text">
                <h3>Hours of Solace</h3>
                <p style={{ whiteSpace: 'pre-line' }}>{content.location.hours}</p>
              </div>
            </div>

            <div className="location-info-block">
              <div className="location-icon-wrapper">
                <Phone size={24} />
              </div>
              <div className="location-info-text">
                <h3>Say Hello</h3>
                <p>{content.location.phone}<br />{content.location.email}</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="map-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <iframe 
              title="Ver.Cafe Roots Thrissur Location Map"
              src={content.location.mapUrl} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-container">
          <div className="footer-about">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <img 
                src={logoImg} 
                alt="Ver.Cafe Logo" 
                style={{ 
                  height: '3.5rem', 
                  width: '3.5rem', 
                  borderRadius: '50%', 
                  objectFit: 'cover', 
                  border: '1px solid rgba(250, 247, 240, 0.2)' 
                }} 
              />
              <h2 style={{ margin: 0 }}>Ver.Cafe <span style={{ color: 'var(--color-sage-light)' }}>/ Roots</span></h2>
            </div>
            <p>An anti-gravity design sanctuary celebrating the deep organic flavor roots of Kerala. Speciality coffees, handpicked local spices, and fresh warm bakes.</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <a href="https://instagram.com" target="_blank" aria-label="Instagram" style={{ color: 'var(--color-sage-light)' }}><Instagram size={20} /></a>
              <a href="https://facebook.com" target="_blank" aria-label="Facebook" style={{ color: 'var(--color-sage-light)' }}><Facebook size={20} /></a>
            </div>
          </div>

          <div className="footer-links-col">
            <h3>Explore</h3>
            <ul className="footer-links">
              <li><a href="#home" className="footer-link">Home</a></li>
              <li><a href="#story" className="footer-link">Our Story</a></li>
              <li><a href="#menu" className="footer-link">Curated Menu</a></li>
              <li><a href="#find-us" className="footer-link">Find Us</a></li>
            </ul>
          </div>

          <div className="footer-contact-col">
            <h3>Newsletter</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '1rem', opacity: 0.8 }}>Subscribe to hear about new single origins and seasonal menu updates.</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="email" 
                placeholder="Your email address" 
                style={{ 
                  padding: '0.75rem 1rem', 
                  borderRadius: '30px', 
                  border: '1px solid rgba(250, 247, 240, 0.2)', 
                  background: 'rgba(250, 247, 240, 0.05)', 
                  color: 'white',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  width: '100%'
                }} 
              />
              <button 
                style={{ 
                  background: 'var(--color-sage)', 
                  border: 'none', 
                  borderRadius: '50%', 
                  width: '2.75rem', 
                  height: '2.75rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--color-brown-deep)'
                }}
                aria-label="Subscribe"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Ver.Cafe - Roots. All rights reserved.</p>
          <p>Crafted in Thrissur, Kerala</p>
        </div>
      </footer>
    </>
  );
}

export default App;
