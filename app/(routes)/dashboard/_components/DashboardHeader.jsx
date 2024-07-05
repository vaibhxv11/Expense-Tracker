// import { UserButton } from '@clerk/nextjs'
// import React from 'react'

// function DashboardHeader() {
//   return (
//     <div className='p-5 shadow-sm border-b flex justify-between '>
        
//         <div>

//             Search Bar
//         </div>

//         <div>
//             <UserButton/>

//         </div>
        
        
//         </div>
//   )
// }

// export default DashboardHeader

import { UserButton } from '@clerk/nextjs';
import React from 'react';
import SearchBar from './SearchBar';

function DashboardHeader() {
  const handleSearch = (query) => {
    console.log('Search query:', query);
    // Add your search logic here
  };

  return (
    <div className='p-5 shadow-sm border-b flex justify-between items-center'>
      <div>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div>
        <UserButton />
      </div>
    </div>
  );
}

export default DashboardHeader;
