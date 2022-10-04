//import { Link } from "react-router-dom";
import { useAppDispatch } from "../../config";
import { deleteProduct } from "../../redux/actions";
import { Card } from "flowbite-react/lib/esm/components";
import { buttonclass } from '../../Style/Clases/Clases'
import PrettyRating from "pretty-rating-react";
//import React, { useEffect, useState } from "react";
//import DetailProduct from "../DetailProduct/DetailProduct";
import '../Card/Card.css'
import { CardProp } from "../../Interfaces/Interfaces";

export default function CardProduct({ formCard = false, comidaProps, onProducEdit, modalOpen, setIdModal }: any) {

    let { _id, price, off, description, name, img, rating } = comidaProps
    let dispatch = useAppDispatch()
    let currentprice = price - (price * off / 100)

    const handleEdit = () => {
        onProducEdit(comidaProps)
    }

    const handleDelete = () => {
        dispatch(deleteProduct(_id))
    }

    function openModalDetail(_id: string) {
        modalOpen(true)
        setIdModal(_id)
    }

    const colors = {
        star: ['#d9ad26', '#d9ad26', '#434b4d'],
    }

    return (
        <div className="max-w-sm" data-aos="fade-up" data-aos-duration="1500">
            <Card
                imgAlt={name}
                imgSrc={img}
            >
                <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{name}</h2>
                <p className="text-l font-semibold tracking-tight text-gray-900 dark:text-white">
                    {description}
                </p>
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
                                <button onClick={() => openModalDetail(_id)} className={buttonclass}>
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">
                                    </path></svg>
                                </button>
                                <button className={buttonclass} onClick={handleEdit}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                </button>
                                <button className={buttonclass} onClick={handleDelete}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </div>
                    }
                </div>
            </Card>
        </div >
    )
}