const limits = {};

export default function rateLimit(email, req, res, next) {

  const ip = req.connection.remoteAddress || req.headers['x-forwarded-for'];
  const limit = 10; // 10 istek
  const timeLimit = 1000 * 60 * 5; // 5 dakika içerisinde max 10 istek

    

}