import FeedbackMenu from "../FeedbackMenu/FeedbackMenu"
import Select from "../Select/Select"
import styles from "./Feedback.module.css"
import {useEffect, useState} from 'react'
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
  

    useEffect( ()=> {getFeedback()},[])
    // console.log(feedbackDetails)
    
    return (
        <div className={styles['feedback']}>

            <div className={styles['info']}>

                <div className={styles['statistic']}>
                    <h1>97%</h1>
                    <h1>довольных<br/>клиентов</h1>
                </div>

                   <Select setOpen={setOpen} setFilter={setFilter} setFormApplications={setFormApplications}/>

                <div>
                    <button className={styles['button']}>Оставить отзыв</button>
                    <button className={styles['button']}>Написать директору</button>
                </div>
              
            </div>

            <div className={styles['feedback_window']}>
                { !open && <FeedbackMenu feedback={feedback} filter={filter} setFeedbackDetails={setFeedbackDetails} setOpen={setOpen}/> }
                { open && <FeedbackDetails {...feedbackDetails} setOpen={setOpen} setFormApplications={setFormApplications}/>}
                { formApplications && <FormApplications sort={feedbackDetails.sort} setFormApplications={setFormApplications}/>}
            </div>

        </div>
    )
}