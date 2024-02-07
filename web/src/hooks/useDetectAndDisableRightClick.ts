import { useEffect, useState } from 'react';
const useRightClickDetectionAndDisable = () => {
    const [isClicked, setIsClicked] = useState(false);
    useEffect(() => {
        const handleContextMenu = (event: MouseEvent) => {
            event.preventDefault();
            alert('Right Click is disabled');
            setIsClicked(true);
        };
        document.addEventListener('contextmenu', handleContextMenu);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);
    return isClicked;
};

export default useRightClickDetectionAndDisable;
