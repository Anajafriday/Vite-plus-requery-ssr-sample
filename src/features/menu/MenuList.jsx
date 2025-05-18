import { Link } from 'react-router'
import { Helmet } from 'react-helmet-async'
// import helmetSycn from 'react-helmet-async'
// const { Helmet } = helmetSycn
import { useGetMenus } from './useGetMenus'

const MenuList = () => {
    const { data, isLoading } = useGetMenus()
    if (isLoading) return <p>Loading menu...</p>
    const { recipes } = data
    return (
        <>
            <Helmet>
                <title>Our Menu - Our Restaurant</title>
                <meta name="description" content="Explore a variety of handcrafted dishes available at Our Restaurant. Find your new favorite today!" />
                <meta name="keywords" content="menu, dishes, recipes, Our Restaurant, food list" />
                <link rel="icon" href="/favicon.png" />
                {/* PRELOAD IMAGES  */}
                {recipes.map((r) => (
                    <link
                        key={r.image_url}
                        rel="preload"
                        as="image"
                        href={r.image_url}
                    />
                ))}
                {/* Open Graph Meta */}
                <meta property="og:title" content="Our Menu - Our Restaurant" />
                <meta property="og:description" content="Explore handcrafted dishes and discover your next favorite meal." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`/menu`} />
                <meta property="og:image" content={`/favicon.png`} />
            </Helmet>
            <h1 className="text-4xl text-primary font-bold text-center mb-8">Our Menu</h1>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {recipes.map(recipe => (
                    <Link
                        key={recipe.recipe_id}
                        to={`/menu/${recipe.recipe_id}/${encodeURIComponent(recipe.title.split(" ").join("-"))}`}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105"
                    >
                        <img
                            src={recipe.image_url}
                            alt={recipe.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-lg text-grey-dark1 font-semibold">{recipe.title}</h2>
                            <p className="text-sm text-grey-dark2">by {recipe.publisher}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default MenuList
