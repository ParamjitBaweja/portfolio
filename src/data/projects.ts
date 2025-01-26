export interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  images: string[];
  bullets: string[];
  brag: string;
  role?: string;
  impact?: string;
  media?: { type: 'image' | 'video'; url: string; caption?: string }[];
  externalLink?: string;
}

export const projectsData: Project[] = [
  {
    id: 'aethon-robot',
    title: "Hospital Logistics Robot - Aethon",
    year: "2024",
    description: "Developed navigation systems for autonomous hospital logistics robots at Aethon, improving healthcare efficiency.",
    images: ["/assets/images/aethon-robot.jpg"],
    bullets: [
      "Developed navigation systems for autonomous hospital robots",
      "Implemented efficient path planning algorithms",
      "Integrated with hospital infrastructure"
    ],
    brag: "Successfully improved delivery efficiency by 40% across multiple hospitals",
    role: "As a Robotics Engineer at Aethon, I led the development of the navigation system for the TUG autonomous mobile robot. My responsibilities included implementing and optimizing path planning algorithms, developing obstacle avoidance strategies, and ensuring seamless integration with hospital infrastructure. I worked closely with the software team to improve the robot's performance in dynamic environments.",
    impact: "The project significantly improved hospital logistics efficiency by automating the delivery of medications, supplies, and meals. This reduced the workload on healthcare staff, allowing them to focus more on patient care. The system has been successfully deployed in multiple hospitals across the United States, demonstrating its reliability and effectiveness.",
    media: [
      {
        type: 'image',
        url: '/assets/images/aethon-robot.jpg',
        caption: 'TUG Robot navigating hospital corridor'
      },
      {
        type: 'video',
        url: '/assets/videos/aethon-demo.mp4',
        caption: 'TUG Robot demonstration'
      }
    ],
    externalLink: "https://aethon.com/tug/"
  },
  {
    id: 'knee-surgery',
    title: "Robotic Knee Surgery Assistant",
    year: "2023-2024",
    description: "Led the development of precision control systems for robotic knee surgery assistance at CMU.",
    images: ["/assets/images/knee-surgery.jpg"],
    bullets: [
      "Developed precision control systems for surgical robotics",
      "Implemented safety protocols and redundancy checks",
      "Created surgeon-robot interaction interface"
    ],
    brag: "Achieved sub-millimeter precision in surgical tool positioning",
    role: "As a Research Assistant at CMU's Biorobotics Lab, I was responsible for developing the control system for the robotic surgical assistant. This involved implementing precise motion control algorithms, designing safety protocols, and creating an intuitive interface for surgeon interaction. I also collaborated with medical professionals to ensure the system met clinical requirements.",
    impact: "The robotic assistant has the potential to significantly improve the accuracy and consistency of knee replacement surgeries. By providing precise tool positioning and real-time guidance, it helps surgeons achieve better outcomes. Early trials have shown promising results in terms of reduced operation time and improved accuracy.",
    media: [
      {
        type: 'image',
        url: '/assets/images/knee-surgery.jpg',
        caption: 'Robotic surgical assistant in action'
      },
      {
        type: 'image',
        url: '/assets/images/knee-surgery-interface.jpg',
        caption: 'Surgeon interface display'
      }
    ],
    externalLink: "https://biorobotics.ri.cmu.edu/"
  }
  // ... Add similar detailed data for other projects
];

export default projectsData; 