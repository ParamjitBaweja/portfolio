export interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  longDescription?: string;
  images: string[];
  bullets: string[];
  brag: string;
  role?: string;
  impact?: string;
  media?: { type: 'image' | 'video'; url: string; caption?: string }[];
  externalLink?: string;
  additionalLinkName?: string;
  additionalLink?: string;
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
    role: "I designed a custom 3D printed end effector with a RealSense camera, and a drill mounted on it. Through repeated intrinsic and extrinsic camera calibration and developing an auto-calibration routine for the external camera, ensuring robust patient registration, I reduced calibration error from 12 mm to under 2 mm. The registration achieved near perfect theoretical accuracy using DINO + SAM for global registration and ICP for local refinement. Additionally, I worked on OMPL-constrained planning for predictable manipulator motion and integrated it into a hybrid control scheme with a local planner, effectively handling velocity shocks during execution",
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
    role: "I developed environmental motion forecasting for hospital AMRs using point cloud-based, sensor-agnostic methods. To allow the software to run on older robot models deployed in the field, I created a CPU-only algorithm that utilizes AMCL localization, ICP alignment, and density-based clustering for object tracking and prediction via Hungarian algorithm and particle filtering, optimized for older robot models. The system proved highly effective, achieving 90% accuracy in 20 real-robot tests, successfully predicting motion up to 6 meters ahead.",
    impact: "The project significantly improved hospital logistics efficiency by automating the delivery of medications, supplies, and meals. This reduced the workload on healthcare staff, allowing them to focus more on patient care. The system has been successfully deployed in multiple hospitals across the United States, demonstrating its reliability and effectiveness.",
    media: [
      {
        type: 'image',
        url: '/assets/images/aethon0.jpg',
        caption: 'Obstaclaw'
      },
      {
        type: 'video',
        url: '/assets/images/aethon1.mp4',
        caption: 'Result demonstration'
      },
      {
        type: 'video',
        url: '/assets/images/aethon2.mp4',
        caption: 'Result demonstration'
      },
      {
        type: 'image',
        url: '/assets/images/aethon1.jpg',
        caption: 'The problem'
      },
      {
        type: 'image',
        url: '/assets/images/aethon2.jpg',
        caption: 'why the problem exists'
      },
      {
        type: 'image',
        url: '/assets/images/aethon3.jpg',
        caption: 'Solution'
      }
    ],
    externalLink: "https://aethon.com/"
  },
  {
    id: 'medical-image',
    title: "Medical Image Analysis",
    year: "August 2021 - December 2021",
    description: "Semantic segmentation of fundus images for the lab working on smartphone-based analysis of Fundus images to diagnose cardiac health.",
    longDescription: "Dr. Harish Kumar J.R.'s lab has a lot of work on fundus image analysis. There are multiple researchers working on things like Glaucoma detection, Diabetic Retinopathy detection, and Oximetry. An important component for any of these is the vessel segmentation of the fundus images. I worked with a fellow researcher, V. Manushree on this. \n Title: EFFICIENT LEARNING WITH LESS DATA FOR VESSEL EXTRACTION AND CLASSIFICATION IN SINGLE-WAVELENGTH FUNDUS IMAGES \n Paramjit Singh Baweja, V. Manushree, J.R. Harish Kumar.",
    images: ["/assets/images/Fundus.jpg"],
    bullets: [
      "Developed precision control systems for surgical robotics",
      "Implemented safety protocols and redundancy checks",
      "Created surgeon-robot interaction interface"
    ],
    brag: "Received an undergraduate research grant from Manipal Academy of Higher Education of INR 10000 for GPU compute.",
    role: "I implemented a data augmentation approach that mimicked human behavior through Spatial Pyramid Mapping and Super Resolution while working with fundus images. This approach led to a 6% increase in accuracy for multiclass segmentation, despite having only 92 data points. Additionally, we generated pseudo-labels to perform semi-supervised binary classification using an EfficientNetb0-based U-Net model. This technique proved successful, achieving an F1 score of 0.74 and marking a 4.9% improvement in F1 score for vessel extraction.",
    impact: "The eye is the only part of the body where you can directly see live tissue. Looking at the fundus, you can see blood vessels which not only give you information about the health of the eye, but also about cardiac health. Traditionally, fundus images are taken with expensive dual wavelength cameras, which are not accessible to large parts of the world. This lab is builing on the work by Google's where they collected smartphone based fundus images from 1000s of people in various demographics, but ran into issues due to things like lighting and camera stbility, which limited the usability of the data. This lab, is working on building a frame that you can mount a smartphone on, and then use the camera to take fundus images.",
    media: [
      {
        type: 'image',
        url: '/assets/images/Fundus1.jpg',
        caption: 'Pipeline for fundus image analysis'
      },
      {
        type: 'image',
        url: '/assets/images/Fundus.jpg',
        caption: 'Results'
      }
    ],
    // externalLink: " "
  },
  {
    id: 'MIS',
    title: "Robotic Minimally Invasive Surgery Assistant",
    year: "August 2021 - December 2021",
    description: " ",
    longDescription: "This work focuses on a shared autonomy framework for robotic surgical systems, specifically focusing on pattern cutting tasks using the da Vinci Research Kit (dVRK) on thin elastic materials. We developed a motion generator that allows real-time user adjustments to pre-planned trajectories, addressing challenges like material deformation during cutting. Their approach achieved a 100% success rate in circular cutting tasks on gauze, with improved precision and efficiency compared to previous methods. The framework was tested on materials with varying elasticity and demonstrated robustness across different patterns.",
    images: ["/assets/images/dvrk.jpg"],
    bullets: [
      ""
    ],
    brag: " ",
    role: "I designed a novel motion generator with trajectory generation and tracking capabilities, utilizing time-optimal path planning. This approach used a shared-autonomy based motion planning strategy for tissue-like materials. The Method created FLS circle-cutting 12x faster than the manual proficiency time, demonstrating significant improvement in efficiency.",
    impact: "This work enhances the precision and reliability of robotic-assisted minimally invasive surgeries (MIS), reducing human errors caused by fatigue or monotony. It outperforms existing autonomous systems in terms of success rates, error reduction, and task completion time. Additionally, the modularity of the framework suggests potential applications beyond pattern cutting, such as suturing or cauterizing, making it a valuable step toward advancing surgical robotics.",
    media: [
      {
        type: 'image',
        url: '/assets/images/dvrk.jpg',
        caption: 'The robot'
      },
      {
        type: 'video',
        url: '/assets/images/dvrk1.mp4',
        caption: 'Circle cutting on deformable material'
      }
    ],
    externalLink: "https://medcvr.utm.utoronto.ca",
    additionalLinkName: "Paper Link",
    additionalLink: "https://ieeexplore.ieee.org/document/10130201"
  },
  {
    id: 'underwater-robot',
    title: "AUV Navigation",
    year: "2021",
    description: " ",
    longDescription: "This work focuses on developing an acoustic-based docking system for the Coral Reef Monitoring Robot (C-Bot), an autonomous underwater vehicle (AUV) designed for long-term coral reef monitoring. The proposed system uses a 2D imaging sonar as the primary sensor, which is robust to poor lighting and visibility conditions commonly encountered underwater. This approach reduces the need for multiple sensors, simplifying the docking process while maintaining accuracy. The docking algorithm was tested in simulations, demonstrating its ability to guide the C-Bot to a stationary dock even under various noise conditions..",
    images: ["/assets/images/nio-bot.png"],
    bullets: [
      " ",
    ],
    brag: "STORY: Initially, I thought this was a theoretical thought experiment, and lost touch with the project. In the summer of 2024, my sister interned with the institute, where she ran into a team working on actually inculcating this tech into their robot.",
    role: "I developed a QT-based interface for low-bandwidth (200 b/s) serial communication between the Coral Reef Monitoring and Surveillance Robot (CBOT) and ground station, capable of lossless image transfer, to facilitate monitoring of marine life. \n Additionally, I built a novel planar imaging sonar-based docking system replacing traditional systems for navigation and homing of an AUV, enabling functioning under low-visibility conditions. I did this by incorporating shape-fitting on the point cloud for outlier removal and used the robot's motion for 3D reconstruction.",
    impact: "This work addresses key challenges in underwater docking, such as environmental constraints and sensor noise, enabling sustainable long-term AUV operations. By improving docking reliability, the system supports extended missions, allowing the C-Bot to recharge and offload data autonomously. This advancement has implications for marine research and conservation, particularly in monitoring delicate ecosystems like coral reefs over extended periods.",
    media: [
      {
        type: 'video',
        url: '/assets/images/nio1.mp4',
        caption: 'The robot docking'
      },
      {
        type: 'image',
        url: '/assets/images/nio2.jpg',
        caption: 'Docking Steps'
      },
      {
        type: 'video',
        url: '/assets/images/nio2.mp4',
        caption: 'Simulation environment'
      },
      {
        type: 'image',
        url: '/assets/images/nio-bot.png',
        caption: 'The robot'
      },
      {
        type: 'image',
        url: '/assets/images/nio3.jpg',
        caption: 'Errors'
      },
      {
        type: 'image',
        url: '/assets/images/nio4.jpg',
        caption: 'Sensor view'
      },
    ],
    externalLink: "https://www.nio.res.in/",
    additionalLinkName: "Paper Link",
    additionalLink: "https://ieeexplore.ieee.org/document/9775514"
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
    externalLink: "http://blockchaininroboticsandai.org/"
  },
  {
    id: 'formula',
    title: "Driverless Autonomy Stack", 
    year: "2019 - 2022",
    description: "Began exploring robotics through driverless car development, laying the foundation for my passion in autonomous systems.",
    longDescription: "Began exploring robotics through driverless car development, laying the foundation for my passion in autonomous systems. While Formula Manipal consistently won races at Formula Bharat, we needed to introduce a driverless subsystem to compete in the international versions of the competition.",
    images: ["/assets/images/formula.jpeg"],
    bullets: [
      "Won first place at the Formula Student India 2021 Software Awards among 57 teams",
      "Coordinated multidisciplinary teams to develop a ROS-compatible drive-by-wire system",
      "Applied Extended Kalman Filters and Model Predictive Control for planning",
      "Implemented monocular depth perception, reducing costs by 36%"
    ],
    brag: "We built the first iteration of the driverless software, with a monocular depth perception system using known values from the racetrack. Moreover, we did this using only the compute available on our laptops. This version won the Software Awards at Formula Student India consecutively in 2020 and 2021. \n STORY: When we asked the university for more compute, they told us to use the HPC cluster that the university had. We attempted to, but it was extremely slow and outdated, such that even a browser would crash.",
    role: "As Head of Controls & Systems Integration for the Formula Student Driverless team, I was key in the technical development of our autonomous racing car. I coordinated four multidisciplinary teams in designing and implementing a ROS-compatible drive-by-wire mechanism. My key contributions included implementing Extended Kalman Filters for localization, Model Predictive Control for local planning, and developing an innovative monocular depth perception system that replaced traditional stereo cameras - reducing equipment costs by 36% while halving computational requirements.",
    impact: "Formula Student Germany introduced the driverless segment in 2015. While this segment was gaining popularity, no Indian team was developing this technology, primarily due to cost and funding considerations. We decided to give it a shot, and we won the Software Awards at Formula Bharat 2020.",
    media: [
      {
        type: 'video',
        url: '/assets/images/Formula-Accln.mp4',
        caption: 'Manual Acceleration test of car'
      },
      {
        type: 'video',
        url: '/assets/images/Perception.mp4',
        caption: 'Monoccular depth perception'
      },
      {
        type: 'image',
        url: '/assets/images/formula2.jpg',
        caption: 'Formula Bharat 2020'
      },
      {
        type: 'image',
        url: '/assets/images/formula.jpeg',
        caption: 'Formula Bharat 2020'
      }
    ],
    externalLink: "https://www.formulamanipal.in/"
  }
];

export default projectsData; 