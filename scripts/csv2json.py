import csv
import json


csvfile = open('./static/data/portugal_locations.csv', 'r', encoding="utf-8")
jsonfile = open('./static/data/portugal_locations_output.json', 'w', encoding="utf-8")

fields=("Type","Name","lat","lon")

output_json = { "type": "FeatureCollection", "features": [] }

reader = csv.DictReader( csvfile, fields)
for row in reader:
    inner_json = {
        "type": "feature",
        "geometry": {
            "type": "Point",
            "coordinates": [row["lon"], row["lat"]]
        },
        "properties": {
            "title": row["Name"]
        }
    }
    output_json["features"].append(inner_json)

json.dump(output_json, jsonfile)
jsonfile.write('\n')