export interface UseGaugeParams {
    diameter: number;
    startAngle: number;
    endAngle: number;
    numTicks: number;
    domain: [number, number];
}
export interface GetNeedleParams {
    value: number;
    baseRadius: number;
    tipRadius: number;
    offset?: number;
}

export interface GetArcPropsParams {
    offset?: number;
    startAngle: number;
    endAngle: number;
}

export interface GetTickPropsParams {
    length: number;
    angle: number;
}

export interface GetLabelPropsParams {
    angle: number;
    offset: number;
}
