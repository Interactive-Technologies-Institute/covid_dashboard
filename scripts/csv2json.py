import csv
import json
from datetime import datetime

def processar_pois():
    with open('./static/data/dados_localidades.csv', 'r', encoding="utf-8") as csvfile, \
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
            
            equip_value = row.get('Equip')
            name_value = row.get('Name')  
        
            if equip_value and "Localidade" in equip_value and name_value.strip() and name_value != "NA":
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
        

def processar_casos():
    with open('./static/data/dados_cc_painel.csv', 'r', encoding="utf-8") as csvfile, \
        open('./static/data/casos-covid.json', 'w', encoding="utf-8") as jsonfile:
        
        output_json = {}

        reader = csv.DictReader(csvfile, delimiter=';')  # Use o delimitador correto (;)

        for row in reader:
            oid = row["oid_"]
            input_date = row["t"] # formato 2020-05-15 ano-mes-dia
            taxa = row["tx"]
            ncases = row["ncases"]
            pop = row["pop19"]
            
            date = datetime.strptime(input_date, '%Y-%m-%d')
            
            output_date = date.strftime('%d/%m/%Y') # formato 15/05/2020 dia/mes/ano
            
            if oid not in output_json:
                output_json[oid] = {}
            
            
            output_json[oid][output_date] = {
                "taxa": taxa,
                "ncases": ncases,
                "pop19": pop
        }

        json.dump(output_json, jsonfile, ensure_ascii=False, indent=4)


processar_pois()
#processar_casos()

