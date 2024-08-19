import React from 'react'
import NavBar from '../components/NavBar';

const LandingPage = () => {
  return (
    <div className="container h-screen w-screen flex flex-col justify-center items-center">
      <NavBar className={'absolute top-0 left-0'}/>
      L A N D I N G  P A G E
    </div>
  );
}

export default LandingPage