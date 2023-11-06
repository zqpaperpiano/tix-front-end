import React from "react";
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import TaylorSwift from '../assets/TaylorSwift.jpeg' 
import UFC from '../assets/UFC/UFC.jpeg'
import './Home.css'

const HomePage = ({onRouteChange}) => {
    return(
        <div className="carousel">
          <Carousel className="carousel-format" 
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showArrows={true}
          onClickItem={(index) => {
            if(index === 0){
              onRouteChange("TSInfo");
            } else if (index === 1){
              onRouteChange("UFCInfo");
            }

          }}
          width={1200}>
            <div>
              <img className="taylor-2" alt="Taylor swift" src={TaylorSwift} />
            </div>

            <div>
              <img className="UFC-2" alt="Ufc" src={UFC} />
            </div>

          </Carousel>
        </div>
    );
}

export default HomePage;