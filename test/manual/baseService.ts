import { BaseService, classDecorator, methodDecorator, setConfig, fieldDecorator, enableLog, paramsDecorator } from "../../src";
import { RequestConfig } from "../../src/types";

// 允许打印日志
enableLog(true);

// 更新配置，比如授权信息，例如jwt, cookies
setConfig({
    headers: {
        token: "token",
    },
});

// 设置baseUrl和超时时间
@classDecorator({
    timeout: 60 * 1000,
    baseURL: "https://www.example.com"
})
class DemoService<R> extends BaseService<R>{

    // 设置 api method 请求参数，最主要的是url, params, data和额外的config
    @methodDecorator({
        method: "get",
        url: "",
    })
    @paramsDecorator({ hasParams: true })
    static getIndex(
        this: DemoService<string>,
        _params: any,
        _config: RequestConfig,
    ): Promise<string>
     {
        // 不写任何返回， 默认会返回 this.res.data
        // @ts-ignore
        return this.res.data
    }

    // 设置 实例的timeout ，优先级: 方法 > 大于实例 > class > 自定义默认值
    @fieldDecorator("timeout")
    static timeoutValue = 15 * 1000;
}

DemoService
    .getIndex(
        { since: "monthly" },
        {
            headers: { userId: 1 },
        },
    )
    .then((res: any) => {
        console.log("res DemoService static getIndex:", res.length);
    })
    .catch((err) => {
        console.log("error DemoService static getIndex:", err);
    });
