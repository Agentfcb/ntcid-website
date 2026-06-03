import React from 'react'
import { AdvantageCardProps } from '../types'

const AdvantageCard: React.FC<AdvantageCardProps> = ({ icon, title, description }) => {
  return (
    <div className="advantage-card fade-in">
      <div className="advantage-icon">
        <img src={icon} alt={title} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default AdvantageCard