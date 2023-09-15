import React from 'react';
import {Eva} from "@eva-ics/webengine";
import {Gauge, RelayButtonToggle} from "./components/gauge";
import Thermometer from "./components/thermometer/Thermometer";
import {ProgressBar} from "./components/progressBar";


const App = ({engine}: { engine: Eva }) => {

    return (
        <>

            <Gauge oid="sensor:tests/temp" type="sphere" engine={engine} minValue={0} maxValue={95} showValue/>
            {/*<Gauge oid="sensor:tests/temp2" type="minimal" engine={engine} minValue={0} maxValue={105} warnValue={60}/>*/}
            {/*<Gauge oid="sensor:tests/temp2" type="light" engine={engine} minValue={0} maxValue={120} critValue={60}/>*/}
            {/*<Gauge oid="sensor:tests/temp2" type="sphere" engine={engine} minValue={0} maxValue={110} warnValue={40}*/}
            {/*       critValue={90}/>*/}
            <div style={{marginLeft: "300px"}}>
                <Thermometer oid="sensor:tests/temp" engine={engine} maxValue={150} minValue={-20} critValue={60}
                             warnValue={40} showValue label="Temperature" showMinMax/>
            </div>
            <div style={{width: "200px", marginLeft: "300px", marginTop: "100px"}}>
                <ProgressBar oid="sensor:tests/temp" minValue={0} maxValue={100} engine={engine} showMinMaxValues
                             showValue label="Temp"/>
            </div>

            {/*<RelayButtonToggle oid="unit:tests/door_remote" engine={engine}/>*/}
        </>

    )
}

export default App
