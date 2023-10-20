#Use an official base image that includes R and Python
FROM rhub/r-minimal

#Set the working directory in the container
WORKDIR /app

USER root

# Install Python and pip
#RUN installr python3 python3-pip

ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

RUN R -e "install.packages('lubridate',dependencies=TRUE, repos='http://cran.rstudio.com/')"

# Set Python to use Python 3
#RUN ln -s /usr/bin/python3 /usr/bin/python

# Copy the requirements file into the container at /app
COPY requirements.txt /app/

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . /app/

# Make port 80 available to the world outside this container
EXPOSE 5000

# Define environment variable
ENV NAME World

# Install R packages (modify this part to install specific R packages)
#RUN R -e "install.packages(c('lubridate'), dependencies=TRUE)"

RUN Rscript r_scripts/validation.R '1990-05-15'

# Run app.py when the container launches
CMD ["python", "person_app.py"]
