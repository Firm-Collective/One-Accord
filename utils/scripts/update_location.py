import json
import psycopg2
import random
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

dbname = os.getenv("DB_NAME")
user = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")
host = os.getenv("DB_HOST")
port = os.getenv("DB_PORT")

# Function to connect to the PostgreSQL database
def connect_to_db():
    try:
        connection = psycopg2.connect(
            dbname=dbname,
            user=user,
            password=password,
            host=host,
            port=port
        )
        return connection
    except Exception as e:
        print("Error connecting to the database:", e)
        return None

# Function to read the mock data from JSON file
def read_mock_data(filepath):
    with open(filepath) as f:
        mock_data = json.load(f)
    return mock_data

# Function to update latitude and longitude in the database
def update_coordinates(connection, mock_data):
    cursor = connection.cursor()
    
    # Get all location IDs from the database
    cursor.execute('SELECT id FROM "public"."Location"')
    location_ids = cursor.fetchall()
    
    # Iterate over each location ID and update with random coordinates from mock data
    for location_id in location_ids:
        location_id = location_id[0]
        random_feature = random.choice(mock_data['features'])
        latitude = random_feature['geometry']['coordinates'][1]
        longitude = random_feature['geometry']['coordinates'][0]
        
        cursor.execute(
            'UPDATE "public"."Location" SET latitude = %s, longitude = %s WHERE id = %s',
            (latitude, longitude, location_id)
        )
    
    # Commit the transaction
    connection.commit()
    cursor.close()

def main():
    # Filepath to the JSON file
    filepath = '../data/mockDataGeoContinents.json'
    
    # Read mock data
    mock_data = read_mock_data(filepath)
    
    # Connect to the database
    connection = connect_to_db()
    if connection is None:
        return
    
    # Update coordinates in the database
    update_coordinates(connection, mock_data)
    
    # Close the connection
    connection.close()

if __name__ == "__main__":
    main()
