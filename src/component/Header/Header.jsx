import { useEffect } from 'react'
import styles from './Header.module.css'
import sale from "../../../public/img/sale.jpg"

export default function Header(){

    return (
        <>
            <header className={styles['header']}>

                <div className={styles['header_block1']}>
                    <h1>Сайты</h1>
                    <h1>Продвижение</h1>
                    <h1>Реклама</h1>
                    <h1>Поддержка</h1>
                    <h1>Маркетплейсы</h1>
                </div>
                <div className={styles['header_block2']}>
                    <h1>Цены</h1>
                    <h1>Портфолио</h1>
                    <h1>Кейсы</h1>
                    <h1>Отзывы</h1>
                    <h1>О нас</h1>
                    <h1>Контакты</h1>
                </div>

            </header>

            <section className={styles['one']}>

                <div className={styles['burger']}>
                    
                </div>

                <div className={styles['one_one']}>

                    <img className={styles['logo']} src="./public/img/logo.png" alt="" />

                    <div className={styles['info']}>
                        <a href="tel:88002009460">8-800-200-94-60</a>
                        <a href="mailto:rop@web-canape.ru">rop@web-canape.ru</a>
                    </div>

                    <img className={styles['tg']} src="./public/tg.svg" alt="" />

                </div>

                <div className={styles['one_two']}>

                    <div className={styles['one_two-sale']}>
                        <img src={sale} alt="" />
                        <h1>Акции</h1>
                    </div>
                    <div className={styles['one_two-help']}>
                        <img src="./public/img/help.png" alt="" />
                        <h1>Служба поддержки</h1>
                    </div>

                    <button className={styles['button']}>Заказать услуги</button>
                </div>

            </section>

            <section className={styles['two']}>
                <h1 className={styles['feedback']}>Отзывы</h1>
                <h1 className={styles['addres']}><span className={styles['addres_span']}>Главная </span>/ Отзывы</h1>
            </section>
        </>
    )
}