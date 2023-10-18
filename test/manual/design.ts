import { accessorDecorator, BaseService, classDecorator, fieldDecorator, getterDecorator, methodDecorator, paramsDecorator, RequestConfig } from "../../src";

@classDecorator({baseURL: "https://base.com"})
class DemoService<R = any> extends BaseService<R>{

    config: RequestConfig = {};

    @methodDecorator({
        url: ""
    })
    @paramsDecorator({ hasParams: true, hasBody: false, hasConfig: true })
    async getIndex(this: DemoService<string>): Promise<string> {
        return this.res.data;
    }

    @accessorDecorator("timeout")
    accessor timeout: number = 20 * 1000;

    @getterDecorator()
    get baseURL() {
        return "https://www.base.com"
    }

    @fieldDecorator()
    headers = {
        AppId: 1
    }

    static config: RequestConfig = {};

    @accessorDecorator("timeout")
    static accessor timeout: number = 20 * 1000;

    @getterDecorator()
    static get baseURL() {
        return "https://www.base.com"
    }

    @fieldDecorator()
    static headers = {
        AppId: 1
    }

    @methodDecorator({
        url: ""
    })
    @paramsDecorator({ hasParams: true, hasBody: false, hasConfig: true })
    static async getIndex(this: DemoService<string>): Promise<string> {
        return this.res.data;
    }
}


const service = new DemoService();


