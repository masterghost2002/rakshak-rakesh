import cloudinary from 'cloudinary';
import config from '../config/config';
cloudinary.v2.config({
    cloud_name: config.cloudName,
    api_key: config.cloudApiKey,
    api_secret: config.cloudApiSecret,
});

export default cloudinary.v2.uploader;