import {
  Cloud,
  Code2,
  Database,
  Layers,
  LayoutDashboard,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
} from 'lucide-react';
import webAppsImg from '../assets/images/agency_web_apps_1794584483920.jpg';
import mobileDevImg from '../assets/images/agency_mobile_dev_1794584483437.jpg';
import uiUxImg from '../assets/images/agency_ui_ux_design_men_1794584626063.jpg';
import ecommerceImg from '../assets/images/agency_ecommerce_dev_1794584484166.jpg';
import backendApiImg from '../assets/images/agency_backend_api_1794584484837.jpg';
import cloudDevopsImg from '../assets/images/agency_cloud_devops_men_1794584626260.jpg';
import dashboardsImg from '../assets/images/agency_enterprise_dashboards_1794584485278.jpg';
import qaSupportImg from '../assets/images/agency_qa_maintenance_men_1794584627021.jpg';
import { SERVICE_DATA, SERVICE_STEPS, type ServiceData } from './serviceData';

export { SERVICE_STEPS };

export interface Service extends ServiceData {
  image: string;
  icon: typeof Code2;
}

const VISUALS: Record<string, { image: string; icon: typeof Code2 }> = {
  'web-apps': { image: webAppsImg, icon: Code2 },
  'mobile-development': { image: mobileDevImg, icon: Smartphone },
  'ui-ux-design': { image: uiUxImg, icon: Layers },
  'e-commerce': { image: ecommerceImg, icon: ShoppingBag },
  'backend-apis': { image: backendApiImg, icon: Database },
  'cloud-devops': { image: cloudDevopsImg, icon: Cloud },
  'internal-tools-erp': { image: dashboardsImg, icon: LayoutDashboard },
  'qa-dedicated-teams': { image: qaSupportImg, icon: ShieldCheck },
};

export const SERVICES: Service[] = SERVICE_DATA.map((d) => ({ ...d, ...VISUALS[d.slug] }));

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
