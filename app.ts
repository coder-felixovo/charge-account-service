// 引入第三方包
import express, { Express, Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import cors from 'cors'

// 引入源程序
import userRouter from './router/userRouter'
import { routerInterceptor } from './middleware/global'

// 创建Express应用
const app: Express = express()

// 第三方中间件
app.use(morgan('common')) // 日志
app.use(express.json()) // 解析请求中的json数据
app.use(express.urlencoded({ extended: false })) // 解析提交表单数据
app.use(cors()) // 处理跨域

// 全局中间件
app.use(routerInterceptor)

// 路由
app.use(userRouter)

// 全局错误中间件
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Global error middleware')
  console.log(error.message)
  const { responseResult } = req.body
  responseResult.message = '服务器跑路了'
  responseResult.status = '-1'
  res.send(responseResult)
})

app.listen(3000, () => {
  console.log('Server started, running at http://localhost:3000')
})