import React from 'react';
import {GaugeConstructor, GaugeType} from "./types";
import {GaugeLight, GaugeMinimal, GaugeSphere, GaugeStandard} from "./index";
import {useEvaState} from "@eva-ics/webengine-react";


const Gauge = ({type, minValue, maxValue, engine}: GaugeConstructor) => {
    const state = useEvaState({oid: "sensor:tests/temp", engine});
    const value = state.value;

    return (
        <div>
            {!type && <GaugeStandard engine={engine} value={value} minValue={minValue} maxValue={maxValue}/>}
            {type === GaugeType.STANDARD &&
                <GaugeStandard engine={engine} value={value} minValue={minValue} maxValue={maxValue}/>}
            {type === GaugeType.SPHERE &&
                <GaugeSphere engine={engine} value={value} minValue={minValue} maxValue={maxValue}/>}
            {type === GaugeType.MINIMAL &&
                <GaugeMinimal engine={engine} value={value} minValue={minValue} maxValue={maxValue}/>}
            {type === GaugeType.LIGHT &&
                <GaugeLight engine={engine} value={value} minValue={minValue} maxValue={maxValue}/>}
        </div>
    );
};

export default Gauge;
