import { useCallback, useEffect, useRef, useState } from "react"
import styles from "./FeedbackAdd.module.css"
import cn from 'classnames'

export default function FeedbackAdd({setFormAddFeedback}){

    const[formSend, setFormSend] = useState(false) // отпарвлен отзыв или нет

    const refSite  = useRef()
    const refAd = useRef()
    const refPromotion = useRef()
    const refMarket = useRef()
    const refHelp = useRef()

    const arrChoiceRef = [refSite,refAd, refPromotion, refMarket, refHelp] //массив с рефами, чтобы перебрать потом его через цикл, а не писать if else if, когда идет событие change

    useEffect( () => {document.body.style.overflow = 'hidden'}, [])

    const handleChoice = (e) =>{

        for( let el of arrChoiceRef){
            if(el.current.checked) el.current.checked = false
        }
        e.target.checked = true
    }

    
    const handler = () => {
        setFormAddFeedback(false)
        document.body.style.overflow = 'visible'
    }

    const takeRate = (e) =>{
        const index = e.target.dataset.index
        const csName = e.target.classList[0]
        const num = +e.target.dataset.number
        const rate = document.querySelectorAll('.' + styles['box_rate-grow'])[num]
        
        if(index){
            const arrRate = rate.querySelectorAll('.' + csName)
            
            for(let i = 0; i <= 4; i++){
                if(i <= index) arrRate[i].classList.add(styles['rate-grow-open'])
                if(i > index) arrRate[i].classList.remove(styles['rate-grow-open'])
               
            }
        }
     
    }

    const test = (e) => {
        e.preventDefault()
        setFormSend(true)
    }

    return (

        <div  className={styles["feedbackAdd"]} style={{top: `${window.pageYOffset}` + 'px'}} >
            
            <div className={styles["feedbackAdd_box"]}>

                 <div onClick={ ()=> handler()} className={ cn(styles["form_close"])}></div>

                { formSend && <div className={styles['formSend']}> Отзыв отправлен на модерацию</div>}

                <form onSubmit={ (e) => test(e) } action="" className={cn(styles["form"],{
                    [styles["close"]]: formSend,
                })}>
                    <div className={styles["txt"]}>Оставить отзыв</div>

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

                    <div className={styles['form__enter']}>
                        <input className={styles['form_enter-input']} placeholder="ФИО" type="text"/>
                        <input className={styles['form_enter-input']} placeholder="Адрес сайта" type="text"/>
                        <input className={styles['form_enter-input']} placeholder="E-mail" type="email"/>
                    </div>

                    {/* <div className={styles["rate-box"]}>Оценка</div> */}
                    <div className={styles["workDone-box"]}>Выполненные работы: <input type="text" /> </div>
                    <div onClick={(e)=> takeRate(e)} className={styles["support-box"]}>Взаимодейтсвие с клиентом 
                        <div className={styles['box_rate-grow']}> {Array(5).fill(0).map( (el, i) => <div data-number="0" data-index={i} className={styles["rate-grow1"]} key={i} />)} </div>
                    </div>
                    <div onClick={(e)=> takeRate(e)}  className={styles["proffesional-box"]}> Профессионализм
                        <div className={styles['box_rate-grow']}> {Array(5).fill(0).map( (el, i) => <div data-number="1" data-index={i} className={styles["rate-grow2"]} key={i} />)} </div>
                    </div>
                    <div onClick={(e)=> takeRate(e)} className={styles["result-box"]}>Результат
                        <div className={styles['box_rate-grow']}> {Array(5).fill(0).map( (el, i) => <div data-number="2" data-index={i} className={styles["rate-grow3"]} key={i} />)} </div>
                    </div>

                    <div className={styles["plus-box"]}>Плюсы компании: <input type="text" /> </div>
                    <div className={styles["minus-box"]}>Минусы компании: <input type="text" /> </div>

                    <textarea className={styles["mnenie"]}placeholder="Ваше мнение" name="" id="" cols="30" rows="10"></textarea>
                    <textarea className={styles["recomendation"]}placeholder="Рекомендации для компании или будущих клиентов" name="" id="" cols="30" rows="10"></textarea>


                    <div className={styles["form__submit-txt"]}>Нажимая кнопку «Отправить», вы даете согласие на обработку персональных данных согласно <a href="">Политике конфиденциальности</a></div>
                    <button className={styles["form__submit-button"]}>Отправить</button>

                </form>
            </div>
        </div>
    )
}
