library(RNetCDF)
library(ggplot2)
library(gganimate)


url <- "https://www.ncei.noaa.gov/thredds/dodsC/noaa-global-temp-v6/NOAAGlobalTemp_v6.0.0_gridded_s185001_e202411_c20241208T145954.nc"
data <- open.nc(url)

print.nc(data)

#### Creating Graphs ####
temp_anomaly_by_time <- function(date_choice, data, global_min, global_max) {
  # Extracting from first time step
  lat <- var.get.nc(data, "lat")
  lon <- var.get.nc(data, "lon")
  days_since_1800 <- as.numeric(date_choice - as.Date("1800-01-01"), units="days")

  time <- var.get.nc(data, "time")
  time_index <- which(time == days_since_1800)

  anom <- var.get.nc(data, "anom", start=c(NA, NA, 1, time_index), count=c(NA, NA, 1, 1))

  gg_df <- expand.grid(lon = lon, lat = lat)
  gg_df$anom <- as.vector(anom)

  ## Shift longitude
  lon_shifted <- ifelse(lon > 180, lon - 360, lon)

  gg_df <- expand.grid(lon = lon_shifted, lat = lat)
  gg_df$anom <- as.vector(anom)

  # Create Plot (make changes later: projection, color scale, etc.)
  p <- ggplot(gg_df, aes(x = lon, y = lat, fill = anom)) +
    geom_tile() + ggtitle(paste("Global Surface Temperature Anomalies"), (date_choice)) +
    scale_fill_gradient2(low="blue", high="red", limits = c(global_min, global_max)) +
    geom_polygon(data = map_data("world"), aes(x = long, y = lat, group = group), color = "black", fill = NA) +
    coord_fixed(1.5) + theme_void()

  # Save plot "temp_anom_{date_choice}.png"
  ggsave(path="tempAnomGraphs", filename=paste("temp_anom_", date_choice, ".png", sep=""), plot=p, width=10, height=5)
}

#### Looping through years ####
start_year <- 1850
end_year <- 2024

dates <- seq(as.Date(paste(start_year, "-01-01", sep="")), as.Date(paste(end_year, "-12-31", sep="")), by="years")
print(dates)

for (date in dates) {
  date_choice <- as.Date(date)
  temp_anomaly_by_time(date_choice, data, global_min, global_max)
}

#### Find Global Max and Min Temp ####
find_global_anomaly_range <- function(data, dates) {
  time <- var.get.nc(data, "time")
  
  global_min <- Inf
  global_max <- -Inf
  
  for (date in dates) {
    date_choice <- as.Date(date)
    days_since_1800 <- as.numeric(date_choice - as.Date("1800-01-01"), units="days")
    time_index <- which(time == days_since_1800)

    print(global_max)
    
    if (length(time_index) == 0) {
      next  # Skip if the date is not found in the time variable
    }
    
    anom <- var.get.nc(data, "anom", start=c(NA, NA, 1, time_index), count=c(NA, NA, 1, 1))
    global_min <- min(global_min, min(anom, na.rm = TRUE))
    global_max <- max(global_max, max(anom, na.rm = TRUE))
  }
  return(c(global_min, global_max))
}

global_range <- find_global_anomaly_range(data, dates)
global_min <- global_range[1]
global_max <- global_range[2]
