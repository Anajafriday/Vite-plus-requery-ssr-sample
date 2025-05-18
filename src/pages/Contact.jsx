import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
// import helmetSycn from 'react-helmet-async'
// const { Helmet } = helmetSycn

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' })

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        alert(`Message sent! Thanks, ${form.name}`)
        setForm({ name: '', email: '', message: '' })
    }

    return (
        <div className="min-h-screen bg-grey-light1 flex items-center justify-center px-4 py-20">
            <Helmet>
                <title>Contact Us - Our Restaurant</title>
                <meta name="description" content="Have questions or feedback? Contact Our Restaurant for quick assistance." />
                <meta name="keywords" content="contact, support, Our Restaurant, questions, help" />
                <link rel="icon" href="/favicon.ico" />

                {/* Open Graph Meta */}
                <meta property="og:title" content="Contact Our Restaurant" />
                <meta property="og:description" content="Reach out to us for any questions, feedback, or reservations." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://yourdomain.com/contact" />
                <meta property="og:image" content="https://yourdomain.com/og-contact.jpg" />
            </Helmet>
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl"
            >
                <h1 className="text-3xl font-bold text-primary mb-6">Get in Touch</h1>
                <div className="mb-4">
                    <label className="block text-grey-dark1 font-medium mb-1">Name</label>
                    <input
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border border-grey-light3 rounded-lg p-3 outline-primary"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-grey-dark1 font-medium mb-1">Email</label>
                    <input
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border border-grey-light3 rounded-lg p-3 outline-primary"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-grey-dark1 font-medium mb-1">Message</label>
                    <textarea
                        name="message"
                        rows="5"
                        required
                        value={form.message}
                        onChange={handleChange}
                        className="w-full border border-grey-light3 rounded-lg p-3 outline-primary"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-gradient-to-br from-grad1 to-grad2 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:opacity-90 transition"
                >
                    Send Message
                </button>
            </form>
        </div>
    )
}

export default Contact
