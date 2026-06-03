import React from 'react'
import { ServiceCardProps } from '../types'

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
  return (
    <div className="service-card fade-in">
      <div className="service-icon">
        <img src={icon} alt={title} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default ServiceCard