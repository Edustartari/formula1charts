import React from "react";

const Image = ({ name }) => {
    try {
        // Import image on demand
        // const image = require(`../${name}`);
        console.log(`Image 2`);
        console.log(name);
        // const image = require(`../../img/${name}`);
        const image = require(`../../img/${name}.jpg`);

        console.log(`Image with name "${image}"`);
        // If the image doesn't exist. return null
        if (!image) return null;
        return <img className="image-component-container" src={image.default} />;
    } catch (error) {
        console.log(`Image with name "${name}" does not exist`);
        return null;
    }
};

export default Image;