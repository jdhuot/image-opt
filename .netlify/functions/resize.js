const sharp = require('sharp');

exports.handler = async (event, context) => {
    try {
        const imageName = event.queryStringParameters.image;
        const width = parseInt(event.queryStringParameters.width) || 700;
        const imagePath = `path_to_your_images/${imageName}.jpg`;

        const resizedImageBuffer = await sharp(imagePath)
            .resize(width)
            .toBuffer();

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'image/jpeg',
            },
            body: resizedImageBuffer.toString('base64'),
            isBase64Encoded: true,
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: 'Error processing image.',
        };
    }
};