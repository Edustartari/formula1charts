import React from "react";

const Image = ({ name }) => {
    try {
        // Import image on demand
        const image = require(`../../img/${name}.webp`);

        // If the image doesn't exist. return null
        if (!image) return null;
        return <img id='image-component-container' className="image-component-container" src={image.default} loading="lazy"/>;
    } catch (error) {
        return null;
    }
};

export default Image;