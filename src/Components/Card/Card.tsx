//import { Link } from "react-router-dom";
import { Card } from "flowbite-react/lib/esm/components";
import { buttonclass } from '../../Style/Clases/Clases'
import PrettyRating from "pretty-rating-react";
//import React, { useEffect, useState } from "react";
//import DetailProduct from "../DetailProduct/DetailProduct";
import '../Card/Card.css'
// import { CardProp } from "../../Interfaces/Interfaces";

export default function CardProduct({ formCard = false, comidaProps, modalOpen, setIdModal }: any) {

    let { _id, price, off, description, name, img, rating, stock } = comidaProps
    let currentprice = price - (price * off / 100)

    function openModalDetail(_id: string) {
        modalOpen(true)
        setIdModal(_id)
    }

    const colors = {
        star: ['#d9ad26', '#d9ad26', '#434b4d'],
    }

    return (
        <div className="max-w-sm" data-aos="fade-left" data-aos-duration="1500">
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
                        {rating.toFixed(2)}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    {
                        stock >= 1 ?
                            <div className="contenedor_precio">
                                <h2 className="food__tag--1_card">Disponible</h2>
                                <div>
                                    {
                                        off ?
                                            <div className="off_price">
                                                <span className="text-2xl font-bold text-gray-900 dark:text-white text-decoration-line: line-through">${price.toFixed(2)}</span>
                                                <div className="food__tag--2_card">
                                                    <h2 className="text-3xs font-bold text-gray-900 dark:text-white">% {off} off</h2>
                                                </div>
                                                <span className="text-2xl font-bold text-gray-900 dark:text-white">${currentprice.toFixed(2)}</span>
                                            </div>
                                            :
                                            <span className="text-2xl font-bold text-gray-900 dark:text-white">${price.toFixed(2)}</span>
                                    }
                                </div>
                                <div>
                                    {
                                        formCard ?
                                            null
                                            :
                                            <div>
                                                <button onClick={() => openModalDetail(_id)} className={buttonclass}>
                                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">
                                                    </path></svg>
                                                </button>
                                            </div>
                                    }
                                </div>
                            </div>
                            :
                            <div className="food__tag--2_card">
                                <h1>Producto sin stock</h1>
                            </div>
                    }

                </div>
            </Card>
        </div >
    )
}