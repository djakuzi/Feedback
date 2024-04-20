import FeedbackMenu from "../FeedbackMenu/FeedbackMenu"
import Select from "../Select/Select"
import styles from "./Feedback.module.css"
import {useEffect, useState, useRef} from 'react'
import { PREFIX } from "../../helper/APi"
import data from '../../data/data'
import FeedbackDetails from "../FeedbackDetails/FeedbackDetails"
import FormApplications from "../FormApplications/FormApplications"


export default function Feedback(){

    const [open, setOpen] = useState(false) // чтобы открыть более подробную инфу о отзые при клике 
    const [filter, setFilter] = useState("all") // filter for sorting feedback
    const [feedback, setFeedback] = useState([]) 
    const [feedbackDetails, setFeedbackDetails] = useState(0) //данные для открытия более подробного отзыва
    const [formApplications, setFormApplications] = useState(false) // открыть форму обратной связи для заказа услуги
    const [saveHeight, setSaveHeight] = useState(null)
    const [saveScrollFeedback, setSaveScrollFeedback] = useState(null) // сохраняет размер скрола когда через карточку отзыва открывается более подробная инфа о отзыве6 чтобы при закрывание этой подробной инфорации пользователь возрващался к тому отзыву, на который нажимал автоматически


    const refFeedbackInfo = useRef()

    const hooks = {
        setOpen,
        setFeedbackDetails,
        setSaveHeight,
        setSaveScrollFeedback
    }

    const getFeedback = async() => {

        try {

            let response = await fetch(`${PREFIX}/feedback`)
            let result = await response.json()
            setFeedback(result)
        } catch (e) {
            alert(`ПРОИЗОШЛА ОШИБКА: ${e.message}, поэтому загружена база отзывов не с сервера`)
            setFeedback(data.feedback)
            return
        }

    }

    useEffect( () =>{
        if (feedbackDetails !== 0) refFeedbackInfo.current.scrollIntoView({ block: "start", behavior: "smooth" }) 
    },[feedbackDetails])

    

    useEffect( ()=> {getFeedback()},[])
    // console.log(feedbackDetails)
    
    return (
        <div className={styles['feedback']}>

            <div ref={refFeedbackInfo} className={styles['info']}>

                <div className={styles['statistic']}>
                    <h1>97%</h1>
                    <h1>довольных<br/>клиентов</h1>
                </div>

                   <Select setOpen={setOpen} setFilter={setFilter} setSaveHeight={setSaveHeight} setSaveScrollFeedback={setSaveScrollFeedback} />

                <div>
                    <button className={styles['button']}>Оставить отзыв</button>
                    <button className={styles['button']}>Написать директору</button>
                </div>
              
            </div>

            <div className={styles['feedback_window']}>
                { !open && <FeedbackMenu feedback={feedback} filter={filter} setFeedbackDetails={setFeedbackDetails} saveHeight={saveHeight} saveScrollFeedback={saveScrollFeedback} hooks={hooks} /> }
                { open && <FeedbackDetails {...feedbackDetails} setOpen={setOpen} setFormApplications={setFormApplications}/>}
                { formApplications && <FormApplications sort={feedbackDetails.sort} setFormApplications={setFormApplications}/>}
            </div>

        </div>
    )
}