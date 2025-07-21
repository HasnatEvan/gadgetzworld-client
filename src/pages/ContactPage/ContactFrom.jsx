import image from '../../assets/Contact/ContactFromImage.jpg';
import useAuth from '../../Hooks/useAuth';
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

const ContactFrom = () => {
  const { user } = useAuth();
  const form = useRef();

  const [formData, setFormData] = useState({
    user_name: user?.displayName || '',
    user_email: user?.email || '',
    message: '',
  });

  const [loading, setLoading] = useState(false); // লোডিং state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true); // লোডিং শুরু

    emailjs
      .sendForm('service_g5m56bi', 'template_dzf39mm', form.current, {
        publicKey: '6mCl6dHVCwoTQmCc3',
      })
      .then(
        () => {
          toast.success('Message sent successfully!');
          setFormData({
            user_name: user?.displayName || '',
            user_email: user?.email || '',
            message: '',
          });
          setLoading(false); // লোডিং শেষ
        },
        (error) => {
          console.error('FAILED...', error.text);
          toast.error('Failed to send message. Please try again later.');
          setLoading(false); // লোডিং শেষ
        }
      );
  };

  return (
    <div className="bg-gray-100 text-gray-600 px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Form Section */}
        <form
          ref={form}
          onSubmit={sendEmail}
          className="space-y-6 p-5 sm:p-6 w-full "
        >
          <h2 className="text-2xl font-bold text-gray-700">
            Fill Up The Form If You Have Any Question
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="user_name"
              placeholder="Name*"
              required
              value={formData.user_name}
              onChange={handleChange}
              readOnly={!!user?.displayName}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ef8220] ${
                user?.displayName ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />
            <input
              type="email"
              name="user_email"
              placeholder="Email*"
              required
              value={formData.user_email}
              onChange={handleChange}
              readOnly={!!user?.email}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ef8220] ${
                user?.email ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />
          </div>

          <textarea
            name="message"
            rows="5"
            placeholder="Write Message Here"
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ef8220]"
          ></textarea>

          <button
            type="submit"
            disabled={loading}  // সাবমিটের সময় disable করবে
            className="bg-[#ef8220] text-white px-6 py-2 rounded-lg hover:bg-[#d76e0e] transition duration-300 w-full sm:w-auto flex justify-center items-center gap-2"
          >
            {loading ? (
              <span className="loading loading-infinity loading-xl"></span>
            ) : (
              "Send Message"
            )}
          </button>
        </form>

        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src={image}
            alt="Contact Illustration"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md h-auto rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactFrom;
