import React from 'react'
import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher'
import Navbar from '../../components/Navbar/Navbar'
import HeroSection from '../../components/HeroSection/HeroSection'
import AboutSection from '../../components/AboutSection/AboutSection'
import ProjectsHeader from '../../components/ProjectsHeader/ProjectsHeader'
import ProjectsGrid from '../../components/ProjectsGrid/ProjectsGrid'
import UpdatedSection from '../../components/UpdatedSection/UpdatedSection'
// import VideoHero from '../../components/VideoHero/VideoHero'
import ContactSection from '../../components/ContactSection/ContactSection'
import Footer from '../../components/Footer/Footer'

function Hero() {
  return (
    <>
    <Navbar />
    <HeroSection />
    <AboutSection />
    <ProjectsHeader />
    <ProjectsGrid />
    <UpdatedSection />
    {/* <VideoHero /> */}
    <ContactSection />
    <Footer />
    </>
  )
}

export default Hero
