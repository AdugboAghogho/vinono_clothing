export default {
  name: 'order',
  title: 'Customer Orders',
  type: 'document',
  fields: [
    {name: 'customerName', title: 'Customer Name', type: 'string'},
    {name: 'phoneNumber', title: 'Phone Number', type: 'string'},
    {name: 'address', title: 'Shipping Address', type: 'string'},
    {name: 'city', title: 'City', type: 'string'},
    {
      name: 'items',
      title: 'Ordered Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'productName', title: 'Product Name', type: 'string'},
            {
              name: 'productImage',
              title: 'Product Image URL',
              type: 'url', // Critical: Added this field
              // options: { hotspot: true }
            },
            {name: 'quantity', title: 'Quantity', type: 'number'},
            {name: 'size', title: 'Size', type: 'string'},
            {name: 'price', title: 'Price at Purchase', type: 'number'},
          ],
        },
      ],
    },
    {name: 'totalPrice', title: 'Total Price (₦)', type: 'number'},
    {
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending (Awaiting WhatsApp)', value: 'pending'},
          {title: 'Confirmed/Paid', value: 'paid'},
          {title: 'In Production (Tailoring)', value: 'production'},
          {title: 'Completed/Delivered', value: 'completed'},
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
    },
    {
      name: 'orderDate',
      title: 'Order Date',
      type: 'datetime',
      initialValue: new Date().toISOString(),
    },
  ],
  preview: {
    select: {title: 'customerName', subtitle: 'totalPrice'},
    prepare({title, subtitle}) {
      return {
        title: `Order: ${title}`,
        subtitle: `₦${subtitle ? subtitle.toFixed(2) : '0.00'}`,
      }
    },
  },
}
