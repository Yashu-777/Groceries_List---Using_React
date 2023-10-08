import React from 'react'

const Footer = ({length}) => {
  return (
    <footer>
        <h3>{length} {length===1 ? "item" : "items"} in list</h3>
    </footer>
  )
}

export default Footer