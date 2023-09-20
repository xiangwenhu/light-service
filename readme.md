
## 说明
轻量级的装饰器服务

## 特性
1. 支持多实例
2. 支持多级配置 
    方法配置 > 实例配置 > class的配置 > 自定义默认值 > 系统默认配置
3. 理论上支持自定义 request
4. 支持继承
5. 支持扩展装饰器（TODO::)

## 使用示例
### 示例1  多级配置
```typescript
import { createServiceInstance } from "../src";
import { RequestConfig } from "../src/types";

const {
    classDecorator,
    apiDecorator,
    setConfig,
    commonFieldDecorator
} = createServiceInstance();

// 更新配置，比如授权信息，例如jwt, cookies
setConfig({
    headers: {
        token: "ccccc",
    },
});

// 设置baseUrl和超时时间
@classDecorator({
    baseURL: "https://www.baidu.com",
    timeout: 60 * 1000
})
class DemoService {

    // 设置 api 请求参数，最主要的是url, params, data和额外的config
    @apiDecorator({
        method: "get",
        url: "",
    })
    public async getIndex<R = string>(
        this: any,
        params: any,
        config: RequestConfig
    ): Promise<string> {
        return this.data;
    }

    // 设置 实例的timeout ，优先级: 方法 > 大于实例 > class > 默认值 
    @commonFieldDecorator("timeout")
    timeoutValue = 1000;

    // 设置 实例的baseURL ，优先级: 方法 > 大于实例 > class > 默认值 
    @commonFieldDecorator("baseURL")
    baseURLValue = "https://www.google.com"
}

```

### 示例2 继承
```typescript
import { createServiceInstance } from "../src";
import { RequestConfig } from "../src/types";

const {
    classDecorator,
    apiDecorator,
    setConfig,
    apiMiscellaneousDecorator,
    commonFieldDecorator
} = createServiceInstance();

setConfig({
    headers: {
        token: "ccccc",
    },
});

@classDecorator({
    baseURL: "https://www.baidu.com",
})
class DemoService {
    @apiDecorator({
        method: "get",
        url: "",
    })
    public async getIndex<R = string>(
        this: any,
        params: any,
        data: any,
        config: RequestConfig
    ): Promise<string> {
        return this.data;
    }

    @commonFieldDecorator("timeout")
    timeoutValue = 1000;

    @commonFieldDecorator("baseURL")
    baseURLValue = "https://www.google.com"
}

@classDecorator({
    baseURL: "https://www.bing.com",
})
class SubDemoService extends DemoService{
    @apiDecorator({
        method: "get",
        url: "",
    })
    @apiMiscellaneousDecorator({
        hasParams: true,
        hasConfig: true,
        hasBody: false,
    })
    async getBingIndex<R = string>(
        this: any,
        params: any,
        config: RequestConfig
    ): Promise<string> {
        return this.data;
    }
    @commonFieldDecorator("timeout")
    timeoutValue = 3000;

    @commonFieldDecorator("baseURL")
    baseURLValue = "https://www.youtube.com"
}


const serviceA = new DemoService();
serviceA
    .getIndex(
        { since: "monthly" },
        { a: 1 },
        {
            headers: { a: 1 },
        }
    )
    .then((res) => {
        console.log("resA:", res.length);
    })
    .catch((err) => {
        console.log("error:", err);
    });

const subService = new SubDemoService();
subService
    .getBingIndex(
        { since: "monthly" },
        {
            headers: { a: 1 },
        }
    )
    .then((res) => {
        console.log("resA:", res.length);
    })
    .catch((err) => {
        console.log("error:", err);
    });

subService
    .getIndex(
        { since: "monthly" },
        { a: 1 },
        {
            headers: { a: 1 },
        }
    )
    .then((res) => {
        console.log("resA:", res.length);
    })
    .catch((err) => {
        console.log("error:", err);
    });

```


## 注意
1. TypeScript 5.0 的修饰器标准跟之前的修饰器是不兼容的。旧版的 --experimentalDecorators 选项将会仍然保留，如果启用此配置，则仍然会将装饰器视为旧版，新版的装饰器无需任何配置就能够默认启用。
