const data = [
    {
      name: 'Lighting',
      value: 'lighting',
      subCategories: [
        {
          name: 'Switching',
          group: 'lighting',
          value: 'switching'
        },
        {
          name: 'Colour',
          group: 'lighting',
          value: 'colour'
        },
        {
          name: 'Sequences',
          group: 'lighting',
          value: 'sequences'
        }
      ]
    },
    {
      name: 'Security',
      value: 'security',
      subCategories: [
        {
          name: 'Storm/Rain Satellite Unit',
          group: 'security',
          value: 'storm-rain-satellite-unit'
        },
        {
          name: 'Storm/Rain Universal Transmitter',
          group: 'security',
          value: 'storm-rain-universal-transmitter'
        },
        {
          name: 'Storm/Rain',
          group: 'security',
          value: 'storm-rain'
        },
        {
          name: 'Leakage',
          group: 'security',
          value: 'leakage'
        }
      ]
    }
  ];
  
  export default data;
  
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