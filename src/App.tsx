import React from 'react';
import {Eva} from "@eva-ics/webengine";
import Gauge from "./components/gauge/Gauge";
import {useEvaState} from "@eva-ics/webengine-react";
import GaugeVariant_1 from "./components/gauge/GaugeVariant_1";
import GaugeVariant_2 from "./components/gauge/GaugeVariant_2";
import GaugeVariant_2_1 from "./components/gauge/GaugeVariant_2_1";


const App = ({engine}: { engine: Eva }) => {
    const state = useEvaState({oid: "sensor:tests/temp", engine});
    const value = state.value;

    return (
        <>
            <p>Main</p>
            <Gauge engine={engine} minValue={0} warnValue={30} critValue={65} maxValue={95} value={value}/>
            <div style={{display: "flex", marginTop: "50px"}}>
                <p>1</p>
                <GaugeVariant_1 value={value} minValue={0} maxValue={80}/>
                <p>2</p>
                <GaugeVariant_2 value={value} warnValue={30} critValue={60} minValue={0} maxValue={80}/>
                <p>3</p>
                <GaugeVariant_2_1 value={value} minValue={0} maxValue={80}/>

            </div>
        </>
    )
}

export default App
