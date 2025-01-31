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
    longDescription: "The project addresses the growing need for advanced surgical tools as aging populations lead to an increase in osteoarthritis cases worldwide. Total Knee Arthroplasty is a common solution, with over 790,000 procedures performed annually in the U.S. alone. Current technologies for TKA often rely on invasive infrared trackers, which can be cumbersome and error-prone. This project was initiated to provide a less invasive, more accurate, and efficient alternative using vision-based methods. By integrating robotics into the surgical process, the goal was to enhance implant fitting accuracy, reduce post-operative complications, and improve patient outcomes while simplifying the surgeon's workflow.",
    images: ["/assets/images/knee-surgery.jpg"],
    bullets: [
      "Achieved an accuracy of 2 mm and 2 degrees, utilizing consumer-grade RealSense cameras and an off-the-shelf drill mounted on a custom 3D-printed end effector, effectively eliminating invasive fiducial trackers.",
      "Implemented OMPL-constrained planning for predictable manipulator motion and integrated it into a hybrid planning architecture with a local planner performing real-time validity checks during execution. ",
    ],
    brag: "STORY: Over the course of a year, we have 4 demonstrations. Our project sponsors were visiting for the first time during our second last demo. This was the the first time they'd see our robot working in person. At 2 am on the day of the demo, the flex shaft to our drill machine broke. Since the drill machine is a very specific, model that is not common, we couldn't get a replacement for at least 2 days. In a couple of hours, we adapted the end effector to use a more common version of the drill, ran tests, and we were still able to hit our accuracy goals during the demo.",
    role: "I designed a custom 3D printed end effector with a RealSense camera, and a drill mounted on it. Through repeated intrinsic and extrinsic camera calibration and developing an auto-calibration routine for the external camera, ensuring robust patient registration, I reduced calibration error from 12 mm to under 2 mm. The registration achieved near perfect theoretical accuracy using DINO + SAM for global registration and ICP for local refinement. Additionally, I worked on OMPL-constrained planning for predictable manipulator motion and integrated it into a hybrid control scheme with a local planner, effectively handling velocity shocks during execution",
    impact: "As populations age, the incidences of osteoarthritis and rheumatoid arthritis are increasing. Osteoarthritis results in structural changes, leading to the deterioration of protective knee cartilage, reduced joint space, and painful bone-to-bone contact. Affecting millions worldwide, it causes pain, stiffness, and limited mobility, necessitating interventions, with Total Knee Arthroplasty (TKA) being a key solution. Annually, approximately 790,000 knee replacements are performed in the U.S., highlighting not only the widespread issue but also emphasizing the significance and effectiveness of TKA in providing relief and improving an individuals’ quality of life. The emergence of computer-assisted TKA, such as the system developed by Smith and Nephew, aims to enhance implant fitting for patients and reduce post-operative complications. Current technology relies on Infrared-based methods for registration and tracking, which are cumbersome, invasive, and introduce additional sources of error. A vision-based solution would eliminate the need for these methods, simplifying the procedure for both the surgeon and the patient. ",
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
    longDescription: "The project focuses on developing a sensor-agnostic motion forecasting system for environmental agents, specifically for robots used in hospital settings. The goal is to address navigation challenges caused by moving obstacles, such as people or objects, that can lead to deadlocks or unsafe situations. By predicting the trajectories of moving objects using point cloud data, the system integrates this information into the robot's costmap to enhance its local planning and obstacle avoidance capabilities. This approach avoids privacy concerns by not relying on RGB cameras and works across different generations of robots with varying sensor suites.",
    images: ["/assets/images/aethon-robot.png"],
    bullets: [
      ""
    ],
    brag: "I tried more than 30 different variations with different algorithms and theories to get the methodology working with all the constraints. This is a problem that the company had been facing in hospitals for more than a decade.",
    role: "I developed environmental motion forecasting for hospital AMRs using point cloud-based, sensor-agnostic methods. To allow the software to run on older robot models deployed in the field, I created a CPU-only algorithm that utilizes AMCL localization, ICP alignment, and density-based clustering for object tracking and prediction via Hungarian algorithm and particle filtering, optimized for older robot models. The system proved highly effective, achieving 90% accuracy in 20 real-robot tests, successfully predicting motion up to 6 meters ahead.",
    impact: "The project has significant implications for improving the safety and efficiency of autonomous robots in dynamic environments like hospitals. It helps avoid deadlocks where gurney's are blocked by robots, which is a big concern because these robots move in and out of operating rooms. By enabling robots to forecast motion and avoid collisions proactively, it reduces risks to patients and staff while ensuring smoother operations. The sensor-agnostic nature of the solution makes it adaptable to existing and future robot systems without requiring costly hardware upgrades. Additionally, the CPU-only implementation ensures compatibility with current computational constraints, making it a practical solution for real-world deployment. ",
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
        url: '/assets/images/Aethon1.jpg',
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
    brag: "STORY: Iniitally, we were only able to cut simple open patterns autonomously. On friday, I was in the lab to meet with other lab mates, since I was flying back to India on Sunday and realized I needed to run one more experiement to get results for a presentation back in my university. While running the experiment, I realized we werent able to cut closed shapes since due to the loss in tension of the material. That is when we sat and designed the mount that held the material in place with paper clips and rubber bands. This allowed us to cut closed shapes, and we were able to get results for circle cutting to characherize the method for the paper.",
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
      },
      {
        type: 'image',
        url: '/assets/images/dvrk1.jpg',
        caption: 'Different patterns on different elastic materials'
      },
      {
        type: 'image',
        url: '/assets/images/dvrk2.png',
        caption: 'Different patterns on different elastic materials'
      },
      {
        type: 'image',
        url: '/assets/images/dvrk3.jpg',
        caption: 'Different patterns on different elastic materials'
      },
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
      " "
    ],
    longDescription: "The project, titled BlockMapping: A Blockchain-Based Multi-Robot Mapping, focuses on solving challenges in multi-robot systems for mapping large, unknown environments. It introduces a decentralized approach using blockchain technology to enable effective communication and collaboration between robots without relying on a central node. Each robot is treated as a block in a blockchain, sharing positional and mapping data with others to ensure that no area is redundantly mapped. The system integrates various sensors (e.g., IMU, LiDAR, GPS) and employs techniques like EKF-based sensor fusion for accurate localization and mapping. The methodology also addresses issues such as avoiding inter-robot collisions, dynamic obstacle detection, and seamless integration of new robots into the system.",
    brag: "This started off as a tutorial project for ROS2, which then turned into something I got to present at an iROS workshop, where I got to meet and interact with a lot of great people, as a second year undergraduate student.",
    role: "I worked on porting the intial implementation from ROS melodic to ROS2, getting the simulation environment up and running, in time when ROS2 was newly introduced, with little support. I tested and validated the system using TurtleBot robots in simulation environments, analyzing its performance under various conditions such as sparse environments.",
    impact: "The project has a wide range of applications in areas like rescue missions, military operations, firefighting, and industrial automation. By leveraging blockchain's decentralized structure, it eliminates single points of failure and ensures secure communication among robots. This results in faster and more efficient mapping with minimized redundancies. The system is particularly effective in time-sensitive scenarios or environments with limited features, as it enables accurate localization and mapping while avoiding inter-robot collisions. Additionally, it supports dynamic scaling by allowing new robots to join the network without disrupting ongoing operations, making it a highly adaptable solution for real-world challenges.",
    media: [

      {
        type: 'image',
        url: '/assets/images/iros3.jpg',
        caption: 'mapping environment'
      },
      {
        type: 'image',
        url: '/assets/images/iros2.jpg',
        caption: 'mapping result'
      },
      {
        type: 'image',
        url: '/assets/images/iros2.png',
        caption: 'Presentation title'
      },
      {
        type: 'image',
        url: '/assets/images/IROS.jpg',
        caption: 'Overview of the system'
      },
      {
        type: 'image',
        url: '/assets/images/iros1.gif',
        caption: 'mapping visualization'
      }
    ],
    externalLink: "http://blockchaininroboticsandai.org/",
    additionalLinkName: "Presentation Link",
    additionalLink: "https://docs.google.com/presentation/d/1-UrOwUZgiE32Violrpd2dwes5KJPp0draAKAScEmOYo/edit?usp=sharing"
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