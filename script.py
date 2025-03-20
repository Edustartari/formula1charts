from PIL import Image
import os

def optimize_image(input_path, output_path, quality=72):
    # Open an image file
    with Image.open(input_path) as img:
        # Resize image if necessary
        img.thumbnail((1024, 1024))  # Resize to a maximum of 1024x1024
        # Save the image with optimized quality
        img.save(output_path, "JPEG", optimize=True, quality=quality)

def optimize_images_in_directory(directory, output_directory):
    # Create output directory if it doesn't exist
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)
    
    for filename in os.listdir(directory):
        try:
            if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                input_path = os.path.join(directory, filename)
                output_path = os.path.join(output_directory, f'{filename}')
                optimize_image(input_path, output_path)
        except Exception as e:
            print(f'*** Error optimizing image {filename}: {e}')

input_directory = "/home/eduardo/coding/edu_projects/formula1charts/src/img"
output_directory = "/home/eduardo/coding/edu_projects/formula1charts/assets"

optimize_images_in_directory(input_directory, output_directory)
