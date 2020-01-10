import * as React from "react";
import ColoReact from 'coloreact';
import { Collapse, Button, Intent, Card } from '@blueprintjs/core';
import { DEFAULT_COLOR } from '../api/ol-style-helpers';
import { NBSP } from '../constants';

/**
 * @since 0.13
 */
export interface IColorPickerProps {
    value?: string;
    onChange: (value: string) => void;
}

/**
 * @since 0.13
 */
export const ColorPicker = (props: IColorPickerProps) => {
    const [isPickerOpen, setIsPickerOpen] = React.useState(false);
    const onPickerToggle = () => {
        setIsPickerOpen(!isPickerOpen);
    };
    return <div>
        <button style={{ width: 80, borderRadius: 3, backgroundColor: props.value ?? DEFAULT_COLOR }} onClick={onPickerToggle}>{NBSP}{NBSP}{NBSP}</button>
        <Collapse isOpen={isPickerOpen}>
            <Card>
                <ColoReact style={{ height: 200, position: 'relative' }} color={props.value ?? DEFAULT_COLOR} onChange={(c: any) => props.onChange(`#${c.hex}`)} />
                <Button icon="chevron-up" intent={Intent.PRIMARY} onClick={() => setIsPickerOpen(false)}>Close</Button>
            </Card>
        </Collapse>
    </div>
}