const data = [
    {
      mainCategory: 'Category A',
      value: 'Value A', // Add a value field for main categories
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
      mainCategory: 'Category B',
      value: 'Value B',
      subCategories: [
        {
          name: 'Subcategory 3',
          group: 'Value B',
          value: 'Value 3'
        },
        {
          name: 'Subcategory 4',
          group: 'Value B',
          value: 'Value 4'
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