const serviceAreas = [
  {
    name: "Lighting",
    value: "lighting",
    functionalities: [
      {
        name: "Switching",
        group: "lighting",
        value: "switching",
      },
      {
        name: "Colour",
        group: "lighting",
        value: "colour",
      },
      {
        name: "Sequences",
        group: "lighting",
        value: "sequences",
      },
    ],
  },
  {
    name: "Security",
    value: "security",
    functionalities: [
      {
        name: "Storm/Rain Satellite Unit",
        group: "security",
        value: "storm-rain-satellite-unit",
      },
      {
        name: "Storm/Rain Universal Transmitter",
        group: "security",
        value: "storm-rain-universal-transmitter",
      },
      {
        name: "Storm/Rain",
        group: "security",
        value: "storm-rain",
      },
      {
        name: "Leakage",
        group: "security",
        value: "leakage",
      },
    ],
  },
  {
    name: "Weather",
    value: "weather",
    functionalities: [
      {
        name: "Weather forecast",
        group: "weather",
        value: "weather-forecast",
      },
      {
        name: "Weather station",
        group: "weather",
        value: "weather-station",
      },
      {
        name: "Creation of rules",
        group: "weather",
        value: "creation-of-rules",
      },
    ],
  },
];

export default serviceAreas;

const data1 = [
  {
    subCategories: [
      {
        name: "Subcategory 1",
        group: "Value A", // Add a group field for subcategories
        value: "Value 1",
      },
      {
        name: "Subcategory 2",
        group: "Value A",
        value: "Value 2",
      },
    ],
  },
  {
    mainCategories: [
      {
        name: "Maincategory 1",
        value: "Value A",
      },
      {
        name: "Maincategory 2",
        value: "Value B",
      },
    ],
  },
];
