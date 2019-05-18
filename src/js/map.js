require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/widgets/Locate",
  "esri/widgets/Search",
  "esri/tasks/Locator",
  "esri/widgets/Search/LocatorSearchSource",
  "esri/widgets/Track",
], function(Map, MapView, Graphic, Locate, Search, Locator, LocatorSearchSource, Track) {
  let tagsToDisplay = ["assistant", "depart"];

  let assistant_visited_stored = sessionStorage.getItem('assistant_visited');
  if ( assistant_visited_stored === 'true') {
    tagsToDisplay.push("others");
  }
  if ( sessionStorage.getItem('enigme_found') === 'true') {
    tagsToDisplay.push("pilleur");
  }
  if ( sessionStorage.getItem('tresor_found') === "true" ) {
    tagsToDisplay = ["arrivee"];
  }

  const map = new Map({
    basemap: "satellite"
  });
  let view = new MapView({
    center: [4.577407, 45.848032],
    container: "viewDiv",
    map: map,
    zoom: 16
  });

  let colordepart = "#28e2d8";
  let colorPersonnage = "#e27728";
  let colorLieu = "#fd2d73";
  let colorVisited = "#339900";

  // Create a symbol for drawing the point
  let personnageMarker = {
    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
    color: colorPersonnage,
    outline: { // autocasts as new SimpleLineSymbol()
      color: [255, 255, 255],
      width: 2
    }
  };
  let lieudepart = {
    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
    color: colordepart,
    outline: { // autocasts as new SimpleLineSymbol()
      color: [255, 255, 255],
      width: 2
    }
  };
  // Create a symbol for drawing the point
  let lieuMarker = {
    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
    color: colorLieu,
    outline: { // autocasts as new SimpleLineSymbol()
      color: [255, 255, 255],
      width: 2
    }
  };

  let visitedMarker = {
    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
    color: colorVisited,
    outline: { // autocasts as new SimpleLineSymbol()
      color: [255, 255, 255],
      width: 2
    }
  };

  const textSymbol = {
    type: "text",  // autocasts as new TextSymbol()
    color: "",
    text: "",
    haloColor: "black",
    haloSize: "1px",
    yoffset: 10,
    font: {  // autocasts as new Font()
      size: 10,
      family: "sans-serif",
      weight: "bold"
    }
  };

  let listLocation = [];

  for (let location_key in map_map) {
    let location = map_map[location_key];
    // On vérifie si on doit bien afficher ce point ou pas
    if (tagsToDisplay.indexOf(location["tag"]) > -1) {
      let point = {
        type: "point", // autocasts as new Point()
        longitude: location['longitude'],
        latitude: location['latitude']
      };
      let graphic;
      if (location["type"] === "depart") {
        graphic = new Graphic({
          geometry: point,
          symbol: lieudepart
        });
        textSymbol.color = colordepart;
      } else {
        if (sessionStorage.getItem(location['name'].toLowerCase() + '_visited') === "true") {
          graphic = new Graphic({
            geometry: point,
            symbol: visitedMarker
          });
          textSymbol.color = colorVisited;
        } else {
          if (location['type'] === "lieu") {
            graphic = new Graphic({
              geometry: point,
              symbol: lieuMarker
            });
            textSymbol.color = colorLieu;
          } else {
            graphic = new Graphic({
              geometry: point,
              symbol: personnageMarker
            });
            textSymbol.color = colorPersonnage;
          }
        }
      }
      textSymbol.text = location['name'];
      let graphicText = new Graphic({
        geometry: point,
        symbol: textSymbol
      });
      listLocation.push(graphic);
      listLocation.push(graphicText);
    }
  }

  // Add the graphics to the view's graphics layer
  view.graphics.addMany(listLocation);
  /*
  let locateBtn = new Locate({
    view: view
  });

  // Add the locate widget to the top left corner of the view
  view.ui.add(locateBtn, {
    position: "top-left"
  });
  */
  let trackWidget = new Track({
    view: view
  });

  view.ui.add(trackWidget, "top-left");
  // trackWidget.start();

  let searchWidget = new Search({
    view: view,
    sources: [{
      locator: new Locator({ url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer" }),
      singleLineFieldName: "SingleLine",
      name: "Custom Geocoding Service",
      localSearchOptions: {
        minScale: 300000,
        distance: 50000
      },
      placeholder: "Recherche GPS",
      maxResults: 1,
      maxSuggestions: 0,
      suggestionsEnabled: false,
      minSuggestCharacters: 0
    }],
    includeDefaultSources: false,
    popupEnabled: false
  });
  searchWidget.goToOverride = function(view, goToParams) {
    //x : 509554.61639355734, y : 5756029.5958736045
    if (Math.round(view.center.x / 10000) === 51 && Math.round(view.center.y / 100000) === 58) {
      sessionStorage.setItem('enigme_found', 'true');
      return view.goTo(goToParams.target, goToParams.options);
    }
  };
  // Add the search widget to the top right corner of the view
  view.ui.add(searchWidget, {position: "top-right"});
});
