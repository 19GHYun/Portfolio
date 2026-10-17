import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AboutSection from './components/AboutSection';
import FeaturedSection from './components/FeaturedSection';
import ProfileSection from './components/ProfileSection';
import SkillsSection from './components/SkillsSection';
import WorkMapSection from './components/WorkMapSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopOnMount from './components/ScrollToTopOnMount';
import ProjectDetail from './components/ProjectDetail';
import useReveal from './hooks/useReveal';
import './App.css';

// 메인 포트폴리오 페이지 컴포넌트
const MainPage: React.FC = () => {
  // 스크롤 진입 시 .reveal 요소를 순서대로 노출시킨다
  useReveal();

  // 스킬을 누르면 프로젝트 목록을 그 기술로 거른다
  const [tech, setTech] = useState<string | null>(null);

  const pickTech = useCallback((name: string) => {
    setTech((current) => (current === name ? null : name));
    window.setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }, 30);
  }, []);

  return (
    <>
      <main>
        <AboutSection />
        <FeaturedSection />
        <ProfileSection />
        <SkillsSection onPick={pickTech} active={tech} />
        <WorkMapSection />
        <ProjectsSection tech={tech} onClearTech={() => setTech(null)} />
      </main>
      <Footer withContact />
      <ScrollToTop />
    </>
  );
};

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
