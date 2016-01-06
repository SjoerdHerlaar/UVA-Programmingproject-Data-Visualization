import csv
import json
CSV = "Emissies.csv"

if __name__ == '__main__':
    data = []
    with open(CSV, 'r') as K:
        reader = csv.reader(K, delimiter=";")
        for row in reader:
            data.append(row)
	data = data[1:27]
	data_dict = {}
	yearlist = data[0][3:20]
	print yearlist
	data = data[1:26]
	counter = 0
	for year in yearlist:
		yeardict = {}
		for entry in data:
			key = entry[1]
			value = entry[3 + counter]
			yeardict[key] = value
		data_dict[year] = yeardict
		counter += 1

	json_list = json.dumps(data_dict, indent=4)
	jsontext = open('emissies.json', 'w')
	jsontext.write(json_list)
	jsontext.close()