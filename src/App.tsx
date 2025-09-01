import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AboutSection from './components/AboutSection';
import ProfileSection from './components/ProfileSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopOnMount from './components/ScrollToTopOnMount';
import ProjectDetail from './components/ProjectDetail';
import './App.css';

// 메인 포트폴리오 페이지 컴포넌트
const MainPage: React.FC = () => (
  <>
    <main>
      <AboutSection />
      <ProfileSection />
      <SkillsSection />
      <ProjectsSection />
    </main>
    <Footer />
    <ScrollToTop />
  </>
);

function App() {
  return (
    <Router>
      <ScrollToTopOnMount />
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
