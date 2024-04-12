import { useEffect, useState } from "react"
import styles from "./FeedbackDetails.module.css"


export default function FeedbackDetails({id,sort, data, rate, name, link, site, product, enter, open}){

    const [txtLink, setTxtLink] = useState()
    
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


    useEffect( ()=> changeTxt(link), [])

    return (

        <div className={styles["feedbackDetails"]}>

           <div>
             <div className={styles["product"]}>{product}</div>
           </div>

            <div className={styles["feedbackDetails__flex"]}>

                <div className={styles["feedbackDetails__flex-inner"]}>
                    <div className={styles["workDone"]}>Выполненные работы: {open.workDone}.</div>
                    <div className={styles["support"]}>Взаимодейтсвие с клиентом: {Array(+open.support).fill(0).map( el => <img src="./public/img/rate.png" alt="" />)}</div>
                    <div className={styles["proffesional"]}>Профессионализм: {Array(+open.proffesional).fill(0).map( el => <img src="./public/img/rate.png" alt="" />)}</div>
                    <div className={styles["result"]}>Результат: {Array(+open.result).fill(0).map( el => <img src="./public/img/rate.png" alt="" />)}</div>
                </div>

                <div className={styles["feedbackDetails__flex-inner"]}>
                    <div className={styles["data"]}>{data}</div>
                    <div className={styles["name"]}>{name}</div>
                    <a className={styles["link"]} href={link + ""} >{txtLink + ""}</a>
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