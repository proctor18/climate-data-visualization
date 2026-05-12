install.packages("ncdf4")
install.packages("lubridate")

library(ncdf4)
library(lubridate)
nc_filename <- "CapstoneEnvironmentalDataVisualization/NOAA Temperature Anomalies/NOAAGlobalTemp_v6.0.0_gridded_s185001_e202411_c20241208T145954.nc"
data <- nc_open(nc_filename)

# Get the dimensions of the data
lat <- ncvar_get(data, "lat")
lon <- ncvar_get(data, "lon")
time <- ncvar_get(data, "time")
z <- ncvar_get(data, "z")
anom <- ncvar_get(data, "anom")

# Time conversion
time_units <- ncatt_get(data, "time", "units")
time_str <- strsplit(time_units$value, " ")
time_str <- strsplit(unlist(time_str)[3], "-")
date <- ymd(time_str) + ddays(time)
date

# Coordinate Matrix
coord_matrix <- as.matrix(expand.grid(lon, lat, z, date))

# Extract Data
names(data$var)
anom <- ncvar_get(data, "anom", collapse_degen = FALSE)

# Write to CSV
nc_df <- data.frame(cbind(coord_matrix, anom))
names(nc_df) <- c("lon", "lat", "z", "date", "anom")
write.csv(nc_df, "CapstoneEnvironmentalDataVisualization/NOAA Temperature Anomalies/NOAAGlobalTemp_v6.csv")
