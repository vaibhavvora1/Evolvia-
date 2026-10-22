import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';

// Route-based code splitting with React.lazy
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Works = lazy(() => import('./pages/Works'));
const WorkDetail = lazy(() => import('./pages/WorkDetail'));
const Technologies = lazy(() => import('./pages/Technologies'));
const TechnologyDetail = lazy(() => import('./pages/TechnologyDetail'));
const Team = lazy(() => import('./pages/Team'));
const TeamDetail = lazy(() => import('./pages/TeamDetail'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Careers = lazy(() => import('./pages/Careers'));
const CareerDetail = lazy(() => import('./pages/CareerDetail'));
const ApplyForm = lazy(() => import('./pages/ApplyForm'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Main Navigation Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/works" element={<Works />} />
        <Route path="/works/:slug" element={<WorkDetail />} />
        <Route path="/technology" element={<Technologies />} />
        <Route path="/technology/:slug" element={<TechnologyDetail />} />
        <Route path="/team" element={<Team />} />
        <Route path="/team/:slug" element={<TeamDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/:slug" element={<CareerDetail />} />
        <Route path="/careers/:slug/apply" element={<ApplyForm />} />
        <Route path="/contact" element={<Contact />} />

        {/* Legal Routes */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />

        {/* Route Aliases for Backwards Compatibility */}
        <Route path="/solutions" element={<Navigate to="/services" replace />} />
        <Route path="/solutions/:slug" element={<ServiceDetail />} />
        <Route path="/portfolio" element={<Navigate to="/works" replace />} />
        <Route path="/portfolio/:slug" element={<WorkDetail />} />
        <Route path="/technologies" element={<Navigate to="/technology" replace />} />
        <Route path="/technologies/:slug" element={<TechnologyDetail />} />
        <Route path="/our-team" element={<Navigate to="/team" replace />} />
        <Route path="/our-works" element={<Navigate to="/works" replace />} />
        <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
        <Route path="/terms" element={<Navigate to="/terms-of-service" replace />} />

        {/* 404 Catch-All */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
