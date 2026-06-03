import React from 'react'

const Map: React.FC = () => {
  return (
    <iframe 
      src="https://yandex.ru/map-widget/v1/?text=Владимир, микрорайон Коммунар, улица Песочная, 19&z=17"
      width="100%" 
      height="450" 
      frameBorder="0"
      style={{ display: 'block', border: 'none' }}
      title="Карта проезда - НТЦ НКИД"
      allowFullScreen={true}
      loading="lazy"
    ></iframe>
  )
}

export default Map