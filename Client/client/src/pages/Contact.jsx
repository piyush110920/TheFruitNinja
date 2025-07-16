import React from 'react'

const Contact = () => {
  return (
    <div className="bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      
      {/* Contact Form */}
      <div className="bg-white p-8 shadow-lg rounded-2xl">
        <h2 className="text-3xl font-bold text-green-700 mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-6">We'd love to hear from you! Fill out the form below and we'll get back to you soon.</p>
        <form className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea
              rows="5"
              placeholder="How can we help you?"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-xl hover:bg-primary-dull transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Contact Info */}
      <div className="bg-green-100 p-8 shadow-lg rounded-2xl text-green-900">
        <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
        <p className="mb-4 text-primary-dull">Need help with your order or have any questions? Reach out to us via the following details.</p>
        <div className="space-y-4">
      
          <div>
            <h4 className="font-semibold ">Phone</h4>
            <p className='text-primary-dull'>+91 8767617675</p>
          </div>
          <div>
            <h4 className="font-semibold ">Email</h4>
            <p className='text-primary-dull'>support@quickbasket.com</p>
          </div>
          <div>
            <h4 className="font-semibold ">Hours</h4>
            <p className='text-primary-dull'>Mon - Sat: 9:00 AM – 8:00 PM</p>
          </div>
        </div>
      </div>

    </div>
  </div>
  )
}

export default Contact