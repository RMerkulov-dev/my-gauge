import React from 'react';
import {Eva} from "@eva-ics/webengine";
import Gauge from "./components/gauge/Gauge";
import {useEvaState} from "@eva-ics/webengine-react";
import GaugeSphere from "./components/gauge/GaugeSphere";
import ModernGauge from "./components/gauge/ModernGauge";
import LightGauge from "./components/gauge/LightGauge";


const App = ({engine}: { engine: Eva }) => {
    const state = useEvaState({oid: "sensor:tests/temp", engine});
    const value = state.value;

    return (
        <>
            <p>Main</p>
            <Gauge engine={engine} minValue={0} warnValue={30} critValue={65} maxValue={95} value={value}/>
            <div style={{display: "flex", marginTop: "50px"}}>
                <p>1</p>
                <GaugeSphere value={value} minValue={0} maxValue={80}/>
                <p>2</p>
                <ModernGauge value={value} critValue={60} minValue={0} maxValue={80}/>
                <p>3</p>
                <LightGauge value={value} warnValue={30} minValue={0} maxValue={80}/>

            </div>
        </>
    )
}

export default App
