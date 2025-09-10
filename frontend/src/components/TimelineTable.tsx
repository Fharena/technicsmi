import React from 'react';
import './TimelineTable.css';

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineTableProps {
  items: TimelineItem[];
  className?: string;
}

const TimelineTable: React.FC<TimelineTableProps> = ({ items, className = '' }) => {
  return (
    <section className={`timeline-table-section ${className}`}>
      <div className="timeline-table-container">
        <div className="timeline-table">
          {items.map((item, index) => (
            <div key={index} className="timeline-table-row">
              <div className="timeline-table-cell year">{item.year}</div>
              <div className="timeline-table-cell content">{item.title}</div>
              <div className="timeline-table-cell content">{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineTable;
