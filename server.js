
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const multer = require('multer');
// const Product= require('./models/products');

// const dbConnect = require('./middlewares/dBConnect'); 

// const userController = require('./controllers/userController');
// const bookController = require('./controllers/bookController');
// const eventController = require('./controllers/eventController');
// const registrationController = require('./controllers/registrationController');

// const path = require('path');
// const app = express();
// const port = 5000;

// app.use(express.json());
// app.use(cors());

// dbConnect();

// app.use(bodyParser.json());
// app.use('/uploads', express.static('uploads'));

// // Multer setup for image uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// // User API
// app.post('/api/users/register', userController.registerUser);
// app.post('/api/users/login', userController.loginUser);
// app.get('/api/users/:username', userController.getUserByUsername);
// app.put('/api/users/:username', userController.updateUser);


// // Book API
// app.get('/api/books', bookController.getBooksBySubSubject);
// app.get('/api/all-books', bookController.getAllBooks);
// app.post('/api/create-book', bookController.createBook);
// app.post('/api/seed-books', bookController.seedBooks);
// app.post('/api/update-book/:id', bookController.updateBook);
// app.post('/api/delete-book/:id', bookController.deleteBook);
// app.post('/api/send-book', bookController.sendBookMail);

// //Event API
// app.post('/api/events', upload.single('eventImage'), eventController.addEvent);
// app.get('/api/events', eventController.getAllEvents);
// app.get('/api/events/:id', eventController.getEventById);

// // Registration API
// app.post('/api/registrations', registrationController.addRegistration);
// app.get('/api/registrations/check', registrationController.checkRegistration);
// app.post('/api/registrations/send-email', registrationController.sendRegistrationEmail);

// // Product API
// app.post('/api/products', upload.single('image'), async (req, res) => {
//   const { productName, price, category, description } = req.body;
//   const image = req.file ? req.file.path : '';

//   const newProduct = new Product({
//     productName,
//     price,
//     category,
//     description,
//     image,
//   });

//   try {
//     await newProduct.save();
//     res.status(201).json(newProduct);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });
// app.get('/api/products', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });



// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const multer = require('multer');
// const Product = require('./models/products');
// const User = require('./models/userSchema'); // User model
// const dbConnect = require('./middlewares/dBConnect');

// const userController = require('./controllers/userController');
// const bookController = require('./controllers/bookController');
// const eventController = require('./controllers/eventController');
// const registrationController = require('./controllers/registrationController');

// const path = require('path');
// const app = express();
// const port = 5000;

// app.use(express.json());
// app.use(cors());

// dbConnect();

// app.use(bodyParser.json());
// app.use('/uploads', express.static('uploads'));

// // Multer setup for image uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// // User API
// app.post('/api/users/register', userController.registerUser);
// app.post('/api/users/login', userController.loginUser);
// app.get('/api/users/:username', userController.getUserByUsername);
// app.put('/api/users/:username', userController.updateUser);

// // New Route: Fetch all users
// app.get('/api/users', async (req, res) => {
//   try {
//     const users = await User.find(); // Fetch all users from the database
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch users' });
//   }
// });

// // Book API
// app.get('/api/books', bookController.getBooksBySubSubject);
// app.get('/api/all-books', bookController.getAllBooks);
// app.post('/api/create-book', bookController.createBook);
// app.post('/api/seed-books', bookController.seedBooks);
// app.post('/api/update-book/:id', bookController.updateBook);
// app.post('/api/delete-book/:id', bookController.deleteBook);
// app.post('/api/send-book', bookController.sendBookMail);

// // Event API
// app.post('/api/events', upload.single('eventImage'), eventController.addEvent);
// app.get('/api/events', eventController.getAllEvents);
// app.get('/api/events/:id', eventController.getEventById);

// // Registration API
// app.post('/api/registrations', registrationController.addRegistration);
// app.get('/api/registrations/check', registrationController.checkRegistration);
// app.post('/api/registrations/send-email', registrationController.sendRegistrationEmail);

// // Product API
// app.post('/api/products', upload.single('image'), async (req, res) => {
//   const { productName, price, category, description } = req.body;
//   const image = req.file ? req.file.path : '';

//   const newProduct = new Product({
//     productName,
//     price,
//     category,
//     description,
//     image,
//   });

//   try {
//     await newProduct.save();
//     res.status(201).json(newProduct);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });
// app.get('/api/products', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const dbConnect = require('./middlewares/dBConnect');
const Product = require('./models/products');
const User = require('./models/userSchema');
const Event = require('./models/event'); // Import the Event model

const userController = require('./controllers/userController');
const bookController = require('./controllers/bookController');
const eventController = require('./controllers/eventController');
const registrationController = require('./controllers/registrationController');

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the frontend origin
  credentials: true, // Allow cookies and credentials
};

// Use CORS with the specified options
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Database Connection
dbConnect();

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


const JWT_SECRET = "bhutsecret"
const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Get token from cookies

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    // Verify the token using your JWT secret
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach the decoded data to the request object
    next(); // Call next to continue to the route handler
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

// Verify Token Route
app.post('/verify-token', verifyToken, (req, res) => {
  // If token is valid, respond with success and user data
  res.status(200).json({
    message: 'Token is valid',
    user: req.user, // Send user data from the decoded token
  });
});

// User API
app.post('/api/users/register', userController.registerUser);
app.post('/api/users/login', userController.loginUser);
app.get('/api/users/:username', userController.getUserByUsername);
app.put('/api/users/:username', userController.updateUser);
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Book API
app.get('/api/books', bookController.getBooksBySubSubject);
app.get('/api/all-books', bookController.getAllBooks);
app.post('/api/create-book', bookController.createBook);
app.post('/api/seed-books', bookController.seedBooks);
app.post('/api/update-book/:id', bookController.updateBook);
app.post('/api/delete-book/:id', bookController.deleteBook);
app.post('/api/send-book', bookController.sendBookMail);

// Event API
// app.post('/api/events', upload.single('eventImage'), async (req, res) => {
//   const { eventName, eventTime, eventDate, eventPlace, speaker } = req.body;
//   const eventImage = req.file ? req.file.path : '';

//   const newEvent = new Event({
//     eventName,
//     eventTime,
//     eventDate,
//     eventPlace,
//     speaker,
//     eventImage,
//   });

//   try {
//     await newEvent.save();
//     res.status(201).json(newEvent);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// app.get('/api/events', async (req, res) => {
//   try {
//     const events = await Event.find({}, 'name eventTime date place speaker'); // Fetch only required fields
//     res.json(events);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch events' });
//   }
// });

// app.get('/api/events/:id', async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id);
//     if (!event) {
//       return res.status(404).json({ error: 'Event not found' });
//     }
//     res.json(event);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch the event' });
//   }
// });



app.post('/api/events', upload.single('eventImage'), eventController.addEvent);
app.get('/api/events', eventController.getAllEvents);
app.get('/api/events/:id', eventController.getEventById);
app.delete('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the event by its ID
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Registration API
app.post('/api/registrations', registrationController.addRegistration);
app.get('/api/registrations/check', registrationController.checkRegistration);
app.post('/api/registrations/send-email', registrationController.sendRegistrationEmail);

// Product API
app.post('/api/products', upload.single('image'), async (req, res) => {
  const { productName, price, category, description } = req.body;
  const image = req.file ? req.file.path : '';

  const newProduct = new Product({
    productName,
    price,
    category,
    description,
    image,
  });

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract product ID from request parameters
    
    // Find and delete the product by its ID
    const product = await Product.findByIdAndDelete(id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// Server Start
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
