import * as React from 'react';

export interface AlertListProps {
    position: string;
    alerts: any;
    timeout: number;
    onDismiss: any;
}

export class AlertList extends React.Component<AlertListProps, any> {

}

export default AlertList;