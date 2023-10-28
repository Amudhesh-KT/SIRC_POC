FROM rasa/rasa-sdk:latest
# Importing Python Image
FROM python:3.8.10
RUN pip install --upgrade pip
# Expose the port for the action server
EXPOSE 5055
EXPOSE 5005
# Set the working directory
WORKDIR /app
ENV PATH="/root/.local/bin:${PATH}"
# COPY Requirenments.txt file
COPY ./requirements.txt .
# Install dependencies for the actions.py file
RUN pip install --user -r requirements.txt
COPY ./my_script.sh /usr/local/bin
# Make the script executable
RUN chmod +x /usr/local/bin/my_script.sh
# COPY all the files and directories
COPY . .
CMD ["/usr/local/bin/my_script.sh"]