const serviceAreas = [
    {
      name: 'Lighting',
      value: 'lighting',
      longDescription: '',
      shortDescription: '',
      functionalities: [
        {
          name: 'Switching',
          group: 'lighting',
          value: 'switching',    
          longDescription: '',
          shortDescription: '',
        },
        {
          name: 'Colour',
          group: 'lighting',
          value: 'colour',    
          longDescription: '',
          shortDescription: '',
        },
        {
          name: 'Sequences',
          group: 'lighting',
          value: 'sequences',    
          longDescription: '',
          shortDescription: '',
        }
      ]
    },
    {
      name: 'Security',
      value: 'security',    
      longDescription: '',
      shortDescription: '',
      functionalities: [
        {
          name: 'Storm/Rain Satellite Unit',
          group: 'security',
          value: 'storm-rain-satellite-unit',    
          longDescription: '',
          shortDescription: '',
        },
        {
          name: 'Storm/Rain Universal Transmitter',
          group: 'security',
          value: 'storm-rain-universal-transmitter',    
          longDescription: '',
          shortDescription: '',
        },
        {
          name: 'Storm/Rain',
          group: 'security',
          value: 'storm-rain',    
          longDescription: '',
          shortDescription: '',
        },
        {
          name: 'Leakage',
          group: 'security',
          value: 'leakage',    
          longDescription: '',
          shortDescription: '',
        }
      ]
    },
    {
      name: 'Weather',
      value: 'weather',    
      longDescription: '',
      shortDescription: '',
      functionalities: [
        {
          name: 'Weather forecast',
          group: 'weather',
          value: 'weather-forecast',    
          longDescription: '',
          shortDescription: '',
        },
        {
          name: 'Weather station',
          group: 'weather',
          value: 'weather-station',    
          longDescription: '',
          shortDescription: '',
        },
        {
          name: 'Creation of rules',
          group: 'weather',
          value: 'creation-of-rules',    
          longDescription: '',
          shortDescription: '',
        }
      ]
    },
  ];
  
  export default serviceAreas;
  
  const data1 = [
    {
      subCategories: [
        {
          name: 'Subcategory 1',
          group: 'Value A', // Add a group field for subcategories
          value: 'Value 1'
        },
        {
          name: 'Subcategory 2',
          group: 'Value A',
          value: 'Value 2'
        }
      ]
    },
    {
      mainCategories: [
        {
          name: 'Maincategory 1',
          value: 'Value A'
        },
        {
          name: 'Maincategory 2',
          value: 'Value B'
        }
      ]
    }
  ];