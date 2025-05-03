import RipplesTitle from '@/components/RipplesTitle'
import SkillsCloud from '@/components/SkillsCloud'

export default function Page() {
  return (
    <main className="">
      <div className='min-h-screen relative flex items-center justify-center bg-black'>
        <RipplesTitle />
        <h1 className='sr-only'>pablo carvalho | full stack developer based on uruguay</h1>

      </div>
      <div className='min-h-screen grid xl:grid-cols-2 grid-cols-1 relative items-center justify-center bg-white'>
        <div className='w-full h-full bg-red-500'>
        </div>
        <div className='w-full h-full'>
          <SkillsCloud />
        </div>
      </div>
      <div className='min-h-screen bg-black'>
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="w-full max-w-4xl aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/MyQ8YzgqVdY"
              title="Pablo Carvalho - Portfolio Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  )
}