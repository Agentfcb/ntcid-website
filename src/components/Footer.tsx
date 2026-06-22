import React from 'react'
import { Link } from 'react-router-dom'

import phoneIcon from '../assets/icons/phone.png'
import emailIcon from '../assets/icons/email.png'
import clockIcon from '../assets/icons/clock.png'

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>ООО НТЦ «НКИД»</h4>
            <p>
              Научно-технический центр «Неразрушающий контроль и диагностика»<br />
              г. Владимир, ул. Песочная, мкр. Коммунар
            </p>
          </div>
          
          <div className="footer-section">
            <h4>Услуги</h4>
            <Link to="/services">Неразрушающий контроль</Link><br />
            <Link to="/services">Экспертиза</Link><br />
            <Link to="/services">Строительство</Link>
          </div>
          
          <div className="footer-section">
            <h4>Компания</h4>
            <Link to="/about">О нас</Link><br />
            <Link to="/about">Преимущества</Link><br />
            <Link to="/contact">Контакты</Link>
          </div>
          
          <div className="footer-section">
            <h4>Контакты</h4>
            <p>
              <img src={phoneIcon} alt="Телефон" className="footer-icon" />
              +7 (910) 775-72-50
            </p>
            <p>
              <img src={emailIcon} alt="Email" className="footer-icon" />
              Hizd.nk@gmail.com
            </p>
            <p>
              <img src={clockIcon} alt="Время" className="footer-icon" />
              Пн-Пт: 9:00 - 18:00
            </p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 ООО НТЦ «НКИД». Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
