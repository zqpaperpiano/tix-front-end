import React from "react";
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import TaylorSwift from '../assets/TaylorSwift.jpeg' 
import UFC from '../assets/UFC.jpeg'

const HomePage = ({onRouteChange}) => {
    return(
        <Carousel className="carousel-format" 
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showArrows={true}
          width={1100}>
            <div>
              <img onClick={() => {onRouteChange('TSInfo')}} className="taylor-2" alt="Taylor swift" src={TaylorSwift} />
            </div>

            <div>
              <img className="UFC-2" alt="Ufc" src={UFC} />
            </div>

          </Carousel>
    );
}

export default HomePage;