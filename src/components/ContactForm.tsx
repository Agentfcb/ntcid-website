import React, { useState, ChangeEvent, FormEvent } from 'react'

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: '',
    message: '',
    preferredDate: '',
    organization: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время для уточнения деталей.')
    setFormData({
      name: '',
      phone: '',
      email: '',
      serviceType: '',
      message: '',
      preferredDate: '',
      organization: ''
    })
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">
            Ваше имя *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Иванов Иван Иванович"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="organization">
            Организация
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            placeholder="ООО «Пример»"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="phone">
            Телефон *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+7 (___) ___-__-__"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@mail.ru"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="serviceType">
          Тип услуги *
        </label>
        <select
          id="serviceType"
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          required
        >
          <option value="">Выберите услугу</option>
          <option value="ndt">Неразрушающий контроль</option>
          <option value="expertise">Экспертиза промышленной безопасности</option>
          <option value="construction">Строительство и коммуникации</option>
          <option value="lab">Лабораторные исследования</option>
          <option value="diagnostics">Техническое обследование</option>
          <option value="consulting">Консалтинг и аудит</option>
          <option value="other">Другое</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="preferredDate">
          Желаемая дата начала работ
        </label>
        <input
          type="date"
          id="preferredDate"
          name="preferredDate"
          value={formData.preferredDate}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">
          Описание задачи / обращения 
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Опишите ваш объект, объем работ, сроки и другие детали..."
          style={{ minHeight: '150px' }}
        ></textarea>
      </div>

      <div className="form-group">
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            required
            style={{ marginTop: '5px', width: 'auto' }}
          />
          <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
            Я согласен на обработку персональных данных в соответствии с 
            <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6' }}> политикой конфиденциальности</a> *
          </span>
        </label>
      </div>
      
      <button type="submit" className="btn btn-large">
        Отправить заявку
      </button>

      <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#64748b', textAlign: 'center' }}>
        Или позвоните нам: <a href="tel:+79107757250" style={{ color: '#3b82f6' }}>+7 (910) 775-72-50</a>
      </p>
    </form>
  )
}

export default ContactForm