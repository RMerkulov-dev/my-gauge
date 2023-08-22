import {StrokeLineCamp} from "../types";

export const standardGaugeOptions = {
    value: 0, // Indicator value
    diameter: 200, // GaugeStandard diameter value
    minValue: 0, // Minimum value indicator
    maxValue: 100, // Maximum value indicator
    startAngle: 90, // Initial indicator position
    endAngle: 270, // End indicator position
    numTicks: 10, // Step of indicator values
    offset: 5, // Distance of indicator line from the center
    arcStrokeWidth: 24, // Indicator line thickness
    strokeLineCap: StrokeLineCamp.ROUND, // Type of progress line
    tickLength: 10, // Length of ticks
    baseRadius: 12, // Radius of central point of arrow indicator
    middleRadius: 24, //Radius of middle circle of arrow indicator
    tipRadius: 2, // Radius of end point of arrow indicator
    needleOffset: 35, // Length of arrow indicator
};

export const sphereGaugeOptions = {
    value: 0, // Indicator value
    diameter: 200, // GaugeStandard diameter value
    minValue: 0, // Minimum value indicator
    maxValue: 100, // Maximum value indicator
    startAngle: 45, // Initial indicator position
    endAngle: 315, // End indicator position
    numTicks: 5, // Step of indicator values
    offset: -50, // Distance of indicator line from the center
    arcStrokeWidth: 24, // Indicator line thickness
    strokeLineCap: StrokeLineCamp.BUTT, // Type of progress line
    tickLength: 10, // Length of ticks
    baseRadius: 6, // Radius of central point of arrow indicator
    middleRadius: 14, //Radius of middle circle of arrow indicator
    tipRadius: 2, // Radius of end point of arrow indicator
    needleOffset: 10, // Length of arrow indicator
};

export const minimalGaugeOptions = {
    value: 0, // Indicator value
    diameter: 150, // GaugeStandard diameter value
    minValue: 0, // Minimum value indicator
    maxValue: 100, // Maximum value indicator
    startAngle: 90, // Initial indicator position
    endAngle: 270, // End indicator position
    numTicks: 7, // Step of indicator values
    offset: -40, // Distance of indicator line from the center
    arcStrokeWidth: 24, // Indicator line thickness
    strokeLineCap: StrokeLineCamp.INHERIT, // Type of progress line
    tickLength: 10, // Length of ticks
    baseRadius: 5, // Radius of central point of arrow indicator
    middleRadius: 15, //Radius of middle circle of arrow indicator
    tipRadius: 2, // Radius of end point of arrow indicator
    needleOffset: 30, // Length of arrow indicator
};

export const lightGaugeOptions = {
    value: 0, // Indicator value
    diameter: 150, // GaugeStandard diameter value
    minValue: 0, // Minimum value indicator
    maxValue: 100, // Maximum value indicator
    startAngle: 90, // Initial indicator position
    endAngle: 270, // End indicator position
    numTicks: 5, // Step of indicator values
    offset: -40, // Distance of indicator line from the center
    arcStrokeWidth: 24, // Indicator line thickness
    strokeLineCap: StrokeLineCamp.BUTT, // Type of progress line
    tickLength: 10, // Length of ticks
    baseRadius: 2, // Radius of central point of arrow indicator
    middleRadius: 5, //Radius of middle circle of arrow indicator
    tipRadius: 1, // Radius of end point of arrow indicator
    needleOffset: 10, // Length of arrow indicator
};
