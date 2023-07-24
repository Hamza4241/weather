import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUmbrella, faCloudSunRain, faListUl, faMap, faSliders, faMagnifyingGlassLocation } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

export default function navbar() {
  return (
    <div className='navbar w-20 bg-slate-700 rounded-2xl my-6 ml-8 mr-5 h-screen py-8 flex flex-col'>
      <div className='icon mx-auto'>
        <FontAwesomeIcon icon={faUmbrella} />
      </div>
      
      <div className='pages mt-20 flex flex-col space-y-5 text-gray-400'>
        
        <div className='weather flex'>
          <Link className="menu-item mx-auto flex flex-col text-center hover:text-white active:text-white focus:text-white" to="/"> 
            <div className='icon-weather mx-auto'>
              <FontAwesomeIcon icon={faCloudSunRain}/>
            </div>
            <h1>Weather</h1>
          </Link>
        </div>

        <div className='cities flex'>
          <Link className="menu-item mx-auto flex flex-col text-center hover:text-white active:text-white focus:text-white" to="/cities"> 
            <div className='icon-cities mx-auto'>
              <FontAwesomeIcon icon={faListUl} />
            </div>
            <h1>Cities</h1>
          </Link>
        </div>

        <div className='map flex'>
          <Link className="menu-item mx-auto flex flex-col text-center hover:text-white active:text-white focus:text-white" to="/search"> 
            <div className='icon-map mx-auto'>
              <FontAwesomeIcon icon={faMagnifyingGlassLocation} />
            </div>
            <h1>Forecast</h1>
          </Link>
        </div>

        {/* <div className='settings flex'>
          <Link className="menu-item mx-auto flex flex-col hover:text-white active:text-white focus:text-white" to="/"> 
            <div className='icon-settings mx-auto'>
              <FontAwesomeIcon icon={faSliders} />
            </div>
            <h1>Settings</h1>
          </Link>
        </div> */}



      </div>

      
    </div>
  )
}
