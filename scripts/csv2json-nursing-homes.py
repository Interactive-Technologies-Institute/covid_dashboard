import csv
import json

with open('./static/data/dados_localidades.csv', 'r', encoding="utf-8") as csvfile, \
     open('./static/data/nursing-homes.json', 'w', encoding="utf-8") as jsonfile:
    
    output_json = {"type": "FeatureCollection", "features": []}
    
    reader = csv.DictReader(csvfile, delimiter=';')

    for row in reader:
        try:
            lon = float(row["lon"].replace(',', '.'))
            lat = float(row["lat"].replace(',', '.'))
        except ValueError:
            # Ignorar linhas com coordenadas inválidas
            continue
        
        equip_value = row.get('Equip')
        name_value = row.get('Name')  
        
        if equip_value and "Sociais" in equip_value and name_value.strip() and name_value != "NA":
            inner_json = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [lon, lat]
                },
                "properties": {
                    "title": name_value
                }
            }
            output_json["features"].append(inner_json)
    
    json.dump(output_json, jsonfile, ensure_ascii=False, indent=4)