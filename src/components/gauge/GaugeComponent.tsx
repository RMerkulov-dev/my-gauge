import React from 'react';
import {GaugeConstructor, GaugeTypeNames} from "./types";
import {GaugeLight, GaugeMinimal, GaugeSphere, GaugeStandard} from "./index";


const GaugeComponent = ({type, value, minValue, maxValue, engine}: GaugeConstructor) => {
    return (
        <div>
            {!type && <GaugeStandard engine={engine} value={value} minValue={minValue} maxValue={maxValue}/>}
            {type === GaugeTypeNames.STANDARD &&
                <GaugeStandard engine={engine} value={value} minValue={minValue} maxValue={maxValue}/>}
            {type === GaugeTypeNames.SPHERE &&
                <GaugeSphere engine={engine} value={value} minValue={minValue} maxValue={maxValue}/>}
            {type === GaugeTypeNames.MINIMAL &&
                <GaugeMinimal engine={engine} value={value} minValue={minValue} maxValue={maxValue}/>}
            {type === GaugeTypeNames.LIGHT &&
                <GaugeLight engine={engine} value={value} minValue={minValue} maxValue={maxValue}/>}
        </div>
    );
};

export default GaugeComponent;
