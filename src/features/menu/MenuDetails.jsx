import { Link } from 'react-router'

import { Helmet } from 'react-helmet-async'
// import helmetSycn from 'react-helmet-async'
// const { Helmet } = helmetSycn
import { useGetMenu } from './useGetMenu'

const MenuDetails = () => {
    const { recipe, isLoading } = useGetMenu()

    if (isLoading) return <p>Loading recipe...</p>
    if (!isLoading && !recipe) return <div className="p-8 text-center text-xl">Recipe not found</div>

    return (
        <>
            <Helmet>
                <title>{recipe.title} - Our Restaurant</title>
                <meta name="description" content={recipe.description} />
                <meta name="keywords" content={`${recipe.title},${recipe.ingredients.join(",")} recipe, Our Restaurant, dish`} />
                <link rel="icon" type='image/*' href={`${recipe.image_url}`} />
                <link
                    key={recipe.image_url}
                    rel="preload"
                    as="image"
                    href={recipe.image_url}
                />
                {/* Open Graph Meta */}
                <meta property="og:title" content={`${recipe.title} - Our Restaurant`} />
                <meta property="og:description" content={recipe.description} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`${recipe.id}/${encodeURIComponent(recipe.title.split(" ").join("-"))}`} />
                <meta property="og:image" content={`${recipe.image_url}`} />
            </Helmet>
            <Link
                to="/menu"
                className="text-primary underline mb-4 cursor-pointer"
            >
                ← Back
            </Link>

            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <img
                    src={`${recipe.image_url}`}
                    alt={recipe.title}
                    className="w-full h-64 object-cover"
                />
                <div className="p-6">
                    <h1 className="text-3xl text-primary font-bold mb-2">{recipe.title}</h1>
                    <p className="text-grey-dark2 mb-4">by {recipe.publisher}</p>
                    <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">Ingredients</h2>
                    <ul className="list-disc list-inside space-y-2 text-grey-dark2 text-lg">
                        {recipe.ingredients.map((ing, idx) => (
                            <li key={idx} className="pl-2">{ing}</li>
                        ))}
                    </ul>

                    <Link
                        to={`${recipe.source_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-white bg-primary px-4 py-2 rounded-full shadow-md hover:bg-opacity-90"
                    >
                        View Full Recipe
                    </Link>
                </div>
            </div>
        </>
    )
}

export default MenuDetails
