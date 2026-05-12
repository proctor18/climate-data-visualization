import xarray as xr
import geopandas as gpd
from shapely.geometry import Point

# Load the NetCDF file
nc_file = "src/data/NOAAGlobalTemp_v6.0.0_gridded_s185001_e202412_c20250106T150253.nc"
ds = xr.open_dataset(nc_file)

# Decode time correctly
ds = xr.decode_cf(ds)

def net_to_geo(specific_time):
    # Select a specific time slice (e.g., first available time step)
    ds_time_slice = ds.sel(time=specific_time)

    # Extract coordinates and data
    lat = ds_time_slice["lat"].values  # Shape: (36,)
    lon = ds_time_slice["lon"].values  # Shape: (72,)
    data_var = ds_time_slice["anom"].values.squeeze()  # Remove the time dimension, new shape: (36, 72)

    # Get the correct missing value indicator
    missing_value = ds["anom"].attrs.get("_FillValue", -999.9)  # Default if not found

    # Create lists for geometries and values
    geometries = []
    values = []

    for i in range(len(lat)):  # Iterate over lat first (dim 0)
        for j in range(len(lon)):  # Then iterate over lon (dim 1)
            value = data_var[i, j]  # Now correctly indexed as (lat, lon)
            if value != missing_value:  # Exclude missing values
                geometries.append(Point(lon[j], lat[i]))  # lon = x, lat = y
                values.append(value)

    # Convert to GeoDataFrame
    gdf = gpd.GeoDataFrame({"geometry": geometries, "value": values})

    # Export to GeoJSON
    # TODO: change specific_time to exclude : character for windows
    specific_time = str(specific_time).replace(":", "-")
    output_file = f"{specific_time}_output.geojson"
    gdf.to_file(output_file, driver="GeoJSON")

    print(f"GeoJSON file saved as {output_file}")


if __name__ == "__main__":
    for i in range(2100):
        specific_time = ds["time"].values[i]
        net_to_geo(specific_time)
    ds.close()
