import { useCallback, useEffect, useRef, useState } from "react"
import styles from "./FormApplications.module.css"
import cn from 'classnames'


export default function FormApplications({sort, setFormApplications}){

    let coord = window.pageYOffset + 'px'

    const[formSend, setFormSend] = useState(false) // отпарвлена заявка или нет

    const refSite  = useRef()
    const refAd = useRef()
    const refPromotion = useRef()
    const refMarket = useRef()
    const refHelp = useRef()

    const arrChoiceRef = [refSite,refAd, refPromotion, refMarket, refHelp] // массив с рефами, чтобы перебрать потом его через цикл, а не писать if else if, когда идет событие change

    useEffect( ()=> {

        for(let el of arrChoiceRef){
            if (el.current.value == sort) el.current.checked = true
        }

        document.body.style.overflow = 'hidden'
    },[])

    const handleChoice = (e) =>{

        for( let el of arrChoiceRef){
            if(el.current.checked) el.current.checked = false
        }
        e.target.checked = true
    }

    const handler = () => {
        setFormApplications(false)
        document.body.style.overflow = 'visible'
    }

    const test = (e) => {
        e.preventDefault()
        setFormSend(true)
    }
    
    return (
        <div style={{top: coord}} className={styles['formApplications']}>

            <div className={styles["formApplications__box"]}>

                <div onClick={ ()=> handler()} className={ cn(styles["form_close"])}></div>
                { formSend && <div className={styles['formSend']}>Заявка отправлена!</div>}

                <form onSubmit={ (e) => test(e) } action="" className={cn(styles["form"],{
                    [styles["close"]]: formSend,
                })}>

                    <div className={styles["form__inner"]}>

                        <div className={styles["form__inner-txt"]}>

                            <span>Оставьте заявку</span> <br />
                            <br />
                            Мы свяжемся с вами, ответим на интересующие вопросы и подготовим коммерческое предложение
                        </div>

                        <div className={styles["form__inner-choice"]}>

                            <div className={styles["input-radio"]}>
                                <input ref={refSite} onChange={(e) => handleChoice(e)} className={styles["custom_input"]} type="radio" id="input-site" value="site"/>
                                <label htmlFor="input-site">Разработка сайта</label>
                            </div>

                            <div className={styles["input-radio"]}>
                                <input ref={refAd} onChange={(e) => handleChoice(e)} className={styles["custom_input"]} type="radio" id="input-ad" value="ad"/>
                                <label htmlFor="input-ad">Реклама</label>
                            </div>

                            <div className={styles["input-radio"]}>
                                <input ref={refPromotion} onChange={(e) => handleChoice(e)} className={styles["custom_input"]} type="radio" id="input-promotion" value="promotion"/>
                                <label htmlFor="input-promotion">Продвижение</label>
                            </div>

                            <div className={styles["input-radio"]}>
                                <input ref={refHelp} onChange={(e) => handleChoice(e)} className={styles["custom_input"]} type="radio" id="input-help" value="help"/>
                                <label htmlFor="input-help">Поддержка</label>
                            </div>

                             <div className={styles["input-radio"]}>
                                <input ref={refMarket} onChange={(e) => handleChoice(e)} className={styles["custom_input"]} type="radio" id="input-market" value="market"/>
                                <label htmlFor="input-market">Маркетплейс</label>
                            </div>

                        </div>

                    </div>

                    <div className={styles["form__enter"]}>
                        <input placeholder="ФИО" type="text" />
                        <input placeholder="телефон" type="tel" />
                        <input placeholder="E-mail" type="email" />
                        <textarea placeholder="Укажите сферу бизнеса, регион работы и адрес действуйщего сайта" type="text" name="" id="" cols="30" rows="10"/>
                    </div>

                    <div className={styles["form__submit"]}>

                        <div className={styles["form__submit-txt"]}>Нажимая кнопку «Отправить», вы даете согласие на обработку персональных данных согласно <a href="">Политике конфиденциальности</a></div>
                        <button className={styles["form__submit-button"]}>Отправить</button>

                    </div>
                </form>
            </div>
        </div>
    )
}