import React from 'react'
import Navigation from './LandingNav/Navigations'
const LandingLayout =(props)=>{
  const authToken = localStorage.getItem("token");
    return(
        <div>
            <Navigation children={props.children}/>
            
            {!authToken && <main>
                {props.children}
            </main>}
        </div>
    )
}

export default LandingLayout