import jwt from 'jsonwebtoken'

const getToken = (req) => {
  const TOKEN = req.headers.authorization?.replace('Bearer ', '')
  try {
    const decodedToken = jwt.verify(TOKEN, process.env.SECRET_TOKEN)
    console.log(decodedToken)
    return decodedToken
  } catch (error) {
    console.log(error)
    return {}
  }
  }

const verifyUser = (req, reply, next) => {
  const decodedToken = getToken(req)
  if (!decodedToken || Object.keys(decodedToken).length === 0){
    reply.code(403).send({ code: 403, error: 'Forbidden' })
    return
  }
  req.user = decodedToken
  next()
}

export default verifyUser