import xarray as xr
import numpy as np
import pandas as pd
import geopandas as gpd
from shapely.geometry import Point
from datetime import datetime, timedelta

# Load the NetCDF file
nc_file = "src/data/oceanData/ocldb1738379851.3127437_OSD.nc"
ds = xr.open_dataset(nc_file)

# Define the time origin from the NetCDF metadata
time_origin = datetime(1770, 1, 1)  # "days since 1770-01-01"

# Convert time values safely
ds["time"] = np.array([time_origin + timedelta(days=int(t)) for t in ds["time"].values])

def net_to_geo(specific_time):
    # Select the closest time slice
    ds_time_slice = ds.sel(time=specific_time, method="nearest")

    # Extract coordinates and data
    lat = ds_time_slice["lat"].values
    lon = ds_time_slice["lon"].values
    temp = ds_time_slice["Temperature"].values.squeeze()

    # Get the correct missing value indicator
    missing_value = ds["Temperature"].attrs.get("_FillValue", -1e10)

    # Create lists for geometries and values
    geometries = []
    values = []

    for i in range(len(lat)):
        for j in range(len(lon)):
            value = temp[i, j]
            if value != missing_value:
                geometries.append(Point(lon[j], lat[i]))
                values.append(value)

    # Convert to GeoDataFrame
    gdf = gpd.GeoDataFrame({"geometry": geometries, "value": values})

    # Export to GeoJSON
    output_file = f"output_{specific_time.strftime('%Y-%m-%d')}.geojson"
    gdf.to_file(output_file, driver="GeoJSON")

    print(f"GeoJSON file saved as {output_file}")

# Process first 10 time slices for testing
for i in range(10):
    specific_time = ds["time"].values[i]
    net_to_geo(specific_time)

ds.close()
