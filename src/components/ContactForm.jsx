import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://formspree.io/f/yourFormID", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 text-white py-16 px-4 md:px-20 min-h-screen"
    >
      <h2 className="text-2xl font-semibold text-center mb-8">Contact Us</h2>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={form.name}
            onChange={handleChange}
            className="p-3 rounded bg-gray-800 w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={form.email}
            onChange={handleChange}
            className="p-3 rounded bg-gray-800 w-full"
          />
        </div>
        <textarea
          name="message"
          placeholder="Your Message"
          required
          value={form.message}
          onChange={handleChange}
          className="p-3 rounded bg-gray-800 h-32"
        />
        <button type="submit" className="bg-white text-black py-2 px-6 rounded-full text-sm font-semibold self-start">
          Send Message
        </button>
      </form>
    </motion.section>
  );
}