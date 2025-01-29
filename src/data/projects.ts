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
    id: 'knee-surgery',
    title: "Robotic Knee Surgery Assistant",
    year: "August 2023 - December 2024",
    description: "Explored the elimination of fiducial markers in robotic knee surgery using consumer-grade cameras and a custom-designed drill.",
    images: ["/assets/images/knee-surgery.jpg"],
    bullets: [
      "Achieved an accuracy of 2 mm and 2 degrees, utilizing consumer-grade RealSense cameras and an off-the-shelf drill mounted on a custom 3D-printed end effector, effectively eliminating invasive fiducial trackers.",
      "Implemented OMPL-constrained planning for predictable manipulator motion and integrated it into a hybrid planning architecture with a local planner performing real-time validity checks during execution. ",
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
        url: '/assets/images/knee-surgery.jpg',
        caption: 'Robotic surgical assistant in action'
      },
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
    externalLink: "https://mrsdprojects.ri.cmu.edu/2024teame/"
  },
  {
    id: 'aethon-robot',
    title: "Hospital Logistics Robot - Aethon",
    year: "May 2024 - August 2024",
    description: "Developed navigation systems for autonomous hospital logistics robots at Aethon, improving healthcare efficiency.",
    images: ["/assets/images/aethon-robot.png"],
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
    externalLink: "https://aethon.com/"
  },
  {
    id: 'medical-image',
    title: "Medical Image Analysis",
    year: "August 2021 - December 2021",
    description: "Semantic segmentation of fundus images for the lab working on smartphone-based analysis of Fundus images to diagnose cardiac health.",
    images: ["/assets/images/Fundus.jpg"],
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
  },
  {
    id: 'MIS',
    title: "Robotic Minimally Invasive Surgery Assistant",
    year: "August 2021 - December 2021",
    description: "Semantic segmentation of fundus images for the lab working on smartphone-based analysis of Fundus images to diagnose cardiac health.",
    images: ["/assets/images/dvrk.jpg"],
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
  },
  {
    id: 'underwater-robot',
    title: "AUV Navigation",
    year: "2021",
    description: "Semantic segmentation of fundus images for the lab working on smartphone-based analysis of Fundus images to diagnose cardiac health.",
    images: ["/assets/images/nio-bot.png"],
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
  },
  {
    id: 'multi-robot',
    title: "Multi-Robot Systems Research",
    year: "2021",
    description: "Introduction to research: developed innovative motion planning algorithms for multi-robot systems, later enhancing it with blockchain technology for an iROS workshop presentation.",
    images: ["/assets/images/IROS.jpg"],
    bullets: [
      "Developed precision control systems for surgical robotics",
      "Implemented safety protocols and redundancy checks",
      "Created surgeon-robot interaction interface"
    ],
    brag: "Developed innovative motion planning algorithms for multi-robot systems",
    role: "As a Research Assistant at CMU's Biorobotics Lab, I was responsible for developing the control system for the robotic surgical assistant. This involved implementing precise motion control algorithms, designing safety protocols, and creating an intuitive interface for surgeon interaction. I also collaborated with medical professionals to ensure the system met clinical requirements.",
    impact: "The robotic assistant has the potential to significantly improve the accuracy and consistency of knee replacement surgeries. By providing precise tool positioning and real-time guidance, it helps surgeons achieve better outcomes. Early trials have shown promising results in terms of reduced operation time and improved accuracy.",
    media: [
      {
        type: 'image',
        url: '/assets/images/knee-surgery.jpg',
        caption: 'Robotic surgical assistant in action'
      },
    ],
    externalLink: "https://biorobotics.ri.cmu.edu/"
  },
  {
    id: 'formula',
    title: "Driverless Autonomy Stack",
    year: "2019 - 2022",
    description: "Started exploring robotics with driverless car development, laying the foundation for my passion in autonomous systems.",
    images: ["/assets/images/formula.jpeg"],
    bullets: [
      "Developed precision control systems for surgical robotics",
      "Implemented safety protocols and redundancy checks",
      "Created surgeon-robot interaction interface"
    ],
    brag: "Developed precision control systems for surgical robotics",
    role: "As a Research Assistant at CMU's Biorobotics Lab, I was responsible for developing the control system for the robotic surgical assistant. This involved implementing precise motion control algorithms, designing safety protocols, and creating an intuitive interface for surgeon interaction. I also collaborated with medical professionals to ensure the system met clinical requirements.",
    impact: "The robotic assistant has the potential to significantly improve the accuracy and consistency of knee replacement surgeries. By providing precise tool positioning and real-time guidance, it helps surgeons achieve better outcomes. Early trials have shown promising results in terms of reduced operation time and improved accuracy.",
    media: [
      {
        type: 'image',
        url: '/assets/images/knee-surgery.jpg',
        caption: 'Robotic surgical assistant in action'
      },
    ],
  }
];

export default projectsData; 