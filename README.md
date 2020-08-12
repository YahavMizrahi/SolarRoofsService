# Solar Roofs Service - Final Project

![GitHub Logo](https://github.com/lahavtalker/SolarRoofs/blob/master/src/components/Navbar/Logo.png?raw=true)</br>
Solar Roofs is a software whose purpose is to provide a database of building roofs who can potentially be used to install photovoltaic systems for solar power generation on them based on the use of data layers and maps from GIS system and the use of the OpenCV library for image analysis.

The system will classify the buildings by priorities according to various parameters, such as available roof space, public or private buildings, location of the building in relation to the sun, the type of roof and more.
This system can be used by municipalities, electricity provider companies and large companies offering the installation of this technology.

## How to use:

- The user enters the main screen.
- The user chooses the service he/she wants.
- The user will be moved to the appropriate screen.

#### Private sevice

1. The user enters the **Private service** screen.
2. The user inputs the **address** in the search bar.
3. The system will check if the address exists, if it does then it the building will be displayed on the map, otherwise, an error will be displayed.
4. The user will click on the analyze image button, if the image exists then a request will be sent to the server and it will perform the image analysis and return an answer, if no image exists then an error will be displayed.

#### Organizational service

5. The user enters the **Organizational service** screen.
6. The user enters the **city** in the search bar.
7. The system will check if the city exists, if it does then a list of the buildings in the city will be displayed, from which you will select the desired building and display it on the map.
8. The user will click on the image analysis button, if the image exists then a request will be sent to the server and it will perform the image analysis and return a reply, if there is no image then an error will be displayed.

## GIS analysis

**The first stage is not an actual feature in the system but it is very important as it describes how our database was created. </br>The process of the database creation consists of several steps:**

- Creating/Acquiring the information layers needed, preferably in a format which fits
  a GIS system (QGIS, ArcGIS etc.)

- Intersections between the layers.

- Classification of each building.

- Rating if each building.

* The analysis will be based on geographic information system or GIS, most of the information will be geographic information such as: topography, climates, building's relative height, and building's roof top are and the building's relative location to rivers and forests and such. However some information will be about the buildings themselves like the type of building and its coordinates.
* The information layers used in this analysis are vector layers and more specifically polygon, line and vertices layers. There will be layers about the heights of the buildings, areas of the buildings, locations of the buildings, layout of rivers, layout of forests, topography layer, layer of climates.
* During the intersections part we take the building layer and perform various intersections with other layers so that each building will have all the necessary information with it.
* Using the results from the previous part, an area classification will be performed – those buildings whose area is less than the bare minimum required will not be included.
* After the area classification, each building will given a grade based on all the information we have on it, for example a building in a snowy area will probably receive lower grade then a building in the desert etc.

The final product will be a database which contains all the buildings and their grades, the higher the grade the higher the potential who that building.

## Image analysis

image analysis also consists of several part:

- After we are provided with an image of the building, we perform an edge detection algorithm to detect the rooftop in the image and calculate the area of ​​the rooftop (more accurately)
- After the rooftop detection, we perform an edge detection on objects within the area of ​​the rooftop and calculate their overall area
- Using both previous stages, we calculate the actual free area on the rooftop using the basic formula: true area = rooftop area - objects area
- We divide the true area from previous stage to block cells and calculate the area of ​​these cells
- Based on the results, we can classify the buildings into two categories: fit for installation or unfit for installation.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
