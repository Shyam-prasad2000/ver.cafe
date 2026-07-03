export default {
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Item Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'desc',
      title: 'Description',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'price',
      title: 'Price (with currency)',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Specialty Coffee', value: 'coffee' },
          { title: 'Local Infusions', value: 'infusions' },
          { title: 'Artisanal Bakes', value: 'bakes' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0
    }
  ]
}
