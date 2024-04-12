import FeedbackCard from "../FeedbackCard/FeedbackCard"
import styles from "./FeedbackMenu.module.css"

export default function FeedbackMenu({feedback, filter,setFeedbackDetails,setOpen}){

    return (
        <div className={styles['feedbackMenu']}>
            {feedback.filter( (el) => ( filter == "all" || filter == "rate") ? true : el.sort == filter)
            .sort((a,b)=> ( filter == "rate") ? (b.rate - a.rate): null)
            .map( (el) => <FeedbackCard 
                    key={el.id} 
                    id={el.id} 
                    sort={el.sort}
                    data={el.data}
                    rate={el.rate}
                    name={el.name}
                    link={el.link}
                    site={el.site}
                    product={el.product}
                    enter={el.enter}
                    open={el.open}
                    setFeedbackDetails={setFeedbackDetails}
                    setOpen={setOpen}
                />)
            }
        </div>
    )
}