import React from "react";
import Slider from 'react-input-slider';
import './Dashboard.css';

const CustomSlider = ({ sliderState, onChangeForSlider }) => {
    return (<div className='customslider'>
        <div className='info'>Filter By Age:</div>
        <div className='info'>{sliderState}</div>
        <Slider
            styles={{
                track: {
                    backgroundColor: '#446bd9'
                },
                active: {
                    backgroundColor: 'lightgrey'
                },
                thumb: {
                    width: 30,
                    height: 30
                },
                disabled: {
                    opacity: 0.5
                }
            }}
            axis="x" x={sliderState} onChange={({ x }) => onChangeForSlider(x)}


        />
        <div className='info'>100</div>
    </div>)
}

export default CustomSlider;