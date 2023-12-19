import React from "react"
import styles from '../styles/main.module.css'
function PasswordstrengthIndicator({ password = "" }) {

    function getpasswordstrength() {
        if (password.length < 1) {
            return ""
        }
        else if (password.length < 4) {
            return "weak"
        }
        else if (password.length < 8) {
            return "good"
        }
        else if (password.length < 12) {
            return "medium"
        }
        else if (password.length < 15) {
            return "strong"
        }
        else {
            return "very strong"
        }
    }


    const passwordStrength = getpasswordstrength()
    if (!passwordStrength) return <React.Fragment />

    return (
        <div className={styles.InputStrengthContainer}>
            <div className='strength'>Strength</div>
            <div className='strengthValue'>{passwordStrength}</div>
        </div>
    )
}
export default PasswordstrengthIndicator;