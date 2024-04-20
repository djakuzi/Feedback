import { useEffect, useRef, useState } from "react"
import styles from "./FeedbackDetails.module.css"
import rateIMG from "../../../public/img/rate.png"


const TYPES_OF_SERVICES = {
    site: "РАЗРАБОТКУ САЙТА",
    ad: "РЕКЛАМУ",
    promotion: "ПРОДВИЖЕНИЕ",
    help: "ПОДДЕРЖКУ",
    market: "ПОДДЕРЖКУ МАРКЕТПЛЕЙСОВ"
} //  сделан, чтобы поменять правильность написания услуги на кнопке ЗАКАЗАТЬ. Способ опередедения услуги идет через подставления свойства sort.

export default function FeedbackDetails({sort, data, name, link, enter, open, setOpen, setFormApplications}){

    const [txtLink, setTxtLink] = useState()
    // const refFeedbackDetails = useRef()

    

    useEffect( () => {
        document.body.style.overflow = 'visible' // потому что когда мы переходим с карточки на подробную информацию, то при нахождении курсора на feedbackMEnu свыше 1300 px страница не прокручивается! Поэтому мы рендрениге мы обновляем overflow 

        changeTxt(link)
    }, [])

 //убирает http// or https// в ссылке на сайт, чтобы сделать более красивый текст ссылки
    function changeTxt(link){
        let count = 0
        let txt = ''

        for(let i = 0; i <= link.length - 1; i++){

            if (link[i] == '/' && count <= 2){
                count += 1
                if( count == 2){
                    continue
                }
            }

            if(count >= 2){
                txt += link[i]
            }

        }

        setTxtLink(txt)
    }

    function handleFormApplications(){
        setFormApplications(true)
    }

    

    return (

        <div className={styles["feedbackDetails"]}>
        
        <div className={styles["feedbackDetails__box"]}>
             <div onClick={() => handleFormApplications()} className={styles["product"]}>ЗАКАЗАТЬ: {TYPES_OF_SERVICES[sort]}</div>
             <div className={styles["feedbackDetails__box-inner"]}><div className={styles["feedbackDetails__close"]} onClick={ () => setOpen(false)}></div></div>
           </div>

            <div className={styles["feedbackDetails__flex"]}>

                <div className={styles["feedbackDetails__flex-inner"]}>
                    <div className={styles["workDone"]} >Выполненные работы: {open.workDone}.</div>
                    <div className={styles["support"]}  >Взаимодейтсвие с клиентом: <div>{Array(+open.support).fill(0).map( (el, i) => <img key={i} src={rateIMG} alt="" />)} </div> </div>
                    <div className={styles["proffesional"]}>Профессионализм: <div> {Array(+open.proffesional).fill(0).map( (el, i) => <img key={i} src={rateIMG} alt="" />)} </div> </div>
                    <div className={styles["result"]}>Результат: <div> {Array(+open.result).fill(0).map( (el, i) => <img key={i} src={rateIMG} alt="" />)} </div> </div>
                </div>

                <div className={styles["feedbackDetails__flex-inner"]}>
                    <div className={styles["data"]}>{data != '' ? data : 'нет'}</div>
                    <div className={styles["name"]}>{name != '' ? name : 'нет'}</div>
                    <a className={styles["link"]} href={ link != '' ? link : "#"} target="_blank" >{txtLink != '' ? txtLink: 'нет'}</a>
                </div>

            </div>

            <div className={styles["feedbackDetails__plus-minus"]}>
                <div className={styles["plus"]}> <span> Плюсы </span> {open.plus}.</div>
                <div className={styles["minus"]}> <span> Минусы </span> {open.minus}.</div>
            </div>

            <div className={styles["enter"]}><span>Отзыв</span>{enter}</div>
            
            <div className={styles["recommendations"]}> 
                <span>Рекомендации от клиента</span>
                 {open.recommendations}.
                 {/* {open.recommendations[0]?.toUpperCase() + open.recommendations.slice(1)} */}
             </div>
             

        </div>
    )
}