import { useEffect, useState } from 'react'
import ScrollIndicator from './ScrollIndicator'

export default function Overlay() {
  return (
    <>
      {/* Fixed UI Overlays */}
      <div className="fixed-ui top-left">
        <div className="name-cn">Samir Nepal समिर</div>
        <div className="role">Learner, Founder</div>
      </div>
      
      <div className="fixed-ui top-right">
        <a href="https://github.com/samir7-7" target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>

      <div className="fixed-ui bottom-left">
        CODE &nbsp;&nbsp; ART &nbsp;&nbsp; PLAY
      </div>

      <div className="fixed-ui right-middle">
        <div className="rotated-text">BORN IN 2003</div>
      </div>

      <div className="scroll-container">
        {/* Section 1 — Hero Redesign */}
        <section className="section section-hero-custom" id="section-hero">
          <div className="hero-content">
            <h1 className="hero-title-brush">About Samir</h1>
            <p className="hero-text-cursive">
              I'm Samir - a creative technologist living where code meets art. I spend my days around coding, creativity,<br/>
              playful interaction & design, and CG work. I love studying and combining skills across different fields — to<br/>
              create, and to explore more possibilities.
            </p>
            <div className="scroll-prompt">
              SCROLL
              <div className="scroll-line"></div>
            </div>
          </div>
        </section>

        {/* Unified Continuous Timeline */}
        <div className="unified-timeline-container">
          <h2 className="resume-title" style={{ paddingLeft: '1.5rem', marginBottom: '3rem' }}>Résumé</h2>
          
          <div className="resume-timeline">
            
            {/* 1. Education (Corresponds to old Section 2) */}
            <div className="resume-item timeline-spacing">
              <div className="resume-date">
                <span className="dot"></span> Present
              </div>
              <div className="resume-entry-card">
                <div className="resume-company-row">
                  <div className="resume-logo"><img src="/logos/itahari.png" alt="" /></div>
                  <div className="resume-school">Itahari International College</div>
                </div>
                <div className="resume-degree">BSc (Hons) Computing</div>
              </div>
              
              <div className="resume-date" style={{ marginTop: '1.5rem' }}>
                <span className="dot" style={{ backgroundColor: 'rgba(255,255,255,0.3)', boxShadow: 'none' }}></span> 2022
              </div>
              <div className="resume-entry-card">
                <div className="resume-company-row">
                  <div className="resume-logo"><img src="/logos/siddhartha.png" alt="" /></div>
                  <div className="resume-school">Siddhartha Boarding Secondary School, Damak</div>
                </div>
                <div className="resume-degree">XII (NEB) | GPA: 3.49</div>
              </div>
            </div>

            {/* 2. Experience */}
            <div className="resume-item timeline-spacing">
              {/* Intern */}
              <div className="resume-date">
                <span className="dot"></span> 2025 – 2026
              </div>
              <div className="resume-entry-card">
                <div className="resume-company-row">
                  <div className="resume-logo"><img src="/logos/itahari.png" alt="" /></div>
                  <div className="resume-school">Itahari International College</div>
                </div>
                <div className="resume-degree">Intern, Business Department</div>
                <ul className="resume-bullets">
                  <li>Supported the admissions process, directly contributing to enrolling 15+ students.</li>
                  <li>Engaged prospective students and families at the front desk, increasing walk-in inquiry volume.</li>
                </ul>
              </div>

              {/* StAR */}
              <div className="resume-date" style={{ marginTop: '2.5rem' }}>
                <span className="dot" style={{ backgroundColor: 'rgba(255,255,255,0.3)', boxShadow: 'none' }}></span> 2024 – 2025
              </div>
              <div className="resume-entry-card">
                <div className="resume-company-row">
                  <div className="resume-logo"><img src="/logos/itahari.png" alt="" /></div>
                  <div className="resume-school">Itahari International College</div>
                </div>
                <div className="resume-degree">Student Academic Representative (StAR)</div>
                <ul className="resume-bullets">
                  <li>Represented and advocated for a cohort of 90 students, communicating academic concerns to faculty.</li>
                </ul>
              </div>
              
              {/* PERN Intern */}
              <div className="resume-date" style={{ marginTop: '2.5rem' }}>
                <span className="dot" style={{ backgroundColor: 'rgba(255,255,255,0.3)', boxShadow: 'none' }}></span> 2026
              </div>
              <div className="resume-entry-card">
                <div className="resume-company-row">
                  <div className="resume-logo"><img src="/logos/clove.png" alt="" /></div>
                  <div className="resume-school">Clove IT pvt. ltd.</div>
                </div>
                <div className="resume-degree">PERN Intern</div>
                <ul className="resume-bullets">
                  <li>Completed a PERN Stack Developer Internship at Clove I.T. Pvt. Ltd., gaining hands-on experience with PostgreSQL, Express.js, React.js, and Node.js, along with RESTful APIs, authentication, testing, and debugging.</li>
                </ul>
              </div>
            </div>

            {/* 4. Sigmoit (Corresponds to old Section 4) */}
            <div className="resume-item timeline-spacing">
              <div className="resume-date">
                <span className="dot"></span> 2025 – Present
              </div>
              <div className="resume-entry-card">
                <div className="resume-company-row">
                  <div className="resume-logo"><img src="/logos/sigmoit.png" alt="" /></div>
                  <div className="resume-school">Sigmoit</div>
                </div>
                <div className="resume-degree">Founder, CEO</div>
                <p style={{ 
                  fontSize: '0.95rem', 
                  color: 'rgba(255,255,255,0.85)', 
                  lineHeight: '1.7',
                  marginTop: '1rem',
                  marginBottom: '1.5rem',
                  maxWidth: '500px'
                }}>
                  We believe technology should not only work flawlessly but also feel personal, inspiring trust and confidence in every interaction. Over the years, we've built lasting partnerships across diverse sectors.
                </p>
                <a href="https://www.sigmoit.dev/" target="_blank" rel="noreferrer" className="visit-btn" style={{ padding: '0.5rem 1.5rem', fontSize: '0.75rem' }}>
                  Visit site
                </a>
              </div>
            </div>

            {/* 5. Projects (Corresponds to old Section 5) */}
            <div className="resume-item timeline-spacing">
              <div className="resume-category" style={{ marginBottom: '1.5rem', color: '#d8c3a5' }}>
                Selected Works
              </div>
              <div className="resume-date">
                <span className="dot"></span> 2026 – Present
              </div>
              <div className="resume-entry-card">
                <div className="resume-company-row">
                  <div className="resume-logo"><img src="/logos/lekhakar.png" alt="" /></div>
                  <div className="resume-school">Lekhakar</div>
                </div>
                <div className="resume-degree">Founder</div>
                <p style={{ 
                  fontSize: '0.95rem', 
                  color: 'rgba(255,255,255,0.85)', 
                  lineHeight: '1.7',
                  marginTop: '0.5rem',
                  marginBottom: '1.5rem',
                  maxWidth: '500px'
                }}>
                  A mobile application for recording and managing daily transactions. Its business account features include point of sale (POS), inventory management, udharo (credit) tracking, and party transaction records.
                </p>
              </div>
              
              <div className="resume-date">
                <span className="dot" style={{ backgroundColor: 'rgba(255,255,255,0.3)', boxShadow: 'none' }}></span> 2026 – Present
              </div>
              <div className="resume-entry-card">
                <div className="resume-company-row">
                  <div className="resume-logo"><img src="/logos/moment.png" alt="" /></div>
                  <div className="resume-school">Moment</div>
                </div>
                <div className="resume-degree">Founder</div>
                <p style={{ 
                  fontSize: '0.95rem', 
                  color: 'rgba(255,255,255,0.85)', 
                  lineHeight: '1.7',
                  marginTop: '0.5rem',
                  marginBottom: '0',
                  maxWidth: '500px'
                }}>
                  An anti-social media application that encourages users to capture and share what is happening around them. Users can post through an in-app camera to a shared gallery accessible to everyone. Each moment displays only the poster's name and location, with no messaging or contact features, keeping the focus on the experience rather than social interaction.
                </p>
              </div>
            </div>

            {/* 6. Tools and Technology */}
            <div className="resume-item timeline-spacing">
              <div className="resume-category" style={{ marginBottom: '1.5rem', color: '#d8c3a5' }}>
                Tools & Technology
              </div>
              <div className="resume-entry-card">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', maxWidth: '500px' }}>
                  {['Javascript', 'React', 'Git', 'Docker', 'Postgres'].map(tech => (
                    <span key={tech} style={{
                      padding: '0.4rem 1rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      color: 'rgba(255, 255, 255, 0.9)'
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 7. Socials */}
            <div className="resume-item" style={{ marginBottom: '20vh' }}>
              <div className="resume-category" style={{ marginBottom: '0.5rem', color: '#d8c3a5' }}>
                Socials
              </div>
              <div className="resume-entry-card">
                <div className="resume-degree" style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Let's Connect</div>
                
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  {/* LinkedIn */}
                  <a href="https://www.linkedin.com/in/samirnepal/" target="_blank" rel="noreferrer" className="social-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                  {/* Github */}
                  <a href="https://github.com/samirnepal" target="_blank" rel="noreferrer" className="social-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  </a>
                  {/* Instagram */}
                  <a href="https://www.instagram.com/samirnepall/" target="_blank" rel="noreferrer" className="social-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <ScrollIndicator />
    </>
  )
}
