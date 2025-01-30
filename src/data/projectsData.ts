export interface ProjectMedia {
  type: 'image' | 'video';
  url: string;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  shortDescription?: string;
  images: string[];
  bullets: string[];
  brag: string;
  role?: string;
  impact?: string;
  media?: ProjectMedia[];
  externalLink?: string;
  technologies: string[];
}

export interface TimelinePeriod {
  year: string;
  title: string;
  description: string;
  projectIds: string[];
}

export const timelineData: TimelinePeriod[] = [
  {
    year: "August 2023 - December 2024",
    title: "CMU x Smith & Nephew",
    description: "MRSD Capstone Project: Autonomous Robotic Assist for Total Knee Replacement Surgeries ",
    projectIds: ["knee-surgery"]
  },
  {
    year: "May 2024 - August 2024",
    title: "ST Engineering, Aethon",
    description: "Motion forecasting of environmental agents using classical methods in hospital environments. This avoids using camera feeds to protect privacy, and works with older robots that do not have GPUs.",
    projectIds: ["aethon-robot"]
  },
  {
    year: "August 2021 - December 2021",
    title: "Manipal Institute of Technology",
    description: "Semantic segmentation of fundus images for the lab working on smartphone-based analysis of Fundus images to diagnose cardiac health.",
    projectIds: ["medical-image"]
  },
  {
    year: "May 2022 - August 2022",
    title: "University of Toronto x SickKids",
    description: "Advancement of surgical subtask autonomy using the da Vinci Research Kit (dVRK), in collaboration with surgeons at The Hospital for Sick Children (SickKids), Toronto.",
    projectIds: ["MIS"]
  },
  {
    year: "January 2021 - March 2022",
    title: "CSIR - National Institute of Oceanography",
    description: "Novel underwater docking protocol for an autonomous coral reef monitoring robot.",
    projectIds: ["underwater-robot"]
  },
  {
    year: "2021",
    title: "Multi-Robot Systems Research",
    description: "My introduction to research: worked on an Improved Partical Swarm Optimization based motion planning algorithm for multi-robot systems, later enhanced it with blockchain technology for the iROS workshop: Blockchain in robotics and AI",
    projectIds: ["multi-robot"]
  },
  {
    year: "October2019 - February 2022",
    title: "Formula Manipal x Manipal Institute of Technology",
    description: "Started exploring robotics with driverless car development, laying the foundation for my passion in autonomous systems. Part of the founding team that worked on the first iteration of the driverless software for Formula Manipal.",
    projectIds: ["formula"]
  }
];
