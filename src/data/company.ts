import { bcAssets } from "@/assets/bc";

/**
 * Content sourced verbatim from the Bridge Craft Engineers & Consultants
 * Company Profile 2026. Used as the authoritative fallback for Sanity fields.
 */

export const company = {
  name: "Bridge Craft Engineers & Consultants",
  shortName: "BRIDGE CRAFT",
  tagline: "ENGINEERS AND CONSULTANT",
  strapline: "From Ground Investigation to Structural Excellence",
  address:
    "Flat No.8, 3rd Floor, Parsn Manere, 'C' Wing, New No.442, Anna Salai, Mount Road, Chennai – 600006",
  phone: "9988776655",
  email: "info@bridgecraft.in",
  website: "bridgecraft.in",
  mapUrl:
    "https://www.google.com/maps?q=Parsn+Manere,+Anna+Salai,+Mount+Road,+Chennai+600006&output=embed",
  profileUrl: bcAssets.companyProfile,
};

export const introParagraphs = [
  "We, Bridge Craft Engineers & Consultants are Engineering Design Consultants specializing in Structural Engineering, Geotechnical and Geo-Physical Engineering. We deliver technically sound, economically optimized, and execution-ready engineering solutions for government, institutional, commercial, and infrastructure projects.",
  "Our strength lies in combining rigorous engineering analysis with practical field understanding. From soil investigation and foundation design to complete structural detailing and pavement engineering, we ensure that every project is built on a foundation of safety, precision, and compliance.",
  "With experience of public sector tenders, banking infrastructure, institutional buildings, and infrastructure developments, we bring reliability, transparency, and technical integrity to every assignment.",
];

export const vision =
  "To be a trusted consultancy organization delivering reliable and sustainable engineering solutions for various Civil Engineering Projects including Road and Highway infrastructure.";

export const mission =
  "To provide technically sound, field-verified, and cost-effective engineering services while adhering to applicable codes and specifications with consistency in quality and timelines.";

export const values = [
  {
    title: "Engineering Integrity",
    description:
      "We uphold accuracy, compliance, and ethical responsibility in every stage of design and execution.",
  },
  {
    title: "Technical Excellence",
    description:
      "We apply advanced engineering methods, updated codes, and rigorous validation to deliver optimized and safe solutions.",
  },
  {
    title: "Reliability & Accountability",
    description:
      "We ensure consistency in deliverables, transparent communication, and ownership of project outcomes.",
  },
  {
    title: "Safety First Approach",
    description:
      "We prioritize safety in design by incorporating risk assessment, code compliance, and field realities.",
  },
  {
    title: "Practical Engineering",
    description:
      "We combine analytical design with real-world site experience to deliver implementable solutions.",
  },
];

export const strategyPillars = [
  {
    number: "01",
    title: "Technical Depth & Specialization",
    description:
      "By continuously upgrading design tools, code compliance knowledge, and analytical capabilities, we ensure technically robust and future-ready engineering solutions.",
    points: [
      "Structural Design Engineering",
      "Geotechnical Investigation & Analysis",
      "Foundation Engineering",
      "Pavement Engineering",
      "Detailed Project Reports (DPRs)",
    ],
  },
  {
    number: "02",
    title: "Government & Institutional Project Focus",
    description:
      "We prioritize statutory compliance, documentation accuracy, and transparent project execution to build long-term credibility.",
    points: [
      "Public sector tenders",
      "Banking and institutional infrastructure",
      "Infrastructure development projects",
      "Soil investigation & survey assignments",
    ],
  },
  {
    number: "03",
    title: "Sustainable & Responsible Engineering",
    description: "We aim to deliver engineering that performs over the full asset life cycle.",
    points: [
      "Economically optimized structural solutions",
      "Resource-efficient designs",
      "Safe foundation systems based on precise soil analysis",
      "Long-lasting infrastructure performance",
    ],
  },
  {
    number: "04",
    title: "Controlled & Stable Growth",
    description: "Rather than rapid expansion, our strategy focuses on durable relationships.",
    points: [
      "Strengthening technical reputation",
      "Expanding geographic reach gradually",
      "Building repeat client relationships",
      "Maintaining engineering integrity at every scale",
    ],
  },
];

export const whyChooseUs = [
  { icon: "Anchor", title: "Marine & Infrastructure Expertise", description: "Proven capability on marine bridges and national highway corridors in island and coastal terrain." },
  { icon: "Layers", title: "Integrated Services", description: "Structural, Geotechnical and Geophysical engineering delivered by a single accountable team." },
  { icon: "HardHat", title: "Execution-Focused Design", description: "Designs are shaped by field realities so they can actually be built, safely and on schedule." },
  { icon: "Gauge", title: "Cost-Effective & Optimized", description: "Value engineering and economically optimized structural solutions on every assignment." },
  { icon: "Mountain", title: "Challenging Site Conditions", description: "Creek, marine, riverbed and remote-island investigations executed with specialist rigs." },
  { icon: "CheckCircle2", title: "Reliable Project Delivery", description: "Consistent deliverables, transparent communication and ownership of project outcomes." },
];

export const teamStatement = [
  "Bridge Craft Engineers & Consultants is led by experienced civil engineering professionals with expertise in structural design, geotechnical investigations, and infrastructure planning.",
  "Our leadership combines analytical design proficiency with practical field exposure, ensuring technically sound and execution-oriented engineering solutions.",
];

export const services = [
  {
    _id: "svc-preconstruction",
    number: "01",
    title: "Pre-Construction & Engineering Advisory",
    icon: "Compass",
    shortDescription:
      "Strategic engineering support during planning and pre-execution stages to optimize design decisions, reduce risk, and improve project feasibility.",
    bullets: [
      "Technical feasibility studies",
      "Pre-bid engineering support for EPC contractors",
      "Constructability review and risk assessment",
      "Value engineering and cost optimization",
      "Technical due diligence",
      "Independent design review and validation",
    ],
    image: bcAssets.bridgeCrossSection,
  },
  {
    _id: "svc-structural",
    number: "02",
    title: "Structural Engineering",
    icon: "Building2",
    shortDescription:
      "Comprehensive structural design and analysis services for infrastructure and building projects, ensuring safety, durability, and constructability.",
    bullets: [
      "Bridge design and structural assessment",
      "Highway and road structures",
      "Retaining walls and culverts",
      "Industrial and commercial building design",
      "Structural rehabilitation and strengthening",
      "Seismic analysis and retrofitting",
    ],
    image: bcAssets.retrofitShearwallModel,
  },
  {
    _id: "svc-geotechnical",
    number: "03",
    title: "Geotechnical Engineering",
    icon: "HardHat",
    shortDescription:
      "Expert geotechnical investigations and foundation design solutions ensuring stability, safety, and long-term performance.",
    bullets: [
      "Site investigation and soil testing",
      "Foundation design and optimization",
      "Slope stability analysis",
      "Ground improvement and stabilization",
      "Pavement subgrade evaluation",
      "Embankment and retaining structure design",
    ],
    image: bcAssets.nh04Drilling,
  },
  {
    _id: "svc-geophysical",
    number: "04",
    title: "Geophysical Engineering",
    icon: "Waves",
    shortDescription:
      "Advanced subsurface exploration and testing using non-invasive geophysical methods to support engineering design and construction decisions.",
    bullets: [
      "Seismic refraction and MASW surveys",
      "Electrical Resistivity Tomography (ERT)",
      "Ground Penetrating Radar (GPR) surveys",
      "Subsurface mapping and profiling",
      "Detection of cavities, utilities, and anomalies",
      "Integration of geophysical and geotechnical data",
    ],
    image: bcAssets.solarErtSurvey,
  },
];

export type ProjectRecord = {
  _id: string;
  number: string;
  title: string;
  heading: string;
  tag: string;
  value?: string;
  client: string;
  authority?: string;
  location: string;
  scope: string;
  summary: string;
  highlights: string[];
  image: string;
  gallery?: string[];
};

export const projects: ProjectRecord[] = [
  {
    _id: "prj-01",
    number: "01",
    title: "Major Marine Bridge – NH-04",
    heading: "Detailed Design Engineering – Major Bridge over Middle Strait Creek",
    tag: "Bridges",
    value: "₹90L · Flagship",
    client: "RKEC Projects Limited",
    authority: "NHIDCL",
    location: "South Andaman – Baratang Island, Andaman & Nicobar Islands",
    scope:
      "Full Detailed Design Engineering including bridge foundation, substructure, superstructure, highway alignment, hydrological studies, geotechnical investigations, and authority coordination.",
    summary:
      "EPC-based design consultancy for construction of balance works of a major marine bridge forming part of NH-04 connectivity in island terrain.",
    highlights: [
      "16 x 60m x 14.8m wide bridge across Middle Strait Creek",
      "Total bridge length of 1925m",
      "Superstructure in UHPC-M150 grade",
      "1500/1800mm dia piles up to 50m",
      "Hydrology & hydraulic studies",
      "Geometric and structural designs with approvals",
      "Integrated geotechnical investigations",
      "Long-term EPC engagement",
    ],
    image: bcAssets.marineBridgeSite,
    gallery: [bcAssets.marineBridgeSite, bcAssets.bridgeCrossSection],
  },
  {
    _id: "prj-02",
    number: "02",
    title: "Additional Deep Geotechnical Investigation",
    heading: "Additional Geotechnical Investigations – Major Bridge NH-04",
    tag: "Geotechnical",
    value: "₹40L · Middle Strait Creek",
    client: "RKEC Projects Limited",
    authority: "NHIDCL",
    location: "Andaman & Nicobar Islands",
    scope:
      "Deep borehole investigations (30–50m), SPT testing, rock coring, lab testing and foundation evaluation.",
    summary:
      "Advanced subsurface investigations across pier and abutment locations under challenging marine conditions.",
    highlights: [
      "27 deep boreholes",
      "30–50m depth exploration",
      "Marine & creek condition drilling",
      "SPT & rock core recovery",
      "Foundation design inputs",
    ],
    image: bcAssets.marineGeotechTeam,
  },
  {
    _id: "prj-03",
    number: "03",
    title: "NH-04 Corridor Upgradation (26 km)",
    heading: "Detailed Design Engineering – NH-04 Package IIIB",
    tag: "Highways",
    value: "₹70L",
    client: "RKEC Projects Limited",
    authority: "NHIDCL",
    location: "Jarwa – Rangat Section, Andaman & Nicobar Islands",
    scope:
      "Highway alignment, pavement design, bridges & culverts, retaining structures, surveys and geotechnical investigations.",
    summary:
      "Rehabilitation and upgradation of a 26 km national highway stretch including bridge and structural components.",
    highlights: [
      "26 km highway corridor",
      "Six minor bridges with spans 42m to 12m",
      "Traffic studies and pavement designs",
      "Soil survey and geotechnical investigations",
      "Hydrology & hydraulic studies",
      "Geometric and structural designs with approvals",
      "Long-term EPC engagement",
    ],
    image: bcAssets.nh04Corridor,
    gallery: [bcAssets.nh04Corridor, bcAssets.nh04Drilling],
  },
  {
    _id: "prj-04",
    number: "04",
    title: "NH-45C Vikravandi – Sethiyathope (60 km Corridor)",
    heading: "Geotechnical Investigation – NH-45C Four-Laning",
    tag: "Geotechnical",
    client: "Assystem India Ltd",
    authority: "NHAI",
    location: "Tamil Nadu",
    scope:
      "Subsurface investigations for bridge locations including boreholes, SPT testing, and laboratory soil & rock analysis.",
    summary:
      "Geotechnical support for 60.25 km national highway augmentation under NHDP Phase-IV.",
    highlights: [
      "60 km highway corridor",
      "Bridge foundation investigations",
      "Rock coring & soil profiling",
      "IS-compliant lab testing",
    ],
    image: bcAssets.nh45cDrilling,
  },
  {
    _id: "prj-05",
    number: "05",
    title: "Thiruvarur Bypass – NH-67 (14 km)",
    heading: "Geotechnical Investigation – 4-Laning DPR",
    tag: "Geotechnical",
    client: "Assystem India Ltd",
    authority: "NHAI",
    location: "Tamil Nadu",
    scope:
      "Borehole investigations, SPT, CBR testing and laboratory soil analysis for pavement & bridge design.",
    summary: "Subsurface investigations supporting DPR preparation for a 14.16 km bypass corridor.",
    highlights: [
      "14 km corridor",
      "Pavement subgrade evaluation",
      "Soil classification & CBR testing",
      "Detailed geotechnical reporting",
    ],
    image: bcAssets.thiruvarurRiverRig,
  },
  {
    _id: "prj-06",
    number: "06",
    title: "ROB 129A & ROB 134A – NH-67",
    heading: "Geotechnical Investigation – Railway Over Bridges",
    tag: "Railways",
    client: "Assystem India Ltd",
    authority: "NHAI",
    location: "Tamil Nadu",
    scope: "Confirmatory boreholes and foundation investigation for ROB structures.",
    summary:
      "Geotechnical evaluation for railway overbridge structures under a highway upgradation project.",
    highlights: [
      "Bridge-specific investigations",
      "Rock coring & SPT testing",
      "Foundation design inputs",
    ],
    image: bcAssets.robRoadRig,
    gallery: [bcAssets.robRoadRig, bcAssets.robWaterInvestigation],
  },
  {
    _id: "prj-07",
    number: "07",
    title: "Manair River Railway Bridge",
    heading: "Geotechnical Investigation – Manair River Railway Bridge",
    tag: "Railways",
    client: "Assystem India Ltd",
    authority: "South Central Railway",
    location: "Telangana",
    scope: "Deep borehole investigations, soil & rock analysis and liquefaction assessment.",
    summary: "Geotechnical support for a major railway bridge along a proposed new BG line corridor.",
    highlights: [
      "30 boreholes",
      "20m soil & 6m rock exploration",
      "Liquefaction studies",
      "Foundation capacity evaluation",
    ],
    image: bcAssets.manairFloatingRig,
    gallery: [bcAssets.manairFloatingRig, bcAssets.manairCorridorMap],
  },
  {
    _id: "prj-08",
    number: "08",
    title: "350 MW Solar Power Project (Phase 1 & 2)",
    heading:
      "Geotechnical Investigation & ERT – 350 MW Solar Project (Phase 1) and Boreholes, Trial Pits & ERT (Phase 2)",
    tag: "Geophysical",
    client: "Chinta Green Energy Pvt Ltd",
    authority: "Private Utility-Scale Renewable Developer",
    location: "India",
    scope:
      "Boreholes, trial pits, Electrical Resistivity Testing, soil classification and reporting — 22 boreholes, 12 trial pits and plant-wide resistivity surveys.",
    summary:
      "Subsurface investigations for foundation and earthing design of a utility-scale solar power plant, expanded across two phases.",
    highlights: [
      "Phase 1 — 350 MW capacity",
      "Phase 1 — Boreholes, trial pits and ERT surveys",
      "Phase 1 — Integrated geotechnical reporting",
      "Phase 2 — 22 boreholes and 12 trial pits",
      "Phase 2 — IS 3043 compliant ERT",
      "Phase 2 — Foundation & earthing design inputs",
    ],
    image: bcAssets.solarErtSurvey,
    gallery: [bcAssets.solarErtSurvey, bcAssets.solarBorehole],
  },
  {
    _id: "prj-09",
    number: "09",
    title: "CPWD Institutional Campus – GRI Dindigul",
    heading: "Soil Investigation – GRI Campus Institutional Buildings",
    tag: "Institutional",
    client: "Central Public Works Department (CPWD)",
    authority: "Government of India",
    location: "Dindigul, Tamil Nadu",
    scope: "Boreholes, SPT testing, laboratory soil & rock testing and SBC evaluation.",
    summary:
      "Soil investigation for academic, hostel and institutional buildings under CPWD norms.",
    highlights: [
      "21 boreholes",
      "NABL lab testing",
      "CPWD 2019 compliance",
      "15-day execution timeline",
    ],
    image: bcAssets.cpwdSiteTeam,
  },
  {
    _id: "prj-10",
    number: "10",
    title: "Retrofitting of Existing Institutional Building – Madurai",
    heading: "Structural Assessment & Retrofitting of Existing Building",
    tag: "Structural",
    client: "Crescent B.Ed. Women's College",
    location: "Madurai, Tamil Nadu",
    scope:
      "Detailed structural assessment, analytical evaluation and retrofitting design of an existing building including beams, columns and foundations.",
    summary:
      "Structural evaluation of an existing G+2 institutional building to identify critical deficiencies and implement suitable retrofitting measures to improve stability and performance.",
    highlights: [
      "Identified significant structural deficiency with beam deflection of approximately 160 mm",
      "Detailed analytical study of the existing structural system",
      "Introduction of an additional column to reduce span and control deflection",
      "Strengthening of existing beams, columns and footings",
      "Introduction of shear walls to enhance lateral stability",
      "Improved overall structural safety and serviceability",
    ],
    image: bcAssets.retrofitShearwallModel,
    gallery: [
      bcAssets.retrofitShearwallModel,
      bcAssets.retrofitFootingDetail,
      bcAssets.retrofitFootingLayout,
    ],
  },
];

export const galleryImages = [
  { src: bcAssets.marineBridgeSite, alt: "Marine bridge works over Middle Strait Creek, Andaman" },
  { src: bcAssets.marineGeotechTeam, alt: "Geotechnical crew on a barge-mounted rig, Andaman" },
  { src: bcAssets.nh04Corridor, alt: "NH-04 corridor upgradation, Jarwa – Rangat section" },
  { src: bcAssets.nh04Drilling, alt: "Borehole drilling along the NH-04 corridor" },
  { src: bcAssets.nh45cDrilling, alt: "NH-45C four-laning geotechnical investigation, Tamil Nadu" },
  { src: bcAssets.thiruvarurRiverRig, alt: "River-bed drilling rig, Thiruvarur bypass NH-67" },
  { src: bcAssets.robRoadRig, alt: "Railway over bridge foundation investigation, NH-67" },
  { src: bcAssets.robWaterInvestigation, alt: "Water-borne confirmatory borehole, ROB NH-67" },
  { src: bcAssets.manairFloatingRig, alt: "Floating platform drilling, Manair River railway bridge" },
  { src: bcAssets.solarBorehole, alt: "Borehole logging at the 350 MW solar power project" },
  { src: bcAssets.solarErtSurvey, alt: "Electrical Resistivity Tomography survey, solar project" },
  { src: bcAssets.cpwdSiteTeam, alt: "Soil investigation team at GRI campus, Dindigul" },
  { src: bcAssets.bridgeCrossSection, alt: "Bridge structural cross-section drawing" },
  { src: bcAssets.retrofitShearwallModel, alt: "Analytical model of retrofitted institutional building" },
  { src: bcAssets.retrofitFootingDetail, alt: "Footing strengthening detail, Madurai retrofitting" },
  { src: bcAssets.manairCorridorMap, alt: "Railway corridor alignment map, Telangana" },
];

export const stats = [
  { value: "10", label: "Projects executed" },
  { value: "₹200L+", label: "Consultancy value" },
  { value: "100+", label: "Boreholes investigated" },
  { value: "3", label: "Integrated disciplines" },
];

export const sectors = [
  "Marine Bridges",
  "National Highways",
  "Railways",
  "Geotechnical Investigation",
  "Geophysical Surveys",
  "Institutional Buildings",
  "Renewable Energy",
  "Structural Retrofitting",
];

/** Sector-wise technical credentials, evidenced by executed projects. */
export const sectorExperience = [
  {
    icon: "Waves",
    sector: "Bridges & Marine Structures",
    summary:
      "Detailed design engineering of major marine bridges in creek and island terrain, including deep pile foundations, UHPC superstructures and hydrological studies.",
    evidence: [
      "Major bridge over Middle Strait Creek — 16 x 60m spans, 1925m total length (NHIDCL / RKEC Projects Ltd)",
      "UHPC-M150 superstructure design with 1500/1800mm dia piles up to 50m depth",
      "Six minor bridges (42m to 12m spans) on the NH-04 corridor",
    ],
    image: bcAssets.marineBridgeSite,
  },
  {
    icon: "Compass",
    sector: "Highways & Road Infrastructure",
    summary:
      "Highway alignment, pavement and structural design for national highway corridors, supported by traffic studies and subgrade evaluation.",
    evidence: [
      "NH-04 Package IIIB, Jarwa – Rangat: 26 km corridor upgradation",
      "NH-45C Vikravandi – Sethiyathope: 60 km four-laning geotechnical investigation",
      "NH-67 Thiruvarur bypass: 14 km alignment investigation",
    ],
    image: bcAssets.nh04Corridor,
  },
  {
    icon: "Layers",
    sector: "Railways",
    summary:
      "Investigation and design support for railway bridges and road-over-bridge structures, including river-bed drilling from floating platforms.",
    evidence: [
      "Manair River railway bridge — floating-rig river-bed investigation, Telangana",
      "ROB 129A & ROB 134A on NH-67 — road and water-body investigations",
    ],
    image: bcAssets.manairFloatingRig,
  },
  {
    icon: "Gauge",
    sector: "Solar & Renewable Energy",
    summary:
      "Geotechnical and geophysical investigation packages for large-scale solar power installations, including resistivity surveys for earthing design.",
    evidence: [
      "350 MW solar power project, Phase 1 & 2 — boreholes and ERT surveys",
      "Electrical Resistivity Tomography for foundation and earthing parameters",
    ],
    image: bcAssets.solarErtSurvey,
  },
  {
    icon: "Building2",
    sector: "Institutional & Commercial Buildings",
    summary:
      "Structural design and soil investigation for government, institutional and commercial building projects with full statutory documentation.",
    evidence: [
      "CPWD institutional campus, Gandhigram Rural Institute, Dindigul",
      "Foundation design based on precise soil analysis and code compliance",
    ],
    image: bcAssets.cpwdSiteTeam,
  },
  {
    icon: "HardHat",
    sector: "Retrofitting & Strengthening",
    summary:
      "Assessment, analytical modelling and detailing for the seismic strengthening and rehabilitation of existing structures.",
    evidence: [
      "Retrofitting of an existing institutional building, Madurai",
      "Shear wall modelling, footing strengthening details and layout drawings",
    ],
    image: bcAssets.retrofitShearwallModel,
  },
];
