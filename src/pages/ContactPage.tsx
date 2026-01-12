import styles from "../components/ContactForm/ContactForm.module.css";
import ContactForm from "../components/ContactForm/ContactForm.tsx"

export default function Contact() {
    return (
        <div className={styles.contactWrapper}>
            <ContactForm />
        </div>

    );
}