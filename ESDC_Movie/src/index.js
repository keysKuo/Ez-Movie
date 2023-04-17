require('dotenv').config();
const PORT = process.env.PAYMENT_PORT || 4000;
// const router = require('./resources/routes');
const app = require('./config/server').init();
const path = require('path');
const { API_Customer, API_Booking, API_Seat, API_Show, API_Movie, API_Cinema } = require('./resources/apis');
const db = require('./config/db')
const mongoose = require('mongoose');
const alphas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
db.connect();

app.get('/', async (req, res, next) => {
    let customer = req.session.customer ||  {};
    
    return res.render('index', {
        layout: 'main',
        username: customer.fullname,
        isLogin: req.session.customer ? true : false 
    })
});

app.post('/register', async (req, res, next) => {
    const data = req.body;

    let customer = await API_Customer.readOne({email: data.email});

    if(!customer) {
        return await API_Customer.create(data)
            .then(customer => {
                if(customer) {
                    req.flash('success', 'Đăng kí tài khoản thành công');
                    return res.status(200).send({success: true})
                }

                req.flash('error', 'Đăng kí tài khoản thất bại');
                return res.status(404).send({success: false})
            })
            .catch(err => {
                req.flash('error', err);
                return res.status(300).send({success: false})
            })
    }else {
        req.flash('error', 'Tài khoản đã tồn tại');
        return res.status(500).send({success: false, msg: 'Tài khoản đã tồn tại'})
    }

})

app.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    await API_Customer.readOne({email, password})
        .then(customer => {
            if(customer) {
                req.session.customer = customer;
                return res.redirect('/');
            }
        })
        .catch(err => {
            return res.redirect('/');
        })

})


app.get('/nowshowing', async (req, res, next) => {
    let customer = req.session.customer ||  {};
    let currentDate = new Date().toISOString();

    let movies = await API_Movie.readMany({release: { $lte: currentDate}})
    return res.render('client/nowshowing', {
        layout: 'main',
        username: customer.fullname,
        isLogin: req.session.customer ? true : false,
        movies,
    })
})

app.get('/comingsoon', async (req, res, next) => {
    let customer = req.session.customer ||  {};
    let currentDate = new Date().toISOString();

    let movies = await API_Movie.readMany({release: { $gt: currentDate}})
    return res.render('client/comingsoon', {
        layout: 'main',
        username: customer.fullname,
        isLogin: req.session.customer ? true : false ,
        movies
    })
})

app.get('/viewdetail/:slug', async (req, res, next) =>{
    const { slug } = req.params;
    let customer = req.session.customer ||  {};

    let movie = await API_Movie.readOne({slug});
    return res.render('client/viewdetail', {
        layout: 'main',
        username: customer.fullname,
        isLogin: req.session.customer ? true : false,
        movie
    });
})

app.get('/viewticket', async (req, res, next) =>{
    let customer = req.session.customer ||  {};

    let bookings = await API_Booking.readMany({customer: customer._id})
    
    return res.render('client/viewticket', {
        layout: 'main',
        username: customer.fullname,
        isLogin: req.session.customer ? true : false,
        bookings
    });
})

app.get('/viewticketdetail/:id', async (req, res, next) =>{
    const { id } = req.params;
    let customer = req.session.customer ||  {};

    let booking = await API_Booking.readOne({_id: id})
    
    return res.render('client/viewticketdetail', {
        layout: 'main',
        username: customer.fullname,
        isLogin: req.session.customer ? true : false,
        booking
    });
})

app.get('/chooseseat/:id', async (req, res, next) =>{
    const {id} = req.params;
    let customer = req.session.customer ||  {};
    
    let show = await API_Show.readOne({_id: id})
    
    let seats = await API_Seat.readMany({show})
    
    return res.render('client/chooseseat', {
        layout: 'main',
        username: customer.fullname,
        isLogin: req.session.customer ? true : false ,
        seats, show
    });
})

app.get('/booking/:slug', async (req, res, next) =>{
    const {slug} = req.params;
    let customer = req.session.customer ||  {};

    let movie = await API_Movie.readOne({slug});

    let shows = await API_Show.readMany({movie});
    
    return res.render('client/booking', {
        layout: 'main',
        username: customer.fullname,
        isLogin: req.session.customer ? true : false,
        shows, movie
    });
})

app.post('/chooseseat/:id', async (req, res, next) => {
    const data = req.body;
    const { id } = req.params;
    let customer = req.session.customer || {};

    await API_Booking.create({...data, customer: customer._id, show: id, date: Date.now()})
        .then((booking) => {
            if(booking) {
                return res.redirect('/viewticket')
            }
        })
        .catch(err => {
            return res.redirect(`/chooseseat/${id}`)
        })
})


// CRUD 

app.post('/create-movie', async (req, res, next) => {
    // const data = req.body;
    const data = {
        name: 'Take Us Home (2023)',
        duration: '45m',
        release: new Date(2023, 07, 05),
        banner: 'https://hiphimmoi.net/wp-content/uploads/2023/04/long-thanh-120651-thumbnail.jpg',
        desc: '...',
        lang: 'Korean',
        slug: 'take-us-home-2023'
    }
    
    await API_Movie.create(data)
        .then(movie => {
            if(movie) {
                return res.status(200).json({success: true, data: movie, msg: 'Tạo movie thành công'});
            }

            return res.status(400).json({success: false, msg: 'Tạo movie thất bại'})
        })
        .catch(err => {
            return res.status(500).json({success: false, msg: err});
        })
})

app.post('/create-show', async (req, res, next) => {
    const data = {
        movie: '643d94e02028312f2584c0fb',
        date: new Date('2023, 05, 16'),
        time: '12:45',
        price: 200000,
        cinema: '643d9e607a52f7309828f8ad'
    }
    // const data = req.body;
    
    await API_Show.create(data)
        .then(show => {
            if(show) {
                for (let i = 1; i <= 10; i++) {
                    let num = (i < 10) ? '0'+ i : i;
                    alphas.forEach(async a => {
                        await API_Seat.create({
                            seat_num: '' + a + num,
                            status: 'available',
                            show: show._id
                        })
                    })
                }
                return res.status(200).json({success: true, data: show, msg: 'Tạo show thành công'});
            }

            return res.status(400).json({success: false, msg: 'Tạo show thất bại'})
        })
        .catch(err => {
            return res.status(500).json({success: false, msg: err});
        })
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
