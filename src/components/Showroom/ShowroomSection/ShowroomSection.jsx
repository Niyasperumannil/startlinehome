import React from 'react'
import Navbar from '../../Navbar/Navbar'
import ContactSection from '../../ContactSection/ContactSection'
import Footer from '../../Footer/Footer'
import VideoHero from '../../VideoHero/VideoHero'
import InteriorShowcase from '../InteriorShowcase/InteriorShowcase'
import InteriorGallery from '../InteriorGallery/InteriorGallery'

function ShowroomSection() {
  return (
    <>
      <Navbar />
      <VideoHero />
      <InteriorShowcase />
      <InteriorGallery />
      <ContactSection />
      <Footer />
    </>
  )
}

export default ShowroomSection
