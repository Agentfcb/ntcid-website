import React from 'react'
import ContactForm from '../components/ContactForm'
import Map from '../components/Map.tsx'
import { ContactInfo } from '../types'

// Импортируем все нужные иконки
import locationIcon from '../assets/icons/location.png'
import phoneIcon from '../assets/icons/phone.png'
import emailIcon from '../assets/icons/email.png'
import clockIcon from '../assets/icons/clock.png'

const Contact: React.FC = () => {
  const contactInfo: ContactInfo[] = [
    {
      icon: locationIcon,
      title: 'Адрес',
      content: 'г. Владимир, ул. Песочная\nмикрорайон Коммунар'
    },
    {
      icon: phoneIcon,
      title: 'Телефон',
      content: '+7 (910) 775-72-50'
    },
    {
      icon: emailIcon,
      title: 'Email',
      content: 'Hizd.nk@gmail.com'
    },
    {
      icon: clockIcon,
      title: 'Режим работы',
      content: 'Понедельник - Пятница: 9:00 - 18:00\nСуббота - Воскресенье: выходной'
    }
  ]

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Контакты</h1>
          <p>Свяжитесь с нами для получения консультации и расчета стоимости</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h3>Контактная информация</h3>
              
              {contactInfo.map((item: ContactInfo, index: number) => (
                <div className="contact-item" key={index}>
                  <div className="contact-icon">
                    <img src={item.icon} alt={item.title} />
                  </div>
                  <div>
                    <strong>{item.title}</strong>
                    <p style={{ whiteSpace: 'pre-line' }}>{item.content}</p>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: '3rem', padding: '2rem', background: '#1e293b', borderRadius: '12px' }}>
                <h3 style={{ marginBottom: '1rem', color: '#e2e8f0' }}>Реквизиты компании</h3>
                <p style={{ color: '#94a3b8', lineHeight: '2' }}>
                  <strong>ООО НТЦ «НКИД»</strong><br />
                  Научно-технический центр<br />
                  «Неразрушающий контроль и диагностика»<br />
                  ИНН: 3329088935<br />
                  КПП: 332901001<br />
                  ОГРН: 1173328000086
                </p>
              </div>
            </div>

            <div>
              <h3 style={{ marginBottom: '1.5rem', color: '#e2e8f0' }}>Отправить сообщение</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Секция с картой */}
      <section className="section" style={{ background: '#1e293b', paddingTop: '0' }}>
        <div className="container">
          <h2 className="section-title">Как нас найти</h2>
          <p className="section-subtitle">
            г. Владимир, ул. Песочная, микрорайон Коммунар
          </p>
          <div style={{ 
            background: '#0f172a', 
            borderRadius: '16px', 
            overflow: 'hidden',
            border: '1px solid #334155'
          }}>
            <Map />
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
