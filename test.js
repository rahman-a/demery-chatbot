import adminFB from './server/firebase/config.js'

const token = 'fkqfVixxtjI:APA91bE8XOY9fwUdRNwN1EDmuKLW-m3XNYhnrHTeisSBLFv2ogbUKEok8wtQRSzIB-qig-qR5HkJgRxvhuz3VOf8sQ4U3duheKk6840DYF65S1U7m19rhFL-kAoU-8up-qu6B0OAYJeI'

const payload = {
    data: {
        title:'this is title test',
        content:'lorem ipusm dolor set imet',
        image:`https://khoolasa.chat/api/uploads/image-1634812033453-.jpg`,
        channel_id:'FirebasePushNotificationChannel',
        channelId:'61578eec3a1fce2bf8577379'
    }
}
const option = {
    priority:'high'
}
try {
    await adminFB.messaging().sendToDevice(token, payload, option)
    console.log('send notifications');
} catch (error) {
    console.log(error);
}

