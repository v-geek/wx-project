- 开发中...

#### 注意事项

安装依赖时不要使用 cnpm, unocss 的包有问题, 请使用 npm | pnpm

- 免费接口测试地址:

```
https://jsonplaceholder.typicode.com/guide/
https://juejin.cn/post/7041461420818432030#heading-0
```

#### todo-list

- [x] unocss
- [x] 注入 pinia
- [x] http 封装
- [ ] 分包加载
- [ ] 提交代码时效验
- [ ] 集成微信支付 等功能
- [ ] 开发功能

##### H5 的环境变量使用示例

```
let api = ''

// #ifdef H5
if (import.meta.env.NODE_ENV === 'development') {
  api = '/dev-api'
} else {
  api = import.meta.env.VITE_BASE_URL
}
// #endif
```
