import { Link } from 'react-router'
import { Helmet } from 'react-helmet-async'
// import helmetSycn from 'react-helmet-async'
// const { Helmet } = helmetSycn

const Home = () => {
    return (
        <div className="bg-grey-light1 min-h-screen flex flex-col justify-center items-center text-center px-4 py-20">
            <Helmet>
                <title>Home - Our Restaurant</title>
                <meta name="description" content="Discover handcrafted recipes at Our Restaurant. Fresh, flavorful, and made with love." />
                <meta name="keywords" content="restaurant, food, menu, gourmet, recipes, Our Restaurant" />
                <link rel="icon" href="/favicon.png" />

                {/* Open Graph Meta */}
                <meta property="og:title" content="Welcome to Our Restaurant" />
                <meta property="og:description" content="Delicious handcrafted recipes made with the finest ingredients." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`/`} />
                <meta property="og:image" content={`/favicon.png`} />
            </Helmet>
            <h1 className="text-5xl font-bold text-primary mb-6">
                Welcome to Our Restaurant
            </h1>
            <p className="text-grey-dark2 text-lg max-w-xl mb-8">
                Discover our delicious handcrafted recipes made with love and the finest ingredients.
            </p>
            <div className="flex gap-4">
                <Link
                    to="/menu"
                    className="bg-gradient-to-br from-grad1 to-grad2 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:opacity-90 transition"
                >
                    View Menu
                </Link>
                <Link
                    to="/contact"
                    className="border-2 border-primary text-primary px-6 py-3 rounded-full font-semibold hover:bg-primary hover:text-white transition"
                >
                    Contact Us
                </Link>
            </div>
        </div>
    )
}

export default Home
