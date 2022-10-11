module.exports = (req, res, next) => {
  if (res.req.path === '/login') {
    const { username, password } = req.body
    if (username === '111' && password === '222') {
      res.json({ msg: '登录成功', token: '12323asdf' })
    } else {
      res.json({ msg: '账户或密码错误' })
    }
  } else {
    next()
  }
}
