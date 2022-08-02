import { useState, useEffect } from 'react';

function useLocalstorage(itemName, initialValue) {
    const [status, setStatus] = useState(initialValue);

    useEffect(() => {
        try {
            const localStorageItem = localStorage.getItem(itemName);
            let parsedItem;

            if (!localStorageItem) {
                localStorage.setItem(itemName, JSON.stringify(initialValue));
                parsedItem = initialValue;
            } else {
                parsedItem = JSON.parse(localStorageItem);
            }
            setStatus(parsedItem);
        } catch (error) {
            setStatus(initialValue)
        }
    }, []);

    const saveStorage = (toSave) => {
        const newStatus = {
            ...status,
            storage: toSave
        };
        setStatus(newStatus);
        localStorage.setItem(itemName, JSON.stringify(newStatus));
    };

    return { status, setStatus, saveStorage};
}

export { useLocalstorage };