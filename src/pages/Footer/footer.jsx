import React from 'react'
import './footer.css'
import icons from '../../assets/icons'

const footer = ({isDarkMode}) => {
  return (
    <div className='footer' style={{backgroundColor:isDarkMode?'#000':'#f7f7ff'}}>
      <div className="left" style={{color:isDarkMode?'#fff':'#000'}}>
        <h4>© 2024 • Yashavantha P</h4>
      </div>
      <div className="right">
        <div className="icon">
          <a href="https://www.instagram.com/rogue_rockyy._/?next=%2F"><div className="image-contain"><img src={isDarkMode?icons[0]:icons[1]} alt="" /></div></a>
          <a href="https://www.linkedin.com/in/yashavantha-p-a66607296/"><div className="image-contain"><img src={isDarkMode?icons[2]:icons[3]} alt="" /></div></a>
          <a href="https://github.com/YASHAVANTHAP"><div className="image-contain"><img src={isDarkMode?icons[4]:icons[5]} alt="" /></div></a>
          <a href="https://x.com/Yashavanth67374"><div className="image-contain"><img src={isDarkMode?icons[6]:icons[7]} alt="" /></div></a>
        </div>
      </div>
    </div>
  )
}

export default footer