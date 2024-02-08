import { Box, IconButton, Typography, Link } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DocumentsType } from '../types/types';
import PDFCOVER from "../assets/pdfCover.png";
type Props = {
  document: DocumentsType;
  onDelete: (document: DocumentsType) => Promise<void>;
}

const ImageContainer = ({ document, onDelete }: Props) => {

  return (
    <Box position="relative" width={120} height={120} mr={2} mb={4}>
      <Link href={document.secureUrl} target="_blank" download>
        <img src={document.format === 'pdf' ? PDFCOVER : document.secureUrl} alt="placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Link>
      <IconButton
        onClick={() => onDelete(document)}
        style={{ position: 'absolute', top: 0, right: 0, zIndex: 1, color: 'red' }}
      >
        <DeleteIcon />
      </IconButton>
      <Typography
        variant="subtitle2"
        component="div"
        style={{ top: 0, left: 0, zIndex: 1, backgroundColor: 'white', color: 'black', padding: '4px' }}
      >
        {document.name}
      </Typography>
    </Box>
  );
};
export default ImageContainer;