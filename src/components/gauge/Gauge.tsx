import React from 'react';
import {useEvaState} from "@eva-ics/webengine-react";
import {GaugeConstructor, GaugeType} from "./types";
import {GaugeLight, GaugeMinimal, GaugeSphere, GaugeStandard} from "./index";


const Gauge = ({
                   type = GaugeType.STANDARD,
                   engine,
                   ...rest
               }: GaugeConstructor) => {
    
    const GAUGES = {
        [GaugeType.STANDARD]: GaugeStandard,
        [GaugeType.SPHERE]: GaugeSphere,
        [GaugeType.MINIMAL]: GaugeMinimal,
        [GaugeType.LIGHT]: GaugeLight,
    };

    const state = useEvaState({oid: "sensor:tests/temp", engine});
    const value = state.value;

    const SelectedGauge = GAUGES[type];

    return (
        // @ts-ignore
        <SelectedGauge value={value} engine={engine} type={type} {...rest}/>
    );
};

export default Gauge;
