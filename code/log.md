#CodeLog Sjoerd Herlaar

### 05-01-2016
Updated README for deadline and made a start with the first bar chart.
started searching for data for the energy use and
greenhouse gas production. Bar chart doesn't work yet.

### 06-01-2016
Added sketch to README for better understanding of idea.

### 07-01-2015
Found right dataset for energy use and greenhouse production,
created python data converter to create JSON for use in visualizations.
Added a Design_Document.

### 08-01-2016
Created HTML to house JS files, changed sketch to include stacked bar charts.
Rewrote Design Document and README changed to include changes from
pie charts to stacked bar charts.

### 11-01-2016
Started working on stacked bar chart. Normal bar chart still doesn't work,
doesn't seem to read data right, errors occur when creating the scales and
drawing the actual bars

### 12-01-2016
Bar chart works, there was a problem with the way the data loaded,
this wasn't finished before the first call to the data was made,
creating an error. The code was within the brackets of d3.json first but because
of the way the data loaded this did not render anything.
Instead, a function called drawBarchart was created that is called when the data
loaded.
Instead of loading directly from the JSON for the chart a function called
retrievedata was created that takes the needed data from the JSON and returns it
as a list of objects.

### 14-01-2016
Focus on stacked chart given, seems a lot harder than first anticipated.
The data should be stored in a specific way, in order to be able to stack
the different bars.
