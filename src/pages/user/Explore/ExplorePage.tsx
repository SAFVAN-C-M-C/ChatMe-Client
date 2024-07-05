import NavigationBar from '@/components/general/NavigationBar'
import { Icon } from '@iconify/react'

import React from 'react'

function ExplorePage() {
  return (
    <>
    <div className="flex   ">
        <NavigationBar/>
        <div className="main-container flex">

            <div className="header m-3 flex items-center">
                <span className='font-semibold text-xl'>Explore With ChatMe</span><Icon icon={"iconamoon:arrow-right-2-bold"} width={26} height={26}/>
            </div>
            
        </div>
        
      </div>
    </>
  )
}

export default ExplorePage