import React, { useState } from "react";
import { Eva } from "@eva-ics/webengine";
import { Gauge, GaugeType } from "./components/gauge";

const App = ({ engine }: { engine: Eva }) => {
  const [showToast, setShowToast] = useState(false);

  return (
    <>
      {/*<div style={{marginTop: "30px"}}>*/}
      {/*    <Gauge oid="sensor:tests/temp" type={GaugeType.Modern} engine={engine} minValue={0} maxValue={95}*/}
      {/*           showValue arcStrokeWidth={10} diameter={250} label="TEMP" units=" &#8451;"/>*/}
      {/*</div>*/}

      {/*<div>*/}
      {/*    <button onClick={() => {*/}
      {/*        setShowToast(!showToast)*/}
      {/*    }}>TOAST*/}
      {/*    </button>*/}
      {/*    {showToast && <ToastMessage type={ToastType.Error} message="Error" position={ToastPosition.TopRight}*/}
      {/*                                showTime={2000}/>}*/}
      {/*</div>*/}
      <Gauge
        oid="sensor:tests/temp2"
        type={GaugeType.Light}
        engine={engine}
        minValue={0}
        maxValue={105}
        diameter={250}
        lowWarnValue={30}
        showValue
      />
      {/*<Gauge oid="sensor:tests/temp2" type="light" engine={engine} minValue={0} maxValue={120} critValue={60}/>*/}
      {/*<Gauge oid="sensor:tests/temp2" type="sphere" engine={engine} minValue={0} maxValue={110} warnValue={40}*/}
      {/*       critValue={90}/>*/}
      {/*<div style={{marginLeft: "300px"}}>*/}
      {/*    <Thermometer oid="sensor:tests/temp" engine={engine} maxValue={150} minValue={-20} critValue={60}*/}
      {/*                 warnValue={40} showValue label="Temperature" showMinMax/>*/}
      {/*</div>*/}
      {/*<div style={{width: "200px", marginLeft: "300px", marginTop: "100px"}}>*/}
      {/*    <ProgressBar oid="sensor:tests/temp" minValue={0} maxValue={100} engine={engine} showMinMaxValues*/}
      {/*                 showValue label="Temp"/>*/}
      {/*</div>*/}

      {/*<RelayButtonToggle oid="unit:tests/door_remote" engine={engine}/>*/}
    </>
  );
};

export default App;
