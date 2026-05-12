# nolint
library(RNetCDF)
library(ggplot2)
library(gganimate)


url <- "https://www.ncei.noaa.gov/thredds/dodsC/noaa-global-temp-v6/NOAAGlobalTemp_v6.0.0_gridded_s185001_e202411_c20241208T145954.nc"
data <- open.nc(url)

print.nc(data)

# start_year <- 1850
start_year <- 2024
end_year <- 2024

dates <- seq(as.Date(paste(start_year, "-01-01", sep="")), as.Date(paste(end_year, "-12-31", sep="")), by="days")
print(dates)


#### Getting Average Temp Every Year ####
get_avg_anom <- function(data, dates) {
    time <- var.get.nc(data, "time")
    year_avg_anom <- c()

    for (date in dates) {
        date_choice <- as.Date(date)
        days_since_1800 <- as.numeric(date_choice - as.Date("1800-01-01"), units="days")
        time_index <- which(time == days_since_1800)

        anom <- var.get.nc(data, "anom", start=c(NA, NA, 1, time_index), count=c(NA, NA, 1, 1))
        year_avg_anom <- c(year_avg_anom, mean(anom, na.rm=TRUE))
    }

    return(year_avg_anom)
}


year_avg_anom <- get_avg_anom(data, dates)
print(year_avg_anom)
