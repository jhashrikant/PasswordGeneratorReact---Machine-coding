import { useState } from 'react';
import styles from './styles/main.module.css'

function App() {

	const [Password, setPassword] = useState('');
	const [copied, setcopied] = useState(false);
	const [length, setLength] = useState(8);
	const [errorMessage, seterrorMessage] = useState('');
	const [CheckBoxdata, setCheckboxdata] = useState([
		{ id: 1, label: 'Include Uppercase letters', checked: false },
		{ id: 2, label: 'Include Lowercase letters', checked: false },
		{ id: 3, label: 'Include Numbers', checked: false },
		{ id: 4, label: 'Include symbols', checked: false },
	]);

	const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const lowerCaseLetters = 'abcdefghijklmnopqrstuvqxyz';
	const numbers = '123456789';
	const symbols = '!@#$%^&*()_+[]{}|;:,.<>?/~`';


	function handlecheckboxClick(id) {
		setCheckboxdata((prevdata) => {
			return prevdata.map(item => {
				return item.id === id ? { ...item, checked: !item.checked } : item
			})
		})
		seterrorMessage('');
	}

	function generatePassword(checkboxData, length) {
		let charset = '';
		let generatedpassword = '';
		const selectedoptions = checkboxData.filter((checkbox) => checkbox.checked)
		if (selectedoptions.length === 0) {
			seterrorMessage('please select atleast one option')
			return;
		}
		selectedoptions.forEach((option) => {
			if (option.label === 'Include Uppercase letters') {
				charset += uppercaseLetters
			}
			else if (option.label === 'Include Lowercase letters') {
				charset += lowerCaseLetters
			}
			else if (option.label === 'Include Numbers') {
				charset += numbers
			}
			else if (option.label === 'Include symbols') {
				charset += symbols
			}
		});

		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * charset.length)
			generatedpassword += charset.charAt(randomIndex)
			setPassword(generatedpassword);
		}
	}

	function handleCopy() {
		navigator.clipboard.writeText(Password)
		setcopied(true)
		setTimeout(() => {
			setcopied(false);
		}, 2000);
	}

	return (
		<div className={styles.Container}>
			{Password && <div className={styles.passwordandcopycontainer}>
				<div className='passwordName'>{Password}</div>
				<button onClick={handleCopy} className={styles.copybtn}>{copied ? 'copied' : 'copy'}</button>
			</div>}

			<div className={styles.chrcontainer}>
				<div className='charlength'>Character Length</div>
				<div className='charlengthvalue'>{length}</div>
			</div>

			<input min={4} max={16} value={length} onChange={(event) => setLength(event.target.value)} type='range' />

			<div className={styles.optionscontainer}>
				{CheckBoxdata?.map((item) => {
					return <label key={item.id}><input checked={item.checked} onChange={() => handlecheckboxClick(item.id)} type='checkbox' />{item.label}</label>
				})}
			</div>

			{errorMessage && <div style={{color:'white'}}>{errorMessage}</div>}

			<div className={styles.InputStrengthContainer}>
				<div className='strength'>Strength</div>
				<div className='strengthValue'>Good</div>
			</div>

			<div className={styles.passWordContainer}><button onClick={() => generatePassword(CheckBoxdata, length)} className={styles.GeneratepaswordBtn}>Generate Password</button></div>
		</div>
	);
}

export default App;
