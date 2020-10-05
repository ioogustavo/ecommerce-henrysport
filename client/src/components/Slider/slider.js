import React, { useState } from 'react';
import {Carousel,CarouselItem,CarouselControl,CarouselIndicators, CarouselCaption} from 'reactstrap';
import Imagen1 from '../../images/armadawin.jpg';
import Imagen2 from '../../images/nike5.jpg';
import Imagen3 from '../../images/airjordan.jpg';
import "./Slider.css";
const items = [
  {
    src:  'https://dexter.vteximg.com.br/arquivos/ids/576840/1360x570_topper30.jpg?v=637338680971500000'
  },
  {
    src: 'https://dexter.vteximg.com.br/arquivos/ids/575644/1360x570_react-infinity.jpg?v=637329174729900000'
  },
  {
    src:  'https://dexter.vteximg.com.br/arquivos/ids/576840/1360x570_topper30.jpg?v=637338680971500000'
  },
  {
    src: 'https://dexter.vteximg.com.br/arquivos/ids/575646/1360x570_uacharged.jpg?v=637329178003130000',
  }
];

const Slide = (props) => {
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

export default Slide;