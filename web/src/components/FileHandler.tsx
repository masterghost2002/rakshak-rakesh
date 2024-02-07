import React, { useState } from 'react';
import { Button, Typography, IconButton, Modal, TextField } from '@mui/material';
import { CloudUpload, Delete } from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import useFileType from '../hooks/useFileType';
import PDFCOVER from '../assets/pdfCover.png';
const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;
function FileHandler() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    // const [filePreview, setFilePreview] = useState<string | undefined>(undefined);
    const [fileName, setFileName] = useState('');
    const [openModal, setOpenModal] = useState(false);

    const {fileType, fileUrl} = useFileType(selectedFile);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const file = event.target.files[0];
        if (file.size > MAX_FILE_SIZE){
            toast.error('File size should be less than 5MB');
            return;
        }
        if (!allowedTypes.includes(file.type)){
            toast.error('File type not supported, only images and pdf are allowed');
            return;
        }
        setSelectedFile(file);
        event.target.files = null;
    };

    const handleUpload = () => {
        setSelectedFile(null);
        setFileName('');
        // Close modal
        setOpenModal(false);
    };

    const handleDelete = () => {
        setSelectedFile(null);
        setFileName('');
        // setFilePreview(undefined);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <div>
            <Button variant="contained" onClick={handleOpenModal}>
                Upload 
            </Button>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '@media (max-width:600px)': {
                        width: '100%',
                    },
                }}
            >
                <div style={{ backgroundColor: '#fff', padding: 20, borderRadius: 8 }}>
                    <Typography variant="h6" gutterBottom>
                        Add Document
                    </Typography>
                    <TextField
                        label="Document Name"
                        variant="outlined"
                        name='name'
                        placeholder='Document Name'
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <label htmlFor="fileInput">
                        <Button
                            variant="contained"
                            component="span"
                            startIcon={<CloudUpload />}
                            sx={{ marginTop: 2 }}
                        >
                            Choose File
                        </Button>
                    </label>
                    {selectedFile && (
                        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                            <img 
                                src={fileType === 'pdf' ? PDFCOVER : fileUrl} 
                                alt="File Preview" 
                                style={{ maxWidth: '80px', maxHeight: '80px', marginTop: 10 }} 
                            />
                            <IconButton color="secondary" onClick={handleDelete}>
                                <Delete />
                            </IconButton>
                        </div>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpload}
                        disabled={!selectedFile || !fileName}
                        sx={{ marginTop: 2, marginLeft: 2}}
                    >
                        Upload 
                    </Button>
                </div>
            </Modal>
        </div>
    );
}

export default FileHandler;
