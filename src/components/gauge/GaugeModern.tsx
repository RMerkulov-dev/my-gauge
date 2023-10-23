import React, { useEffect, useState } from "react";
import { GaugeParams, StrokeLineCap } from "./index";
import { ItemValue } from "@eva-ics/webengine-react";
import { calculateColor, useGauge } from "./common";

const options = {
  value: 0, // Indicator value
  diameter: 200, // GaugeStandard diameter value
  minValue: 0, // Minimum value indicator
  maxValue: 100, // Maximum value indicator
  startAngle: 45, // Initial indicator position
  endAngle: 315, // End indicator position
  numTicks: 5, // Step of indicator values
  offset: -50, // Distance of indicator line from the center
  arcStrokeWidth: 24, // Indicator line thickness
  strokeLineCap: StrokeLineCap, // Type of progress line
  tickLength: 10, // Length of ticks
  baseRadius: 6, // Radius of central point of arrow indicator
  middleRadius: 14, //Radius of middle circle of arrow indicator
  tipRadius: 2, // Radius of end point of arrow indicator
  needleOffset: 10, // Length of arrow indicator
};

const GaugeModern = ({
  oid,
  minValue,
  maxValue,
  warnValue,
  lowCritValue,
  lowWarnValue,
  critValue,
  engine,
  digits,
  units,
  threshold,
  format_with,
  showValue,
  label,
  value = options.value,
  diameter = options.diameter,
  startAngle = options.startAngle,
  endAngle = options.endAngle,
  numTicks = options.numTicks,
  offset = options.offset,
  arcStrokeWidth = options.arcStrokeWidth,
  strokeLineCap = StrokeLineCap.Butt,
}: GaugeParams) => {
  const initialFontSize = 12;
  const [fontSize, setFontSize] = useState(initialFontSize);

  useEffect(() => {
    const scaledFontSize = Math.round(Math.min(2 + (diameter * 0.5) / 10, 24));
    setFontSize(scaledFontSize % 2 === 0 ? scaledFontSize : scaledFontSize + 1);
    if (diameter < 200) setFontSize(initialFontSize);
  }, [diameter, fontSize]);

  const color = calculateColor(
    value,
    warnValue,
    critValue,
    lowWarnValue,
    lowCritValue,
  );

  if (value > maxValue) {
    value = maxValue;
  } else if (value < minValue) {
    value = minValue;
  }

  const {
    ticks,
    getLabelProps,
    valueToAngle,
    angleToValue,
    getArcProps,
    getSVGProps,
  } = useGauge({
    startAngle,
    endAngle,
    numTicks,
    diameter,
    domain: [minValue, maxValue],
  });

  return (
    <div className="gauge-container">
      <div className="gauge-wrapper">
        <svg {...getSVGProps()} className="gauge-preview">
          <path
            {...getArcProps({
              offset,
              startAngle,
              endAngle,
            })}
            fill="none"
            className="gauge-progress-background-color"
            strokeWidth={arcStrokeWidth}
            strokeLinecap={strokeLineCap}
          />
          {value > minValue && (
            <path
              {...getArcProps({
                offset,
                startAngle,
                endAngle: valueToAngle(value),
              })}
              fill="none"
              className={color}
              strokeWidth={arcStrokeWidth}
              strokeLinecap={strokeLineCap}
            />
          )}
          <g id="ticks">
            {ticks.map((angle: any) => (
              <React.Fragment key={`tick-group-${angle}`}>
                <text
                  className="gauge-text-default-color"
                  {...getLabelProps({ angle, offset: 20 })}
                >
                  {angleToValue(angle)}
                </text>
              </React.Fragment>
            ))}
          </g>
        </svg>
        <div className="gauge-value" style={{ fontSize: `${fontSize}px` }}>
          <p className="gauge-label-circle">{label}</p>
          {showValue && (
            <div className="gauge-value-result">
              <ItemValue
                engine={engine}
                oid={oid}
                digits={digits}
                units={units}
                threshold={threshold}
                format_with={format_with}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GaugeModern;
