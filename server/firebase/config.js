import fs from 'fs'
import admin from 'firebase-admin'
import dotenv from 'dotenv'
dotenv.config()

const rawData = fs.readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT)
const serviceAccount  = JSON.parse(rawData)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL:'https://getting-started-bbce8.firebaseapp.com'
})

// Send notification to device
// https://www.techotopia.com/index.php?title=Sending_Firebase_Cloud_Messages_from_a_Node.js_Server&mobileaction=toggle_view_mobile#Installing_the_Firebase_Admin_SDK
// https://firebase.google.com/docs/cloud-messaging/send-message?authuser=0

export default admin
