import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
import numpy as np

# Load the dataset
df = pd.read_csv('user_data.csv')

# Data Preprocessing
def preprocess_data(df):
    # Fill missing values in reviews and instagram_photos with empty strings
    df['reviews'].fillna('', inplace=True)
    df['instagram_photos'].fillna('', inplace=True)
    
    # Normalize the expenses column
    scaler = StandardScaler()
    df['expenses_normalized'] = scaler.fit_transform(df[['expenses']])
    
    # Extract features for clustering (vibe, favorite activities, normalized expenses)
    df['vibe_encoded'] = df['vibe'].factorize()[0]
    df['activities_encoded'] = df['favorite_activities'].factorize()[0]
    
    features = df[['expenses_normalized', 'vibe_encoded', 'activities_encoded']]
    return features

# Clustering Users
def cluster_users(df):
    features = preprocess_data(df)
    
    # Use KMeans for clustering
    kmeans = KMeans(n_clusters=5, random_state=42)
    df['cluster'] = kmeans.fit_predict(features)
    
    return df

# Recommendation Logic
def recommend_destination(user_id, df):
    user_data = df[df['user_id'] == user_id].iloc[0]
    cluster = user_data['cluster']
    
    # Recommend a destination based on cluster group
    # We could use real data with popular destinations here
    destinations = {
        0: "New Zealand",
        1: "Japan",
        2: "Iceland",
        3: "Bali",
        4: "Switzerland"
    }
    
    return destinations.get(cluster, "Destination Unknown")

if __name__ == "__main__":
    df = cluster_users(df)
    user_id = 1  # Example User
    destination = recommend_destination(user_id, df)
    print(f"Recommended Destination for User {user_id}: {destination}")
