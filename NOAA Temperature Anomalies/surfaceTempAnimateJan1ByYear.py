from PIL import Image

def create_gif(image_files, output_path, duration=500):
    images = [Image.open(image) for image in image_files]
    images[0].save(output_path, save_all=True, append_images=images[1:], duration=duration, loop=0)

# List of image files
years = range(1850, 2024 + 1)
image_files = [f"tempAnomGraphs/temp_anom_{year}-01-01.png" for year in years]

# Create GIF
# create_gif(image_files, "graphs.gif", duration=500)
create_gif(image_files, "jan1_graphs_accelarated.gif", duration=100)
