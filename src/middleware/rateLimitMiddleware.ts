import rateLimit from 'express-rate-limit';

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
<<<<<<< HEAD
  max: 500, 
=======
  max: 100, 
>>>>>>> 3034496a948d521301ec2ef6b328d8f5f314cc45
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again later.',
});

export default rateLimiter;
