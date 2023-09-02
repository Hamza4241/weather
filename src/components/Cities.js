import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react';
import { decrement, increment, modify } from '../redux/cities'
import axios from "axios";


const Cities = () => {

    const count = useSelector((state) => state.cities.value);
    const cities = useSelector((state) => state.cities.myArray);
    const dispatch = useDispatch();

    const [location, setLocation] = useState('');
    const [data, setData] = useState({});
    const [showLocation, setShowLocation] = useState('');
    // const [imageCode, setImageCode] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=074d357f4482b7d0427f700aca9f3194`;
    const options = { weekday: 'long' };


    // const cityList = cities.map((city) =>  
    //   <li>{city.name}, {city.code}, {city.temp}</li>  
    // ); 



    const getInfo = (myName, ID) => {
      // setLocation(name);
      // console.log("This is the name you are looking for: " + name);
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${myName}&units=imperial&appid=074d357f4482b7d0427f700aca9f3194`).then((response) => {
          if (response.status === 200){
            setData(response.data);
            // console.log(response.data);
            setShowLocation(myName);
  
            const myCode = response.data.list[0].weather[0].icon;
            const myTemp = Math.trunc( (response.data.list[0].main.temp-32)*5/9 );
            // console.log("This is my code: " + myCode);
            // console.log("This is my temp: " + myTemp);
            const fetchImage = async (myCode) => {
              try {
                const imageUrl = `https://openweathermap.org/img/wn/${myCode}@2x.png`;
                setImageUrl(imageUrl);
                // console.log("This is your URL: " + imageUrl);
              } catch (error) {
                console.log('Error fetching image:', error);
              }
            };
  
            dispatch(modify({name: myName, code: myCode, temp: myTemp, id: ID}));
            // setImageCode(myCode);
            fetchImage(myCode);
  
          }
        }).catch((error) => {
            alert("Please Enter correct city name");
        })
        setLocation('');
    }



    


    const searchLocation = (event) => {
        if (event.key === 'Enter') {
          console.log("This is the name you are looking for: " + location);
          axios.get(url).then((response) => {
            if (response.status === 200){
              setData(response.data);
              // console.log(response.data);
              setShowLocation(location);
    
              const myCode = response.data.list[0].weather[0].icon;
              const myTemp = Math.trunc( (response.data.list[0].main.temp-32)*5/9 );
              // console.log("This is my code: " + myCode);
              // console.log("This is my temp: " + myTemp);
              const fetchImage = async (myCode) => {
                try {
                  const imageUrl = `https://openweathermap.org/img/wn/${myCode}@2x.png`;
                  setImageUrl(imageUrl);
                  // console.log("This is your URL: " + imageUrl);
                } catch (error) {
                  console.log('Error fetching image:', error);
                }
              };
    
              dispatch(increment({name: location, code: myCode, temp: myTemp}));
              // setImageCode(myCode);
              fetchImage(myCode);
    
            }
          }).catch((error) => {
              alert("Please Enter correct city name");
          })
          setLocation('');
        }
      }

  return (
    <div className='weather max-w-full my-6 flex flex-col lg:flex-row'>
        
        <div className='todays-weather basis-3/5 mr-3'>

          <div className="search">
              <input 
                  className='bg-slate-800 w-full text-sm py-2 px-3 rounded-2xl'
                  value={location}
                  onChange={event => setLocation(event.target.value)}
                  onKeyDown={searchLocation}
                  placeholder="Search for cities"
                  type="text"/>
          </div>
        
          {cities?.map((city, id) => (
            <div className='city-history bg-slate-700 rounded-2xl py-2 my-4 px-5 flex flex-col sm:flex-row sm:justify-between 
            h-fit sm:items-center hover:bg-slate-800 active:bg-slate-900 focus:bg-slate-900 focus:border-blue-500' key={id}>
              <div className='name-temp sm:basis-2/5 flex flex-row justify-between items-center'>
                <div className='name font-bold text-2xl'>
                  {city.name}
                </div>

                <div className='temp font-bold text-2xl'>
                  {city.temp}°
                </div>
              </div>

              <div className='image-btns sm:basis-3/5 flex flex-row justify-between items-center'>
                <div className='image'>
                  {imageUrl ? ( <img className='h-5/6' src={`https://openweathermap.org/img/wn/${city.code}@2x.png`} alt="Weather Icon" /> ) : ( null )}
                </div>

                <div className='btn'>
                  <button className='button rounded-2xl text-xs bg-blue-700 px-3 py-1 hover:bg-blue-800 focus:bg-slate-900 focus:border-blue-500 mr-2' 
                    onClick={() => getInfo(city.name, id)}>
                    See More
                  </button>
                  <button className='button rounded-2xl text-xs bg-red-700 px-3 py-1 hover:bg-red-800' 
                    onClick={() => dispatch(decrement(id))}>
                    Delete
                  </button>
                </div>
              </div>

            </div>  
          ))}
          {/* <div className='todays-forecast bg-slate-700 rounded-2xl p-5'>

          </div> */}

        </div>

        <div className='cities-weather basis-2/5 mt-16 ml-3 mr-10 bg-slate-700 rounded-2xl px-8 h-fit'>


      {data.list ? (
          <>

          <div className='main-info py-6 flex flex-row justify-between h-48'>

            <div className='right-info relative'>
              <div className="loaction text-4xl font-bold pb-2">
                  <p>{showLocation}</p>
              </div>
              
              <div className="rain text-slate-400 text-sm">
                  {data.list ? <p>Chance of rain: {(data.list[0].pop*100).toFixed(0)}%</p> : null}
              </div>

              {/* <div className="rain text-sm">
                  {data.list ? <p>Time: {data.list[0].dt_txt}</p> : null}
              </div> */}
            
              <div className="temp text-5xl font-extrabold absolute bottom-0">
                  {data.list ? <p>{Math.trunc( (data.list[0].main.temp-32)*5/9 )}°</p> : null}
              </div>
            </div>


          
            <div className="left-info weather-icon">
                {/* {data.list ? <img src={imageWeather} alt="icons" /> : null} */}
                {imageUrl ? ( <img className='h-5/6' src={imageUrl} alt="Weather Icon" /> ) : ( null )}
                {/* <p>Image Code: {imageCode}</p> */}
            </div>

          </div>


          <div className='horizontal-line my-2 w-30 h-px bg-slate-500'></div>



          <div className='todays-forecast bg-slate-700 rounded-2xl pt-4 pb-2'>
            <p className='heading-forecast text-sm text-slate-400 font-bold'>TODAY'S FORECAST</p>
            <div className='3hr-timestamp flex flex-row justify-between pt-3 pb-2'>
              
              <div className='+3hrs text-center'>

                <div className='time text-base text-slate-400 font-bold'>
                  {data.list ? <p>{data.list[1].dt_txt.substr(11,5)}</p> : null}
                </div>
                
                <div className='image'>
                  {imageUrl ? ( <img className='h-2/6' src={`https://openweathermap.org/img/wn/${data.list[1].weather[0].icon}@2x.png`} alt="Weather Icon" /> ) : ( <p>Loading image...</p> )}
                </div>
                
                <div className='temp'>
                  {data.list ? <p className='text-2xl font-bold'>{Math.trunc( (data.list[1].main.temp-32)*5/9 )}°</p> : null}
                </div>
                {/* {data.list ? <p>Time: {data.list[1].dt_txt}</p> : null} */}
              </div>
              
              <div className='vertival-line mx-2 w-px h-25 bg-slate-500'></div>
              

              <div className='+6hrs text-center'>

                <div className='time text-base text-slate-400 font-bold'>
                  {data.list ? <p>{data.list[2].dt_txt.substr(11,5)}</p> : null}
                </div>
                
                <div className='image'>
                  {imageUrl ? ( <img className='h-2/6' src={`https://openweathermap.org/img/wn/${data.list[2].weather[0].icon}@2x.png`} alt="Weather Icon" /> ) : ( <p>Loading image...</p> )}
                </div>
                
                <div className='temp'>
                  {data.list ? <p className='text-2xl font-bold'>{Math.trunc( (data.list[2].main.temp-32)*5/9 )}°</p> : null}
                </div>
                {/* {data.list ? <p>Time: {data.list[1].dt_txt}</p> : null} */}
              </div>

              <div className='vertival-line mx-2 w-px h-25 bg-slate-500'></div>

              <div className='+9hrs text-center'>

                <div className='time text-base text-slate-400 font-bold'>
                  {data.list ? <p>{data.list[3].dt_txt.substr(11,5)}</p> : null}
                </div>

                <div className='image'>
                  {imageUrl ? ( <img className='h-2/6' src={`https://openweathermap.org/img/wn/${data.list[3].weather[0].icon}@2x.png`} alt="Weather Icon" /> ) : ( <p>Loading image...</p> )}
                </div>

                <div className='temp'>
                  {data.list ? <p className='text-2xl font-bold'>{Math.trunc( (data.list[3].main.temp-32)*5/9 )}°</p> : null}
                </div>
                {/* {data.list ? <p>Time: {data.list[1].dt_txt}</p> : null} */}
              </div>

            </div>

          </div>



          <div className='horizontal-line my-2 w-30 h-px bg-slate-500'></div>




          <div className='next-days-weather basis-2/5 mt-4 bg-slate-700 rounded-2xl pt-2'>
          
          <p className='heading-air-condition text-sm text-slate-400 font-bold'>3-DAY FORECAST</p>

          <div className='6-day-forecast flex flex-col justify-between pt-1 pb-2'>
              
              <div className='today flex flex-row justify-between items-center'>

                <div className='day text-base text-slate-400'>
                  {data.list ? <p>Today</p> : null}
                </div>
                
                <div className='image flex items-center'>
                  {imageUrl ? ( <img className='h-4/6' src={`https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`} alt="Weather Icon" /> ) : ( null )}
                  {data.list ? <p>{data.list[0].weather[0].description.charAt(0).toUpperCase() + data.list[0].weather[0].description.slice(1)}</p> : null}
                </div>
                
                <div className='temp'>
                  {data.list ? <p className='text-base font-semibold flex'>{Math.trunc( (data.list[0].main.temp_max-32)*5/9 )}/<p className='text-slate-400'>{Math.trunc( (data.list[0].main.temp_min-32)*5/9 )}</p></p> : null}
                </div>
                {/* {data.list ? <p>Time: {data.list[1].dt_txt}</p> : null} */}
              </div>

              <div className='horizontal-line my-2 w-30 h-px bg-slate-500'></div>
              







              <div className='+1day flex flex-row justify-between items-center'>

                <div className='day text-base text-slate-400'>
                  {data.list ? <p>{(new Date(data.list[8].dt_txt).toLocaleString('en-US', options)).substr(0, 3)}</p> : null}
                </div>
                
                <div className='image flex items-center'>
                  {imageUrl ? ( <img className='h-4/6' src={`https://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png`} alt="Weather Icon" /> ) : ( null )}
                  {data.list ? <p>{data.list[8].weather[0].description.charAt(0).toUpperCase() + data.list[8].weather[0].description.slice(1)}</p> : null}
                </div>
                
                <div className='temp'>
                  {data.list ? <p className='text-base font-semibold flex'>{Math.trunc( (data.list[8].main.temp_max-32)*5/9 )}/<p className='text-slate-400'>{Math.trunc( (data.list[8].main.temp_min-32)*5/9 )}</p></p> : null}
                </div>
                {/* {data.list ? <p>Time: {data.list[1].dt_txt}</p> : null} */}
              </div>

              <div className='horizontal-line my-2 w-30 h-px bg-slate-500'></div>




              <div className='+2day flex flex-row justify-between items-center'>

                <div className='day text-base text-slate-400'>
                  {data.list ? <p>{(new Date(data.list[16].dt_txt).toLocaleString('en-US', options)).substr(0, 3)}</p> : null}
                </div>
                
                <div className='image flex items-center'>
                  {imageUrl ? ( <img className='h-4/6' src={`https://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png`} alt="Weather Icon" /> ) : ( null )}
                  {data.list ? <p>{data.list[16].weather[0].description.charAt(0).toUpperCase() + data.list[16].weather[0].description.slice(1)}</p> : null}
                </div>
                
                <div className='temp'>
                  {data.list ? <p className='text-base font-semibold flex'>{Math.trunc( (data.list[16].main.temp_max-32)*5/9 )}/<p className='text-slate-400'>{Math.trunc( (data.list[16].main.temp_min-32)*5/9 )}</p></p> : null}
                </div>
                {/* {data.list ? <p>Time: {data.list[1].dt_txt}</p> : null} */}
              </div>

            </div>
        </div>
        </>


        ) :
      //  Section start which displays info only when nothing is fetched from API
       <>

        <div className='todays-forecast basis-full rounded-2xl p-5 h-44 flex justify-center items-center'>
            <p className='heading-forecast text-xl text-slate-300 font-bold'>Click "See More" to get more info about cities’ weather</p>
        </div>

       </> 
      //  Section ends which displays info only when nothing is fetched from API
      }






        </div>
    </div>
  )
}

export default Cities