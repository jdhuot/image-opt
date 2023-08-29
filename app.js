const express = require('express');
const sharp = require('sharp');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

// use cors middleware
app.use(cors());

app.get('/resize/:image', async (req, res) => {
    const imageName = req.params.image;
    const width = parseInt(req.query.width) || 700; // Default width
    const imagePath = `path_to_your_images/${imageName}.jpg`; // Replace with your image path

    try {
        const resizedImageBuffer = await sharp(imagePath)
            .resize(width)
            .toBuffer();

        res.set('Content-Type', 'image/jpeg');
        res.send(resizedImageBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing image.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});