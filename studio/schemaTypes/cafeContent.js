export default {
  name: 'cafeContent',
  title: 'Cafe Content',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Document Title',
      type: 'string',
      initialValue: 'Roots Landing Page Content',
      readOnly: true
    },
    // Hero Section
    {
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    },
    // Story Section
    {
      name: 'storyLabel',
      title: 'Story Section Label',
      type: 'string',
      initialValue: 'Our Story'
    },
    {
      name: 'storyTitle',
      title: 'Story Grounded Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'storyTitleItalic',
      title: 'Story Italic Title Accent',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'storyParagraph1',
      title: 'Story Paragraph 1',
      type: 'text',
      rows: 4
    },
    {
      name: 'storyQuote',
      title: 'Story Highlight Quote',
      type: 'text',
      rows: 2
    },
    {
      name: 'storyParagraph2',
      title: 'Story Paragraph 2',
      type: 'text',
      rows: 4
    },
    // Location Section
    {
      name: 'locationAddress',
      title: 'Sanctuary Physical Address',
      type: 'text',
      rows: 3
    },
    {
      name: 'locationHours',
      title: 'Open Hours',
      type: 'text',
      rows: 2
    },
    {
      name: 'locationPhone',
      title: 'Phone Number',
      type: 'string'
    },
    {
      name: 'locationEmail',
      title: 'Contact Email',
      type: 'string'
    },
    {
      name: 'locationMapUrl',
      title: 'Google Map Iframe Embed URL',
      type: 'url'
    }
  ]
}
