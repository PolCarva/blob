import RipplesTitle from '@/components/RipplesTitle'
import SkillsCloud from '@/components/SkillsCloud'

export default function Page() {
  return (
    <main className="">
      <div className='min-h-screen relative flex items-center justify-center bg-black'>
        <RipplesTitle />
        <h1 className='sr-only'>pablo carvalho | full stack developer based on uruguay</h1>
      
      </div>
      <div className='min-h-screen grid grid-cols-2 relative items-center justify-center bg-white'>
        <div className='w-full h-full'>
        </div>
        <div className='w-full h-full'>
          <SkillsCloud/>
        </div>
      </div>
    </main>
  )
}