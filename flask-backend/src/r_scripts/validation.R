#! /usr/bin/Rscript
options(echo=TRUE)

validate_date = function(args) {
	# Get command-line arguments
	args <- commandArgs(trailingOnly = TRUE)

	print("RScript running...")

	# Check if at least one argument is provided
	if (length(args) == 0) {
		cat("Usage: Rscript calculate_age_and_day.R <date_of_birth>\n")
		quit(status = 1)
	}

	# Date of Birth (in YYYY-MM-DD format)
	dob <- as.Date(args[1])

	# Current date
	current_date <- Sys.Date()

	# Calculate age
	age <- as.numeric(difftime(current_date, dob, units = "days")) / 365.25

	# Determine the day of the week of the birthdate
	day_of_week <- weekdays(dob)

	#cat("Age:", round(age), "years\n")
	#cat("Day of the week born:", day_of_week, "\n")
	res <- list(age,day_of_week)
	return(res)
}

validate_date(args)
