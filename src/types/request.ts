import { AxiosRequestConfig } from "axios";

export interface RequestConfig<D = any> extends AxiosRequestConfig<D>{
    simulated?: boolean;
}

export {
    AxiosResponse as ApiResponse,
    AxiosInstance as RequestInstance,
    Method,
} from "axios";
