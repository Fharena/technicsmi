import React from 'react';
import TimelineTable from './TimelineTable';
import type { TimelineItem } from './TimelineTable';

const ArchiveTimelineSection: React.FC = () => {
  // 통합 타임라인 데이터 - 아카이브 1~8 링크
  const timelineData: TimelineItem[] = [
    { 
      year: "2025", 
      title: "Delivery box", 
      description: "Designing a shipping box that reflects Technics' brand values and material philosophy",
      link: "/archive1"
    },
    { 
      year: "2025", 
      title: "ID Card", 
      description: "To design an internal ID system that embodies Technics' design philosophy: clarity, hierarchy, structure",
      link: "/archive2"
    },
    { 
      year: "2025", 
      title: "QC Check label", 
      description: "Enhancing product traceability and internal workflow through structured labeling",
      link: "/archive3"
    },
    { 
      year: "2025", 
      title: "History of fabric", 
      description: "The history of wool",
      link: "/archive4"
    },
    { 
      year: "2025", 
      title: "Fabric color", 
      description: "To build a foundational color archive that reflects Technics' design principles",
      link: "/archive5"
    },
    { 
      year: "2025", 
      title: "Technics introduction video", 
      description: "To document and communicate the precision-driven process behind Technics fabrics — in both product and presentation.",
      link: "/archive6"
    },
    { 
      year: "2025", 
      title: "Sensation in the hands", 
      description: "To explore how gesture, touch, and texture can communicate meaning beyond language.",
      link: "/archive7"
    },
    { 
      year: "2025", 
      title: "A quest for detail", 
      description: "To articulate Technics core visual philosophy through an editorial study of micro-detail",
      link: "/archive8"
    }
  ];

  return <TimelineTable items={timelineData} />;
};

export default ArchiveTimelineSection;
