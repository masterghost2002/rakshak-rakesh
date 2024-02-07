import { useCallback, useEffect, useState } from 'react';
const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/
const determineFileType = (contentType:string) => {
    if (contentType.startsWith('image/')) {
        return 'image';
    } else if (contentType === 'application/pdf') {
        return 'pdf';
    } else {
        return 'unknown';
    }
};
const useFileType = (file: string | File | null) => {
    const [fileType, setFileType] = useState<"image" | "pdf" | "unknown" | null>(null);
    const [fileUrl, setFileUrl] = useState('');

    // this utility function will convert the file to file url
    const fileToUrl = useCallback(() => {
        if (!file) return;
        if(typeof file === 'string') return;
        const type = determineFileType(file.type);
        setFileType(type);
        var reader = new FileReader();
        reader.onload = function (e) {
            if(!e.target || typeof e.target.result !== 'string')
                return;
            setFileUrl(e.target.result);
        };
        reader.onerror = function () {
            setFileType('unknown')
        }
        reader.readAsDataURL(file);
    }, [file]);

    // if its a url the guess it file type
    const getFileTypeFromUrl = useCallback(async () => {
        // the given file is not a url
        if (file instanceof Blob || typeof file !== 'string' || !urlPattern.test(file))
            return;
        try {
            const response = await fetch(file, { method: 'HEAD' });
            if (response.ok) {
                const contentType = response.headers.get('Content-Type');
                if (!contentType) {
                    console.error('No content type found');
                    return;
                }
                setFileType(determineFileType(contentType));
                setFileUrl(file);
            }
        } catch (error) {
            console.error('Error fetching file information');
        }
    }, [file]);

    // use effect
    useEffect(() => {
        getFileTypeFromUrl();
        fileToUrl();
    }, [getFileTypeFromUrl, fileToUrl]);
    return { fileType, fileUrl };
};

export default useFileType;