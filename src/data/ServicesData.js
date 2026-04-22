// src/data/servicesData.js
export const services = [
  {
    id: 1,
    slug: "architecture-work",
    name: "Architecture Work",
    shortDesc: "Innovative architectural design for residential & commercial spaces",
    desc: "Professional architectural planning and design services for residential, commercial, and industrial projects.",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1400&auto=format&fit=crop",
    icon: "🏛️",
    category: "Design",
    features: [
      "2D & 3D Architectural Planning",
      "Concept Design & Visualization",
      "Working Drawings & Detailing",
      "Building Information Modeling (BIM)",
      "Sustainable & Green Building Design",
      "Renovation & Restoration"
    ],
    details: "We deliver modern architectural solutions with 3D visualization, detailed drawings, and execution-ready plans. Our designs blend aesthetics with functionality.",
    technologies: ["AutoCAD", "Revit", "SketchUp", "3DS Max", "Lumion"],
    certifications: ["ISO 9001:2015", "Green Building Certified"],
    portfolio: "200+ Projects Completed"
  },
  {
    id: 2,
    slug: "structure-design",
    name: "Structure Design",
    shortDesc: "Safe, durable, and cost-effective structural engineering",
    desc: "Comprehensive structural design services for all types of buildings and infrastructure.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1400&auto=format&fit=crop",
    icon: "🏗️",
    category: "Engineering",
    features: [
      "Seismic & Wind Load Analysis",
      "RCC & Steel Structure Design",
      "Foundation Design",
      "Pre-engineered Buildings",
      "Retrofitting & Rehabilitation",
      "Structural Audit"
    ],
    details: "Our structural engineering ensures strength, safety, and long-term durability using industry standards like IS codes and international benchmarks.",
    technologies: ["STAAD Pro", "ETABS", "SAP2000", "AutoCAD", "Revit Structure"],
    certifications: ["SEI Certified", "Earthquake Resistant Design Expert"],
    portfolio: "500+ Structures Engineered"
  },
  {
    id: 3,
    slug: "interior-design",
    name: "Interior Design",
    shortDesc: "Beautiful, functional interior spaces",
    desc: "Complete interior design solutions for homes, offices, and commercial spaces.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop",
    icon: "🛋️",
    category: "Design",
    features: [
      "Space Planning & Layout",
      "3D Interior Visualization",
      "Material & Finish Selection",
      "Furniture Design",
      "Lighting Design",
      "Project Execution"
    ],
    details: "We create stunning interior spaces that reflect your personality while maximizing functionality and comfort.",
    technologies: ["3DS Max", "SketchUp", "AutoCAD", "V-Ray"],
    certifications: ["Interior Design Certified"],
    portfolio: "150+ Interior Projects"
  },
  {
    id: 4,
    slug: "soil-investigation",
    name: "Soil Investigation & Geotechnical Work",
    shortDesc: "Precise soil testing for strong foundations",
    desc: "Comprehensive geotechnical investigation and soil testing services.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1400&auto=format&fit=crop",
    icon: "🌍",
    category: "Testing",
    features: [
      "Standard Penetration Test (SPT)",
      "Cone Penetration Test (CPT)",
      "Laboratory Soil Testing",
      "Bearing Capacity Analysis",
      "Ground Improvement Solutions",
      "Geotechnical Reports"
    ],
    details: "We provide precise soil analysis reports for safe and optimized foundation design, ensuring structural stability.",
    technologies: ["GIS Mapping", "Geotechnical Software", "Lab Equipment"],
    certifications: ["NABL Accredited", "ISO Certified"],
    portfolio: "1000+ Soil Investigations"
  },
  {
    id: 5,
    slug: "ndt-testing",
    name: "Non Destructive Testing (NDT)",
    shortDesc: "Advanced testing without structural damage",
    desc: "Non-destructive testing services for quality assessment of structures.",
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=1400&auto=format&fit=crop",
    icon: "🔬",
    category: "Testing",
    features: [
      "Ultrasonic Pulse Velocity Test",
      "Rebound Hammer Test",
      "Half-Cell Potential Test",
      "Carbonation Test",
      "Cover Meter Survey",
      "Core Extraction & Analysis"
    ],
    details: "NDT methods help assess structural health without causing damage, ideal for existing buildings and heritage structures.",
    technologies: ["Ultrasonic Equipment", "Rebound Hammer", "Cover Meter", "Corrosion Analyzer"],
    certifications: ["NDT Level III Certified", "ISO 9712"],
    portfolio: "500+ NDT Assessments"
  },
  {
    id: 6,
    slug: "material-testing",
    name: "Material Testing",
    shortDesc: "Comprehensive construction material testing",
    desc: "Quality testing for all construction materials.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1400&auto=format&fit=crop",
    icon: "🧪",
    category: "Testing",
    features: [
      "Concrete Testing (Cube, Cylinder, Core)",
      "Steel & Reinforcement Testing",
      "Aggregate Testing",
      "Soil & Bitumen Testing",
      "Water Quality Analysis",
      "Mix Design & Optimization"
    ],
    details: "Ensure quality compliance with our comprehensive material testing services in NABL accredited laboratories.",
    technologies: ["Universal Testing Machine", "Compression Tester", "Lab Equipment"],
    certifications: ["NABL Accredited", "ISO 17025"],
    portfolio: "10000+ Material Tests"
  },
  {
    id: 7,
    slug: "third-party-inspection",
    name: "Third Party Inspection (Quality Control)",
    shortDesc: "Independent quality assurance services",
    desc: "Independent quality inspection and quality control services.",
    image: "https://images.unsplash.com/photo-1581092335871-4f2e5f9c7a9a?q=80&w=1400&auto=format&fit=crop",
    icon: "✅",
    category: "Inspection",
    features: [
      "Quality Control Monitoring",
      "Vendor & Supplier Audits",
      "Pre-shipment Inspection",
      "Construction Quality Audit",
      "ISO Compliance Check",
      "Documentation & Reporting"
    ],
    details: "Independent third-party inspection ensures quality standards are met throughout the construction process.",
    technologies: ["Quality Management Software", "Testing Equipment"],
    certifications: ["ISO 9001 Lead Auditor", "Six Sigma Certified"],
    portfolio: "300+ Inspection Projects"
  },
  {
    id: 8,
    slug: "survey-work",
    name: "Survey Work",
    shortDesc: "Precise land and construction surveying",
    desc: "Comprehensive surveying services for various applications.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1400&auto=format&fit=crop",
    icon: "📏",
    category: "Survey",
    features: [
      "Topographical Survey",
      "Contour Mapping",
      "Building Layout Survey",
      "Pipeline Route Survey",
      "River & Bathymetric Survey",
      "Road & Highway Survey",
      "GIS Mapping",
      "Drone Survey"
    ],
    details: "High-precision surveying using advanced equipment including total stations, GPS, and drone technology.",
    technologies: ["Total Station", "GPS/GNSS", "Drone/UAV", "GIS Software", "AutoCAD"],
    certifications: ["Licensed Surveyor", "Drone Pilot Certified"],
    portfolio: "1000+ Survey Projects"
  },
  {
    id: 9,
    slug: "supervision-consultant",
    name: "Supervision Consultant",
    shortDesc: "Expert project supervision and management",
    desc: "Professional supervision and project management consultancy.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1400&auto=format&fit=crop",
    icon: "👷",
    category: "Consultancy",
    features: [
      "Site Supervision",
      "Quality Control Monitoring",
      "Safety Compliance",
      "Progress Tracking",
      "Contractor Coordination",
      "Monthly Progress Reports"
    ],
    details: "Experienced supervisors ensure your project meets quality, safety, and timeline requirements.",
    technologies: ["Project Management Software", "Safety Management Tools"],
    certifications: ["PMP Certified", "Safety Officer Certified"],
    portfolio: "200+ Supervised Projects"
  },
  {
    id: 10,
    slug: "bridge-design",
    name: "Bridge Design",
    shortDesc: "Specialized bridge engineering and design",
    desc: "Expert bridge design and engineering services.",
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1400&auto=format&fit=crop",
    icon: "🌉",
    category: "Engineering",
    features: [
      "RCC Bridge Design",
      "Steel Bridge Design",
      "Pre-stressed Concrete Bridges",
      "Cable-stayed & Suspension Bridges",
      "Footbridge & Flyover Design",
      "Bridge Load Rating"
    ],
    details: "Specialized bridge design services for highways, railways, and pedestrian bridges following IRC standards.",
    technologies: ["STAAD Pro", "MIDAS Civil", "AutoCAD", "Revit"],
    certifications: ["IRC Certified", "Bridge Engineering Expert"],
    portfolio: "50+ Bridge Projects"
  },
  {
    id: 11,
    slug: "water-supply-design",
    name: "Water Supply Design",
    shortDesc: "Efficient water distribution systems",
    desc: "Complete water supply system design and planning.",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=1400&auto=format&fit=crop",
    icon: "💧",
    category: "Infrastructure",
    features: [
      "Water Demand Calculation",
      "Pipeline Network Design",
      "Pumping Station Design",
      "Overhead Tank Design",
      "Water Treatment Plant Design",
      "Distribution System Optimization"
    ],
    details: "Design efficient water supply systems for urban and rural areas ensuring adequate pressure and quality.",
    technologies: ["EPANET", "WaterGEMS", "AutoCAD", "GIS"],
    certifications: ["Water Supply Certified"],
    portfolio: "100+ Water Supply Projects"
  },
  {
    id: 12,
    slug: "irrigation-design",
    name: "Irrigation Design Work",
    shortDesc: "Sustainable irrigation solutions",
    desc: "Comprehensive irrigation system design for agriculture.",
    image: "https://images.unsplash.com/photo-1589923188654-7d8f3b8b15a7?q=80&w=1400&auto=format&fit=crop",
    icon: "🌾",
    category: "Infrastructure",
    features: [
      "Canal Design",
      "Drip Irrigation Systems",
      "Sprinkler System Design",
      "Reservoir & Dam Design",
      "Water Distribution Networks",
      "Irrigation Efficiency Studies"
    ],
    details: "Sustainable irrigation solutions for maximizing agricultural productivity with optimal water usage.",
    technologies: ["CAD", "Hydraulic Modeling Software", "GIS"],
    certifications: ["Irrigation Expert"],
    portfolio: "75+ Irrigation Projects"
  },
  {
    id: 13,
    slug: "plate-load-test",
    name: "Plate Load Test",
    shortDesc: "Accurate bearing capacity assessment",
    desc: "On-site plate load testing for foundation design.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1400&auto=format&fit=crop",
    icon: "⚖️",
    category: "Testing",
    features: [
      "Static Plate Load Test",
      "Cyclic Plate Load Test",
      "Bearing Capacity Determination",
      "Settlement Analysis",
      "Subgrade Modulus Calculation",
      "Foundation Design Validation"
    ],
    details: "Determine actual bearing capacity and settlement characteristics of soil through on-site plate load tests.",
    technologies: ["Hydraulic Jack", "Dial Gauges", "Data Logger"],
    certifications: ["ISO Certified", "Geotechnical Expert"],
    portfolio: "300+ Plate Load Tests"
  },
  {
    id: 14,
    slug: "estimation-consultancy",
    name: "Estimation & Consultancy",
    shortDesc: "Accurate cost estimation and expert advice",
    desc: "Professional estimation and consultancy services.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1400&auto=format&fit=crop",
    icon: "📊",
    category: "Consultancy",
    features: [
      "Detailed Project Estimation",
      "Bill of Quantities (BOQ)",
      "Rate Analysis",
      "Tender Documentation",
      "Value Engineering",
      "Project Feasibility Studies"
    ],
    details: "Accurate cost estimation and expert consultancy for better project planning and budget control.",
    technologies: ["Estimation Software", "Excel", "AutoCAD"],
    certifications: ["Cost Engineer Certified", "Quantity Surveyor"],
    portfolio: "500+ Estimation Projects"
  }
];

// Get unique categories
export const categories = ["All", ...new Set(services.map(s => s.category))];