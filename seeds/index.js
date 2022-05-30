const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random()*array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)}, ${sample(places)}`,
            image: 'https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FtcGdyb3VuZHxlbnwwfHwwfHw%3D&w=1000&q=80',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate reprehenderit quod earum voluptatem possimus aspernatur esse veritatis aut rerum iste rem accusamus consectetur doloribus aliquid accusantium pariatur, ex velit soluta nostrum eos in neque adipisci? Sequi modi delectus voluptatem consequatur, laudantium a rerum. Amet odio nostrum a voluptas cum laborum inventore optio dolore tempore! Recusandae asperiores minima atque nostrum odio reiciendis ducimus praesentium repellendus. Sint cumque enim magnam explicabo reprehenderit nemo temporibus? Iure ea ipsa aspernatur magnam maxime nemo quam accusamus in laborum pariatur, rerum libero iste veritatis cumque eveniet debitis rem fugit consequuntur blanditiis soluta, odio eum, tenetur quo.',
            price
    
        })
        await camp.save();

    }
}

// after the seedDB function has run, we dont need its connection with database so we close it
seedDB().then(() => {
    mongoose.connection.close();
});