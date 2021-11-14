import React, {useContext} from 'react'
import AlertContext from '../Contexts/Alert/alertContext';

export const Alerts = () => {
    const alertContext = useContext(AlertContext);
    return (
        alertContext.alerts.length > 0 && alertContext.alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle"></i><span>{"\t"}</span>{alert.msg}
            </div>
       ) )
    )
}
