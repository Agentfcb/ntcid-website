import React, { useState, ChangeEvent, FormEvent } from 'react'
import { FormData } from '../types'

import userIcon from '../assets/icons/user.png'
import emailIcon from '../assets/icons/email.png'
import phoneIcon from '../assets/icons/phone.png'
import messageIcon from '../assets/icons/message.png'
import sendIcon from '../assets/icons/send.png'

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">
          <img src={userIcon} alt="" className="form-icon" />
          Ваше имя *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">
          <img src={emailIcon} alt="" className="form-icon" />
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="phone">
          <img src={phoneIcon} alt="" className="form-icon" />
          Телефон
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="message">
          <img src={messageIcon} alt="" className="form-icon" />
          Сообщение *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      
      <button type="submit" className="btn">
        <img src={sendIcon} alt="" className="btn-icon" />
        Отправить сообщение
      </button>
    </form>
  )
}

export default ContactForm