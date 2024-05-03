import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ProductCardSlide from '../ProductCardSlide/ProductCardSlide.jsx';
import { useStore } from '../../context/store.js';
import {
    fetchCategories,
    getFavorites,
    totalCount,
    fetchRating,
} from '../../redux/actions/actions.js';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { Loader } from '../Loader/Loader.jsx';
import {
    handleDeleteFavorite,
    handleSaveFavorite,
} from '../Cart/actionsCart.js';
import { useNavigate } from 'react-router-dom';
import { alertInfo, alertSuccess, alertWarning } from '../../helpers/toast';

import '../SlideMostSold/SlideMostSold.scss';

export default function SlideRating() {
    const { t, i18n } = useTranslation();
    const [user, setUser] = useState([]);
    const [state, dispatch] = useStore();
    const [cart, setCart] = useState([]);
    const [inCart, setInCart] = useState(false);
    const navigate = useNavigate();
    let person = JSON.parse(localStorage.getItem('myUser'));

    const sold = state.soldMost[0]?.details;
    const handleSaveCart = (name, price, image, id, stock) => {
        let quantity = 1;
        let totalPrice = price;
        // let price = accounting.formatMoney(price, "U$D ", 0)
        let products = { name, price, image, id, stock, quantity, totalPrice };
        let value = cart.find((e) => e.name === name);

        let person = JSON.parse(localStorage.getItem('myUser'));
        if (!person) {
            alertWarning(t('home.logInProducts'));
            setTimeout(() => {
                navigate('/logIn');
            }, 2000);
        } else if (value) {
            setInCart(false);
            alertInfo(t('home.altAlreadyInCart'));
        } else {
            setInCart(true);
            setCart((cart) => [...cart, products]);
            alertSuccess(t('home.altAddToCart'));
        }
    };

    useEffect(() => {
        let myUser = JSON.parse(localStorage.getItem('myUser'));
        let myCart = JSON.parse(localStorage.getItem(myUser));
        fetchCategories(dispatch);
        getFavorites(dispatch, person);
        fetchRating(dispatch);
        setUser(myUser);
        if (myCart) {
            setCart(myCart);
        } else {
            setCart([]);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(user, JSON.stringify(cart));
        totalCount(dispatch);
    }, [cart]);

    return (
        <div className="div-slide">
            <Swiper
                loop={true}
                modules={[Navigation]}
                navigation={true}
                breakpoints={{
                    500: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },

                    640: {
                        slidesPerView: 2,
                        spaceBetween: 0,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 0,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 0,
                    },
                }}
                pagination={{
                    clickable: true,
                }}
                className="mySwiper"
            >
                {/* <button onClick={() => mostra()}>mostra storage</button> */}

                {state.rating && state.favorites ? (
                    React.Children.toArray(
                        state.rating.map((product) => {
                            if (product.status === 'active') {
                                return (
                                    <SwiperSlide>
                                        <ProductCardSlide
                                            id={product.id}
                                            name={product.name}
                                            stock={product.stock}
                                            price={product.price}
                                            image={product.image}
                                            handleSaveCart={handleSaveCart}
                                            handleSaveFavorite={
                                                handleSaveFavorite
                                            }
                                            handleDeleteFavorite={
                                                handleDeleteFavorite
                                            }
                                            isAdd={state.favorites.find(
                                                (e) => e.id === product.id
                                            )}
                                            alertSuccess={alertSuccess}
                                        />
                                    </SwiperSlide>
                                );
                            }
                            return null;
                        })
                    )
                ) : (
                    <div className="container-loader">
                        <Loader />
                    </div>
                )}
            </Swiper>
        </div>
    );
}
