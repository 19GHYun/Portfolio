import React from 'react';
import Header from './components/Header';
import AboutSection from './components/AboutSection';
import ProfileSection from './components/ProfileSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <AboutSection />
        <ProfileSection />
        <SkillsSection />
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
