import psycopg2
import uuid
import os
from random import choice, randint, uniform
from datetime import datetime
from faker import Faker
from dotenv import load_dotenv
import json

with open('../data/mockDataGeoContinents.json') as f:
    mock_data = json.load(f)

fake = Faker()
load_dotenv()

dbname = os.getenv("DB_NAME")
user = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")
host = os.getenv("DB_HOST")
port = os.getenv("DB_PORT")

# Function to connect to the PostgreSQL database add the connection params 
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

# Function to generate random user data
def generate_user_data(location_ids):
    user_type_ids = ['53f8e720-1915-4dc8-a166-1226c5775330', 'a466268b-fb92-43c4-b174-4f9fd1c5c5f1', '0320e47b-d1c1-43ed-9d61-503582d77527', 'f3e2b590-60e3-4a01-a7a7-1c157c8a3b79', 'baa26922-d9d9-4f9f-8de1-14d4740f97b4', '97b2732b-7a2e-4d13-bd86-9ac7a9c17c1d']
    notification_ids = ['5d82cdd3-3c2f-47ff-a805-25e715192624', 'b5901b2c-b39b-4b20-8465-0b7898b15924', '2a78e7db-490b-49e4-a25e-25a6666fd324']
    languages_list = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Arabic', 'Russian', 'Portuguese', 'Italian']
    genders = ['Male', 'Female', 'Other']  
    interests = ['Sports', 'Music', 'Art', 'Technology', 'Cooking', 'Travel', 'Reading', 'Fitness', 'Gaming', 'Fashion', 'Healing', 'Worship', 'Missions', 'Evangelism']  # List of possible interests
    affiliation = ['Youth', 'College', 'Professional', 'Retired', 'Other', 'BSSM', 'YWAM', 'JesusCulture'] 

    id = str(uuid.uuid4())
    username = f"user_{randint(1000, 9999)}"
    email = f"{username}@example.com"
    phone_number = str(randint(100000000, 999999999))
    picture = None
    user_type_id = choice(user_type_ids)
    user_location_id = choice(location_ids)
    notification_id = choice(notification_ids)
    languages = choice(languages_list)
    gender = choice(genders)  
    interest = choice(interests) 
    affiliation = choice(affiliation)
    birth_year = datetime(randint(1970, 2005), randint(1, 12), randint(1, 28)).date()
    created_at = datetime.now()
    updated_at = created_at

    return (id, username, email, phone_number, picture, [languages], gender, [interest], [affiliation], birth_year, user_type_id, user_location_id, notification_id, created_at, updated_at)

# Function to generate random post data
def generate_post_data(user_ids):
    activity_ids = ['6e6a36da-06ed-426d-80cc-d1ff2276fb98', 'fd5101fc-0218-496f-91a1-04c1e6472b20', '9cfe08ad-dbe7-4643-9e19-302ed4f5f72c', '8bde9d86-cb73-4f58-9a04-9fd3b74ed6a0']
    category_ids = ['2525edcc-b972-4a14-bfc5-66697a89b5bc', 'd842e447-17d1-4a3a-84a0-61cd48e68d7d', '3c31f6bb-fa6f-49bc-98b4-9f173e6d9ebf', 'f4872d2c-c51a-4da7-bcc5-245c8fe01e14', '94f4f09d-b0a6-4b79-a474-fc35a5bb6f59']
    tag_ids = ['1f9ab05c-b97a-40b4-b43a-f308df75ec26', 'be6e97de-19e4-4af1-bd62-c0d350c011ec', 'b1b4e757-0bc0-48ff-b430-6c9a3b978ee7']
    sentiment_ids = ['9f0d7f13-25d9-48cb-afcd-b1134a1a7f3a', '56b169bf-b1b1-4f39-b0d3-4ee8103e25d4', '94ddc4f2-82f7-4c22-8e56-95b462d3b7ae']
    keywords_ids = ['5d82cdd3-3c2f-47ff-a805-25e7151926d7', 'b5901b2c-b39b-4b20-8465-0b7898b159e9', '2a78e7db-490b-49e4-a25e-25a6666fd30f']
    event_ids = ['9eac149d-12b1-4c91-b14b-8fd87341b572']
    media_type_ids = ['f1075159-b937-4e9c-a5f1-2aa2d482086e', '8adcb636-5073-45d5-936b-5ae3ff5d64ae', 'b43e4c0b-21e3-4f3f-9cf2-62c3f5e97935']
    post_content = [ 'Praying for revival in our nation!',
        'The presence of God is tangible in this place.',
        'Let us lift up prayers for unity among believers.',
        'Healing is flowing like a river in this season.',
        'Expecting breakthroughs in every area of our lives!',
        'God is raising up a generation of passionate worshippers.',
        'Feeling a fresh outpouring of the Holy Spirit.',
        'Lets intercede for the salvation of souls.',
        'Experiencing supernatural encounters in worship.',
        'Prophesying a season of restoration and renewal.',
        'Gods love is overwhelming us today.',
        'Seeing signs and wonders manifest in our midst.',
        'Joining together in fervent prayer for revival.',
        'Expecting miracles to break out in unexpected places.',
        'Calling forth a revival in the hearts of believers.',
        'Witnessing the power of God transform lives.',
        'Praying for Gods kingdom to come on earth as it is in heaven.',
        'Gods presence is like fire consuming our hearts.',
        'Believing for Gods glory to be revealed in our nation.',
        'Experiencing a fresh touch from the Holy Spirit.'
    ]
    
    post_id = str(uuid.uuid4())
    content = choice(post_content)
    is_visible = True
    is_offensive = False
    activity_id = choice(activity_ids)
    user_id = choice(user_ids)  
    category_id = choice(category_ids)
    tag_id = choice(tag_ids)
    sentiment_id = choice(sentiment_ids)
    keywords_id = choice(keywords_ids)
    event_id = choice(event_ids)
    media_type_id = choice(media_type_ids)
    created_at = datetime.now()

    return (post_id, content, is_visible, is_offensive, user_id, activity_id, category_id, tag_id, sentiment_id, keywords_id, event_id, media_type_id, created_at)

# Main function 
def main():
    connection = connect_to_db()
    if connection is None:
        return

    cursor = connection.cursor()

    # Insert locations into the database using mock data
    location_ids = []
    for item in mock_data["features"]:
        loc_data = (
            str(uuid.uuid4()),  
            item["properties"]["name"],
            item["properties"]["continent"],
            str(item["geometry"]["coordinates"][1]),
            str(item["geometry"]["coordinates"][0])
        )
        cursor.execute("INSERT INTO \"public\".\"Location\" (id, city, country, latitude, longitude) VALUES (%s, %s, %s, %s, %s)", loc_data)
        location_ids.append(loc_data[0])  

    # Insert 50 users
    user_ids = []
    for _ in range(5):
        user_data = generate_user_data(location_ids)
        cursor.execute("INSERT INTO \"public\".\"User\" (id, username, email, phone_number, picture, languages, gender, interest, affiliation, birth_year, user_type_id, user_location_id, notification_id, created_at, updated_at) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
               user_data)
        user_ids.append(user_data[0])  

    # Insert 50 posts
    for _ in range(5):
        post_data = generate_post_data(user_ids)
        cursor.execute("INSERT INTO \"public\".\"Post\" (id, content, is_visible, is_offensive, user_id, activity_id, category_id, tag_id, sentiment_id, keywords_id, event_id, media_type_id, created_at) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                       post_data)

    # Commit the transaction
    connection.commit()

    # Close the cursor and connection
    cursor.close()
    connection.close()

if __name__ == "__main__":
    main()
