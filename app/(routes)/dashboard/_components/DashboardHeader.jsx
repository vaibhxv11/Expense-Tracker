

import { UserButton } from '@clerk/nextjs';
import React from 'react';
import SearchBar from './SearchBar';
import SuprSendInbox from '@suprsend/react-inbox'
import 'react-toastify/dist/ReactToastify.css' // needed for toast notifications, can be ignored if hideToast=true
function DashboardHeader() {
  const handleSearch = (query) => {
    console.log('Search query:', query);
    // Add your search logic here
  };

  return (
    <div className='p-5 shadow-sm border-b flex justify-between items-center'>
       <SuprSendInbox
        workspaceKey="xpLyV4ZCOO1PxLqHrd0S"
        subscriberId="frVOEulH7f16DgmSLgtv9zUTq-EmgtZ6d6fxY5mUtAQ"
        distinctId="frVOEulH7f16DgmSLgtv9zUTq-EmgtZ6d6fxY5mUtAQ"
       
                />
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
