import { Link } from "react-router-dom";
import { useAppDispatch } from "../../config";
import { deleteProduct } from "../../redux/actions";
import { Card } from "flowbite-react/lib/esm/components";
import PrettyRating from "pretty-rating-react";
import {
    faStar,
    faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
    faStar as farStar,
} from "@fortawesome/free-regular-svg-icons";

export default function CardProduct({ formCard = false, comidaProps, onProducEdit }: any) {
    let { _id, price, off, description, name, img, rating } = comidaProps
    let dispatch = useAppDispatch()
    let currentprice = price - (price * off / 100)

    const handleEdit = () => {
        onProducEdit(comidaProps)
    }

    const handleDelete = () => {
        dispatch(deleteProduct(_id))
    }

    const icons = {
        star: {
            complete: faStar,
            half: faStarHalfAlt,
            empty: farStar,
        }
    }
    const colors = {
        star: ['#d9ad26', '#d9ad26', '#434b4d'],
    }

    console.log("COMIDAS PROPS", comidaProps)

    return (
        <div className="max-w-sm">
            <Card
                imgAlt={name}
                imgSrc={img}
            >
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {description}
                </h5>
                <div className="mt-2.5 mb-5 flex items-center">
                    <PrettyRating value={rating} colors={colors.star} />
                    <span className="mr-2 ml-3 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                        {rating}
                    </span>
                </div>
                <div className="flex items-center justify-between">

                    {
                        !off ?
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">${price}</span>
                            :
                            <div className="off_price">
                                <span className="text-3xl font-bold text-gray-900 dark:text-white">${price}</span>
                                <div className="tag_off">
                                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${currentprice}</span>
                                </div>
                            </div>
                    }

                    {
                        formCard ?
                            null
                            :
                            <div>
                                <Link className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" to={`/product/${_id}`}>
                                    Agregar al carrito
                                </Link>
                                <button className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleEdit}>edit</button>
                                <button className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleDelete}>delete</button>
                            </div>
                    }
                </div>
            </Card>
        </div>
    )
}