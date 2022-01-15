import styles from '../styles/Contact.module.css'

export default function Contact() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h1 style={{textAlign: 'left'}}>Contact</h1><br />
                <form className={styles.form} action="https://formsubmit.co/tachandco@gmail.com" method='POST'>
                    <input type="hidden" name="_next" value="http://localhost:3000/thankyou" />
                    <label className={styles.label} htmlFor="name">Name</label>
                    <input className={styles.input} type="text" name="name" id="name" required />
                    <label className={styles.label} htmlFor="email">Email</label>
                    <input className={styles.input} type="email" name="email" />
                    <input type="hidden" name="_subject" value={`New mail from submitted!`}></input>
                    <label className={styles.label} htmlFor="message">Message</label>
                    <textarea className={styles.input} name="message" id="message" cols="30" rows="10" required></textarea>
                    <input className={styles.submit} type="submit" value="Send" />
                </form>
                
            </div>
        </section>
    )
}