import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IdeLayout from './components/ide/IdeLayout';
import AboutSection from './components/AboutSection';
import ProfileSection from './components/ProfileSection';
import SkillsSection from './components/SkillsSection';
import WorkMapSection from './components/WorkMapSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import ScrollToTopOnMount from './components/ScrollToTopOnMount';
import ProjectDetail from './components/ProjectDetail';
import useReveal from './hooks/useReveal';
import './App.css';

// 메인 페이지: 섹션마다 저장소 안 파일 하나처럼 보인다
const MainPage: React.FC = () => {
  // 스크롤 진입 효과 (CSS 스크롤 타임라인을 못 쓰는 브라우저용)
  useReveal();

  return (
    <>
      <main>
        <AboutSection />
        <ProfileSection />
        <SkillsSection />
        <WorkMapSection />
        <ProjectsSection />
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTopOnMount />
      <IdeLayout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </IdeLayout>
    </Router>
  );
}

export default App;
