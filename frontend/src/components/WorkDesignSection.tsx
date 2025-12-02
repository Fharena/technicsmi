import React from 'react';
import '../styles/work.css';

const WorkDesignSection: React.FC = () => {
  return (
    <div className="work-design-section">
      <div className="design-content">
        <div className="design-title-container">
          <div className="title-top">
            <h2 className="design-title-line">DESIGNING</h2>
            <h2 className="design-title-line">FABRICS WITH</h2>
          </div>
          <div className="title-bottom">
            <div className="title-image">
              <img 
                src="/홈페이지 소스정리/work/5.png" 
                alt="Fabric Swatches" 
                className="fabric-image"
              />
            </div>
            <div className="title-right">
              <h2 className="design-title-line">PURPOSE +</h2>
              <h2 className="design-title-line">PRECISION</h2>
            </div>
          </div>
          <div className="design-text-container">
            <p className="design-paragraph">
              Every fabric we create begins with a clear purpose — to solve real needs, elevate design, and endure over time. 
              We don't just produce textiles; we craft them with intent, ensuring that every thread serves both function and meaning.
            </p>
            <p className="design-paragraph">
              Precision is embedded in our process — from fiber selection to final weave, every detail is carefully considered.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkDesignSection;

