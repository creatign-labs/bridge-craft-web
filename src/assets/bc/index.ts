// Real Bridge Craft photography & documents extracted from the 2026 Company Profile.
import logoMark from "./logo-mark.png";
import logoMarkDark from "./logo-mark-dark.png";
import extendedLogo from "../brand/bridgecraft-extended-logo.png.asset.json";
import extendedLogoDark from "../brand/bridgecraft-extended-logo-dark.png.asset.json";
import companyProfile from "../documents/bridge-craft-company-profile-2026.pdf.asset.json";
import marineBridgeSite from "./marine-bridge-site.jpg";
import marineGeotechTeam from "./marine-geotech-team.jpg";
import bridgeCrossSection from "./bridge-cross-section.jpg";
import nh04Corridor from "./nh04-corridor.jpg";
import nh04Drilling from "./nh04-drilling.jpg";
import nh45cDrilling from "./nh45c-drilling.jpg";
import thiruvarurRiverRig from "./thiruvarur-river-rig.jpg";
import robRoadRig from "./rob-road-rig.jpg";
import robWaterInvestigation from "./rob-water-investigation.jpg";
import manairFloatingRig from "./manair-floating-rig.jpg";
import manairCorridorMap from "./manair-corridor-map.jpg";
import solarBorehole from "./solar-borehole.jpg";
import solarErtSurvey from "./solar-ert-survey.jpg";
import cpwdSiteTeam from "./cpwd-site-team.jpg";
import retrofitShearwallModel from "./retrofit-shearwall-model.jpg";
import retrofitFootingDetail from "./retrofit-footing-detail.jpg";
import retrofitFootingLayout from "./retrofit-footing-layout.jpg";

export const bcAssets = {
  logoMark,
  logoMarkDark,
  extendedLogo: extendedLogo.url,
  extendedLogoDark: extendedLogoDark.url,
  companyProfile: companyProfile.url,
  marineBridgeSite,
  marineGeotechTeam,
  bridgeCrossSection,
  nh04Corridor,
  nh04Drilling,
  nh45cDrilling,
  thiruvarurRiverRig,
  robRoadRig,
  robWaterInvestigation,
  manairFloatingRig,
  manairCorridorMap,
  solarBorehole,
  solarErtSurvey,
  cpwdSiteTeam,
  retrofitShearwallModel,
  retrofitFootingDetail,
  retrofitFootingLayout,
} as const;
