
import React, { useState } from 'react';
import './DropdownBanlist.css';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

const DropdownBanlist = (props) => {
    // Define the default values used to fill items
    const dropdownDefaultValues = [
        {
            value: "forbidden",
            visibleValue: "Forbidden"
        },
        {
            value: "limited",
            visibleValue: "Limited"
        },
        {
            value: "semilimited",
            visibleValue: "Semi Limited"
        },
        {
            value: "unlimited",
            visibleValue: "Unlimited"
        }
    ];

    const [dropdownValue, setDropdownValue] = useState(props.initialValue || 'NONE');
    const [dropdownVariantValue, setDropdownVariantValue] = useState('dark');

    const addDropdownEventsOnClick =  (value, callbackStack) => {
        const newDropdownValue =  changeDropdownlistValue(value)

        executeCallbackStack(callbackStack, [newDropdownValue]);
    }

    const executeCallbackStack = (callbackStack, argsStack) => {
        if (callbackStack) {
            // Read callbacks stack and execute them
            for (let i = 0; i < callbackStack.length; i++) {
                callbackStack[i](argsStack[i]);
            }
        }
    }

    const changeDropdownlistValue = (value) => {
        let newVariant;
        let newValue;

        switch (value) {
            case 'forbidden':
                newVariant = 'danger';
                newValue = 'Forbidden'
                break;
            case 'limited':
                newVariant = 'warning';
                newValue = 'Limited'
                break;
            case 'semilimited':
                newVariant = 'info';
                newValue = 'Semi Limited'
                break;
            case 'unlimited':
                newVariant = 'success';
                newValue = 'Unlimited'
                break;
            default:
                newVariant = 'success';
                newValue = 'Unlimited'
                break;
        }

        if (props.changeStatus) {
            setDropdownValue(newValue);
            setDropdownVariantValue(newVariant);
            
            props.setValue(value);
        }

        return value;
    }

    // Create the dropdown items using its options
    const dropdownItems = (props.items || dropdownDefaultValues).map((option, iter) => (
        <Dropdown.Item
            onClick={() => addDropdownEventsOnClick(option.value, props.callbackStack)}
            key={`dropdown-${iter}`}
        >
            {option.visibleValue}
        </Dropdown.Item>
    ))

    return (
        <Dropdown className="dropdown-container">
            <DropdownButton
                className="dropdown-container__item-button"
                variant={dropdownVariantValue}
                title={dropdownValue}
            >
                {dropdownItems}
            </DropdownButton>
        </Dropdown>
    )
}

export default DropdownBanlist;
