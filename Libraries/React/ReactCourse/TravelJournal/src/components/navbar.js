import React from 'react'
import globe from '../assets/globe.svg'


function Header(){

    return(

        <nav className='navbar'> <span className='navbar-span'><img src={globe} alt="globe"></img>My Travel Journal</span></nav>       
    )

}
export default Header