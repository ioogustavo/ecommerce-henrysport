import React, { useState } from 'react';
import Slider from "infinite-react-carousel";
import "./Slider.css";
import Imagen1 from '../../images/adidas.jpg'
import Imagen2 from '../../images/Niketenis.jpg'
import {Carousel,CarouselItem,CarouselControl,CarouselIndicators, CarouselCaption} from 'reactstrap';


const items = [
  {
    src:  'https://moov.vteximg.com.br/arquivos/ids/531712/1280x645_am2090.jpg?v=637329185005970000'
  },
  {
    src: 'https://www.digitalsport.com.ar/files/banners/6cbec93289af22f126d42eaf0f4037c4.jpg'
  },
  {
    src:  'https://www.digitalsport.com.ar/files/banners/1acb48f8c17f8915d73a05d2a4a5083e.jpg'
  },
  {
    src: 'https://www.digitalsport.com.ar/files/banners/f7fb22020508eb7ae9baab71a28e9627.jpg',
  }
];

const Slide2 = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <div>
          <img height='360' className="img" src={item.src} alt={item.altText} />
        </div>
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default Slide2;