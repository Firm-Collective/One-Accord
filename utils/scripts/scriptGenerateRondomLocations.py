import json
import random

# Función para obtener coordenadas aleatorias dentro de un rango específico
def get_random_coordinates(latitude_range, longitude_range):
    new_lat = random.uniform(*latitude_range)
    new_lon = random.uniform(*longitude_range)
    return new_lat, new_lon

# Diccionario de continentes y sus rangos de latitud y longitud
continents = {
    "North America": (10, 80),      # Latitud: de 10 a 80 grados, Longitud: cualquier valor
    "Central America": (0, 30),     # Latitud: de 0 a 30 grados, Longitud: cualquier valor
    "South America": (-60, 15),     # Latitud: de -60 a 15 grados, Longitud: cualquier valor
    "Africa": (-35, 40),            # Latitud: de -35 a 40 grados, Longitud: cualquier valor
    "Europe": (35, 70),             # Latitud: de 35 a 70 grados, Longitud: cualquier valor
    "Asia": (0, 80)                 # Latitud: de 0 a 80 grados, Longitud: cualquier valor
}

# Number of objects
num_objects = 10

# List to store generated objects
features = []

for continent, (min_lat, max_lat) in continents.items():
    for i in range(num_objects):
        # Obtener coordenadas aleatorias dentro del rango del continente
        latitude, longitude = get_random_coordinates((min_lat, max_lat), (-180, 180))

        # Generar una actividad aleatoria
        activities = ["Trumpet", "Communion", "Worship", "Prayer"]
        activity = random.choice(activities)

        # Crear objeto
        obj = {
            "type": "Feature",
            "properties": {
                "geojsonId": len(features) + 1,  # ID incremental
                "name": f"Location {len(features) + 1}",
                "continent": continent,
                "activity": activity
            },
            "geometry": {
                "type": "Point",
                "coordinates": [longitude, latitude]
            }
        }

        # Añadir objeto a la lista de features
        features.append(obj)

# Crear la colección de features
feature_collection = {
    "type": "FeatureCollection",
    "features": features
}

# Escribir en archivo JSON
output_file = "../data/mockDataGeoContinents.json"
with open(output_file, "w") as f:
    json.dump(feature_collection, f, indent=2)

print(f"Archivo JSON creado exitosamente: {output_file}")
