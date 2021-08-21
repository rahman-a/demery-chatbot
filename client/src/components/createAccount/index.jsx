import React, {useState} from 'react'
import style from './createAccount.module.scss'
import { Overlay } from '../overlay'
import { Modal } from '../Modal'


const CreateAccount = ({toggle, setToggle}) => {
    const [photoName, setPhotoName] = useState('Upload Personal Photo')
    return (
        <>
         <Overlay toggle={toggle}/>
         <Modal toggle={toggle} closeHandler={() => setToggle(false)}>
            <form className={style.account__form}>
                <div className={style.account__block}>
                    <div className={style.account__formGroup}>
                        <label htmlFor="account-username">User Name</label>
                        <input type="text" name="username" id="account-username" placeholder="إسم المستخدم"/>
                    </div>
                    <div className={style.account__formGroup}>
                        <label htmlFor="account-name">Full Name</label>
                        <input type="text" name="name" id="account-name" placeholder="الإسم كاملاً"/>
                    </div>
                    <div className={style.account__formGroup}>
                        <label htmlFor="account-phone">Phone Number</label>
                        <input type="tel" name="phone" id="account-phone" placeholder="رقم الهاتف"/>
                    </div>
                    <div className={style.account__formGroup}>
                        <label htmlFor="account-pass">Password</label>
                        <input type="tel" name="password" id="account-pass" placeholder="كلمةالسر"/>
                    </div>
                    <div className={style.account__formGroup}>
                        <button type="submit">Save</button>
                    </div>
                </div>
                <div className={style.account__block}>
                    <div className={style.account__formGroup}>
                        <label htmlFor="account-email">E-mail Address</label>
                        <input type="email" name="email" id="account-email" placeholder="البريد الإلكترونى"/>
                    </div>
                    <div className={style.account__formGroup}>
                        <label className={style.account__photo} htmlFor="account-photo">{photoName}</label>
                        <input onChange={({target:{files}}) => setPhotoName(files[0].name)} type="file" name="photo" id="account-photo" hidden/>
                    </div>
                    <div className={style.account__formGroup}>
                        <label htmlFor="account-gender">Gender</label>
                        <input list='gender' type="text" name="gender" id="account-gender" placeholder="الجنس"/>
                        <datalist id="gender">
                            <option value="ذكر">ذكر</option>
                            <option value="أنثى">أنثى</option>
                        </datalist>
                    </div>
                    <div className={style.account__formGroup}>
                        <label htmlFor="account-confirm">Confirm Password</label>
                        <input type="password" name="confirm" id="account-confirm" placeholder="تأكيد كلمة السر"/>
                    </div>
                </div>   
            </form>
        </Modal>   
        </>
    )
}

export default CreateAccount
