import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import "./Button.Component.css";
function ButtonComponent({className,onClick,icon}) {
    return (<>
        <button className={"button "+className} onClick={onClick}>
            <FontAwesomeIcon icon={icon} />
        </button>
    </>);
}

export { ButtonComponent }