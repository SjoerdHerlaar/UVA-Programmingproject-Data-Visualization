import csv
import json
CSV = "Energiebalans_simpel.csv"

if __name__ == '__main__':
    data = []
    with open(CSV, 'r') as K:
        reader = csv.reader(K, delimiter=";")
        for row in reader:
            data.append(row)
	data = data[1:38]
	data_dict = {}
	yearlist = data[0][5:25]
	print yearlist
	data = data[3:27]
	counter = 0
	for year in yearlist:
		yeardict = {}
		for entry in data:
			key = entry[3]
			value = entry[5 + counter]
			yeardict[key] = value
		data_dict[year] = yeardict
		counter += 1

	json_list = json.dumps(data_dict, indent=4)
	jsontext = open('consumption.json', 'w')
	jsontext.write(json_list)
	jsontext.close()