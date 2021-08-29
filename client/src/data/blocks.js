import ObjectID from "bson-objectid"

const channels = {
    chatBlocks :  [
        {
            _id:ObjectID().toHexString(),
            name:'دعوة للترحيب والإشتراك',
            type:'Card',
            abbr:'CD',
            image:'image/football.jpg',
            title:'مرحبا بك فى قناة الساحة المستديرة',
            content:'هذة القناة تختص بعرض اخبار اللاعيبةواحدث اخبار الساحة المستديرة بكل ماتحتوية من ترفيه',
            buttons:[
                {
                    _id:ObjectID().toHexString(),
                    title:'إضغط هنا للإشتراك',
                    type:'ٍsubscribe',
                    action:''
                },
                {
                    _id:ObjectID().toHexString(),
                    title:'إضغط هنا  لألغاء للإشتراك',
                    type:'ٍunsubscribe',
                    action:''
                }
            ],
           
        },
        {
            _id:ObjectID().toHexString(),
            name:'الرد بتاكيد اشتراك العميل',
            type:'Text',
            abbr:'TX',
            content:'تم الإشتراك فى قناة الساحة المستديرة'
        },
        {
            _id:ObjectID().toHexString(),
            name:'الرد بالغاءاشتراك العميل',
            type:'Text',
            abbr:'TX',
            content:'تم إلغاء اشتراك من قناة الساحة المستديرة'
        },
        {
            _id:ObjectID().toHexString(),
            name:'إنتقال العميل لموقع تجارى خارجى',
            abbr:'IX',
            type:'Interactive',
            title:'موقع سبورتا',
            content:' لعرض مجموعات منتجات خاصة بنادى برشلونة',
            buttons:[
                {
                    _id:ObjectID().toHexString(),
                    title:'إضغط هنا للانتقال',
                    type:'link',
                    actions:'https://www.example.com'
                }
            ]
        },
        {
            _id:ObjectID().toHexString(),
            name:'عرض مجموعة لفانلات لاعيبة ريال مدريد',
            type:'Gallery',
            abbr:'GL',
            gallery:[
                {
                    _id:ObjectID().toHexString(),
                    name:'فانلة كم قصير للرجال',
                    abbr:'CD',
                    image:'image/fitness.jpg',
                    title:'',
                    content:'فانلة كم قصير للرجال',
                    order:1,
                    type:'Gallery',
                    buttons:[
                        {
                            _id:ObjectID().toHexString(),
                            title:'إضغط هنا للشراء',
                            type:'link',
                            action:'https://shop.realmadrid.com/products/rmcfmz0050-real-madrid-mens-away-authentic-shirt-21-22-blue'
                        },
                        {
                            _id:ObjectID().toHexString(),
                            title:'إضغط هنا للمشاهدة',
                            type:'link',
                            action:'https://shop.realmadrid.com/products/rmcfmz0050-real-madrid-mens-away-authentic-shirt-21-22-blue'
                        }
                    ],
                   
                },
                {
                    _id:ObjectID().toHexString(),
                    name:'فانلة كم طويل للرجال',
                    type:'Gallery',
                    abbr:'CD',
                    image:'image/science.jpg',
                    title:'',
                    content:'فانلة كم طويل للرجال',
                    order:2,
                    buttons:[
                        {
                            _id:ObjectID().toHexString(),
                            title:'إضغط هنا للشراء',
                            type:'link',
                            action:'https://shop.realmadrid.com/products/rmcfmz0050-real-madrid-mens-away-authentic-shirt-21-22-blue'
                        },
                        {
                            _id:ObjectID().toHexString(),
                            title:'إضغط هنا للمشاهدة',
                            type:'link',
                            action:'https://shop.realmadrid.com/products/rmcfmz0050-real-madrid-mens-away-authentic-shirt-21-22-blue'
                        }
                    ],
                   
                },
                {
                    _id:ObjectID().toHexString(),
                    name:'فانلة كم طويل للنساء',
                    type:'Gallery',
                    abbr:'CD',
                    image:'image/fitness.jpg',
                    title:'',
                    content:'فانلة كم طويل للنساء',
                    order:3,
                    buttons:[
                        {
                            _id:ObjectID().toHexString(),
                            title:'إضغط هنا للشراء',
                            type:'link',
                            action:'https://shop.realmadrid.com/products/rmcfmz0050-real-madrid-mens-away-authentic-shirt-21-22-blue'
                        },
                        {
                            _id:ObjectID().toHexString(),
                            title:'إضغط هنا للمشاهدة',
                            type:'link',
                            action:'https://shop.realmadrid.com/products/rmcfmz0050-real-madrid-mens-away-authentic-shirt-21-22-blue'
                        }
                    ],
                   
                },
            ]
        }
    ]
}

export default channels