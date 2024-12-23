import { useState, useEffect } from 'react'
import Main from './components/main'
import Footer from './components/Footer'
import SideBar from './components/SideBar'



function App(){
  const[data, setData] = useState(null)
  const[loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // function for allowing the description to display
  function handleToggleModal(){
    setShowModal(!showModal)
  }

  // useEffect to fetch data from out api
  useEffect(() => {
    async function fetchAPIData(){
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
      const url = 'https://api.nasa.gov/planetary/apod' + 
      `?api_key=${NASA_KEY}`

      const today = (new Date().toDateString())
      const localKey = `NASA-${today}`
      if(localStorage.getItem(localKey)){
        const apiData = JSON.parse(localStorage.getItem(localKey))
        setData(apiData)
        console.log('Fetched from cache today')
        return
      }
      localStorage.clear()
      try{
        const response = await fetch(url)
        const api_data = await response.json()
        localStorage.setItem(localKey, JSON.stringify(api_data))
        setData(api_data)
        //console.log('DATA\n',api_data)
        console.log('Fetched from Api today')
      }catch(err){
        console.log(err.message)
      }
    }
    fetchAPIData();
  },[])
  return (
    <>
  
     {data ? (<Main data={data} />) : 
      <div className ="loadingState">
        <i className="fa-solid fa-gear"></i>
      </div>
     }
     {showModal && (
      <SideBar data={data} handleToggleModal={handleToggleModal}/>)}
     {data && (<Footer data={data} handleToggleModal={handleToggleModal}/>)}
    </>
  )

}
export default App
