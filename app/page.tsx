import Banner from '@/components/banner'
import Footer from '@/components/footer'
import { TeamSection } from '@/components/team-sections'

export default function Home() {
  return (
    <>
      <Banner />
      <main className="h-full">
        <TeamSection />
      </main>
      <Footer />
    </>
  )
}
