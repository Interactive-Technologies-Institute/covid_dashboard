import csv
import json

with open('./static/data/openstrmap_equipamentos.csv', 'r', encoding="utf-8") as csvfile, \
     open('./static/data/portugal_locations_output.json', 'w', encoding="utf-8") as jsonfile:
    
    output_json = {"type": "FeatureCollection", "features": []}

    reader = csv.DictReader(csvfile, delimiter=';')  # Use o delimitador correto (;)

    for row in reader:
        try:
            lon = float(row["lon"].replace(',', '.'))
            lat = float(row["lat"].replace(',', '.'))
        except ValueError:
            #Ignorando linha com coordenadas inválidas
            continue
        
        inner_json = {
            "type": "Feature", 
            "geometry": {
                "type": "Point",
                "coordinates": [lon, lat] 
            },
            "properties": {
                "title": row["Name"]
            }
        }
        output_json["features"].append(inner_json)

    json.dump(output_json, jsonfile, ensure_ascii=False, indent=4)  

