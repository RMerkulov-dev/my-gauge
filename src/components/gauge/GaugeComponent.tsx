import React from 'react';
import {GaugeConstructor, GaugeTypeNames} from "./types";
import {GaugeLight, GaugeMinimal, GaugeSphere, GaugeStandard} from "./index";
import {useEvaState} from "@eva-ics/webengine-react";


const GaugeComponent = ({type, minValue, maxValue, engine}: GaugeConstructor) => {
    const state = useEvaState({oid: "sensor:tests/temp", engine});
    const value = state.value;
   
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
