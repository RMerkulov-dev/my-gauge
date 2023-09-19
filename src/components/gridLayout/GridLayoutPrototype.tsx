import React, {useState} from 'react';
import GridLayout from 'react-grid-layout';
import {Gauge, GaugeType} from "../gauge";
import {GridLayoutProps} from "./index";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';


const ResizableLayout = ({engine, oid}: GridLayoutProps) => {
    const [layout, setLayout] = useState([
        {i: '1', x: 0, y: 0, w: 1, h: 3},

    ]);

    const addItem = () => {
        // Generate a unique key for the new item
        const newItemKey = {
            typeProgress: "progress"
        }

        // Add a new item to the layout
        setLayout([...layout, {i: newItemKey["typeProgress"], x: 0, y: Infinity, w: 1, h: 1}]);
    };

    return (
        <div>
            <button onClick={addItem}>Add Item</button>
            <GridLayout className="layout" layout={layout} cols={3} rowHeight={100} width={900}>
                {layout.map((item) => (
                    <div key={item.i} className="grid-item">
                        {/* Render the GridItem component with the 'i' value as a prop */}
                        <Gauge oid={oid} type={GaugeType.Modern} engine={engine} minValue={0} maxValue={95}
                               showValue arcStrokeWidth={10} diameter={250} label="TEMP" units=" &#8451;"/>

                    </div>
                ))}
            </GridLayout>
        </div>
    );
};

export default ResizableLayout;
