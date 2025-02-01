import csv
import json

def processar_pois():
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
        

def processar_casos():
    with open('./static/data/dados_cc_painel.csv', 'r', encoding="utf-8") as csvfile, \
        open('./static/data/casos-covid.json', 'w', encoding="utf-8") as jsonfile:
        
        output_json = {}

        reader = csv.DictReader(csvfile, delimiter=';')  # Use o delimitador correto (;)

        for row in reader:
            oid = row["oid_"]
            data = row["t"]
            taxa = row["tx"]
            ncases = row["ncases"]
            pop = row["pop19"]
            
            if oid not in output_json:
                output_json[oid] = {}
            
            
            output_json[oid][data] = {
                "taxa": taxa,
                "ncases": ncases,
                "pop19": pop
        }

        json.dump(output_json, jsonfile, ensure_ascii=False, indent=4)


#processar_pois()
processar_casos()

