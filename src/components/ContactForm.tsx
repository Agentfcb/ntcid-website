import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { addApplication } from '../utils/applications'

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '+7 ',
    email: '',
    serviceType: '',
    message: '',
    preferredDate: '',
    organization: ''
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [minDate, setMinDate] = useState('')

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    setMinDate(today)
  }, [])

  const formatPhone = (value: string): string => {
    const numbers = value.replace(/\D/g, '')
    let cleaned = numbers
    if (numbers.startsWith('7')) {
      cleaned = numbers.slice(1)
    } else if (numbers.startsWith('8')) {
      cleaned = numbers.slice(1)
    } else if (numbers.length === 0) {
      return '+7 '
    }

    let formatted = '+7'
    
    if (cleaned.length > 0) {
      formatted += ' (' + cleaned.slice(0, 3)
    }
    if (cleaned.length >= 3) {
      formatted += ') ' + cleaned.slice(3, 6)
    }
    if (cleaned.length >= 6) {
      formatted += '-' + cleaned.slice(6, 8)
    }
    if (cleaned.length >= 8) {
      formatted += '-' + cleaned.slice(8, 10)
    }

    return formatted
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target

    if (name === 'phone') {
      const formattedPhone = formatPhone(value)
      if (formattedPhone.startsWith('+7') && formattedPhone.length <= 18) {
        setFormData({
          ...formData,
          phone: formattedPhone
        })
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight']
    if (!/\d/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault()
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setStatus('sending')

    try {
      // Сохраняем заявку в localStorage
      addApplication({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        serviceType: formData.serviceType,
        message: formData.message,
        preferredDate: formData.preferredDate,
        organization: formData.organization
      })
      
      setStatus('success')
      setFormData({
        name: '',
        phone: '+7 ',
        email: '',
        serviceType: '',
        message: '',
        preferredDate: '',
        organization: ''
      })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      console.error('Error:', error)
      setStatus('error')
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Ваше имя *</label>
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
          <label htmlFor="organization">Организация</label>
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
          <label htmlFor="phone">Телефон *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onKeyDown={handlePhoneKeyDown}
            placeholder="+7 (___) ___-__-__"
            required
            maxLength={18}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email *</label>
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
        <label htmlFor="serviceType">Тип услуги *</label>
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
        <label htmlFor="preferredDate">Желаемая дата начала работ</label>
        <input
          type="date"
          id="preferredDate"
          name="preferredDate"
          value={formData.preferredDate}
          onChange={handleChange}
          min={minDate}
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Описание задачи / обращения</label>
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
          <input type="checkbox" required style={{ marginTop: '5px', width: 'auto' }} />
          <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
            Я согласен на обработку персональных данных *
          </span>
        </label>
      </div>
      
      <button 
        type="submit" 
        className="btn btn-large"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Отправка...' : 'Отправить заявку'}
      </button>

      {status === 'success' && (
        <div style={{ 
          marginTop: '1rem',
          padding: '1rem', 
          background: '#10b981', 
          borderRadius: '8px',
          color: 'white',
          textAlign: 'center'
        }}>
          ✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
        </div>
      )}

      {status === 'error' && (
        <div style={{ 
          marginTop: '1rem',
          padding: '1rem', 
          background: '#ef4444', 
          borderRadius: '8px',
          color: 'white',
          textAlign: 'center'
        }}>
          ❌ Ошибка при отправке. Попробуйте ещё раз.
        </div>
      )}
    </form>
  )
}

export default ContactForm