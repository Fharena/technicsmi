import React from 'react';

const ContactForm: React.FC = () => {
  return (
    <div className="contact-form-section">
      <div className="contact-form-container">
        <form className="contact-form">
          <div className="form-group">
            <input type="text" placeholder="Your name" className="form-input" />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Your email" className="form-input" />
          </div>
          <div className="form-group">
            <textarea 
              placeholder="Your message" 
              className="form-textarea" 
              rows={1}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = '1.5em';
                target.style.height = Math.max(target.scrollHeight, 36) + 'px';
              }}
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
