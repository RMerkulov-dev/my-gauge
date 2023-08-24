import React from 'react';
import {Eva} from "@eva-ics/webengine";
import {Gauge} from "./components/gauge/index";


const App = ({engine}: { engine: Eva }) => {

    return (
        <>
            <Gauge oid="sensor:tests/temp" engine={engine} minValue={0} maxValue={95} showValue/>
            <Gauge oid="sensor:tests/temp2" type="minimal" engine={engine} minValue={0} maxValue={105} warnValue={60}/>
            <Gauge oid="sensor:tests/temp2" type="light" engine={engine} minValue={0} maxValue={120} critValue={60}/>
            <Gauge oid="sensor:tests/temp2" type="sphere" engine={engine} minValue={0} maxValue={110} warnValue={40}
                   critValue={90}/>
        </>

    )
}

export default App
