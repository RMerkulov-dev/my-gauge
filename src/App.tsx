import React from 'react';
import {Eva} from "@eva-ics/webengine";
import {Gauge} from "./components/gauge/index";


const App = ({engine}: { engine: Eva }) => {

    return (
        <Gauge oid="sensor:tests/temp" engine={engine} minValue={0} maxValue={95}/>
    )
}

export default App
