import React from 'react'
import Navbar from '../../Navbar/Navbar'
import ContactSection from '../../ContactSection/ContactSection'
import Footer from '../../Footer/Footer'
import TeamSection from '../TeamSection/TeamSection'
import CompanyIntroSection from '../CompanyIntroSection/CompanyIntroSection'
import FullWidthImageSection from '../FullWidthImageSection/FullWidthImageSection'
import ServicesOverviewSection from '../ServicesOverviewSection/ServicesOverviewSection'
import SolomiaNews from '../SolomiaNews/SolomiaNews'
import AwardGallery from '../AwardGallery/AwardGallery'
import AwardsSection from '../AwardsSection/AwardsSection'
import BeforeAfterSlider from '../BeforeAfterSlider/BeforeAfterSlider'

function AboutSection() {
  return (
    <>
      <Navbar />
      <TeamSection />
      <CompanyIntroSection />
            <BeforeAfterSlider />

      <FullWidthImageSection />
      <ServicesOverviewSection />
      <SolomiaNews />
      <AwardGallery />
      <AwardsSection />
      <ContactSection />
      <Footer />
    </>
  )
}

export default AboutSection
