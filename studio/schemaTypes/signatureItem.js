export default {
  name: 'signatureItem',
  title: 'Signature Item',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Item Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'desc',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.required()
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'iconType',
      title: 'Icon Type',
      type: 'string',
      options: {
        list: [
          { title: 'Sparkles', value: 'sparkles' },
          { title: 'Droplet', value: 'droplet' },
          { title: 'Compass', value: 'compass' },
          { title: 'Coffee Cup', value: 'coffee' }
        ]
      },
      initialValue: 'coffee'
    },
    {
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0
    }
  ]
}
