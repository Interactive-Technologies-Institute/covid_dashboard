import json

def process_json(filename, dir):
    meujson = None
    with open(filename) as data_file:
        meujson = json.load(data_file)
        
    data = meujson['data']
    
    stride = 10
    
    num = 0
    
    
    for i in range(0, len(data), stride):
        print(i, i + stride)
        output_json = data[i : i + stride]
        jsonfilename = f"{dir}/{num}.json"
        
        with open(jsonfilename, 'w', encoding="utf-8") as jsonfile:
            json.dump(output_json, jsonfile, ensure_ascii=False)

        num = num + 1
    
files = [('static/data/iqd.json', 'static/data/iqd'), ('static/data/inc.json', 'static/data/inc'), ('static/data/prob.json', 'static/data/prob')]

for (file, dir) in files:
    process_json(file, dir)