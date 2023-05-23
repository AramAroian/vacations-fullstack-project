import axios from "axios";
import authService from "./AuthService";
import { authStore } from "../Redux/AuthState";

class InterceptorService {
    public create(): void {
        axios.interceptors.request.use(requestObj => {
            if (
                authStore.getState().token
            ) {
                requestObj.headers.Authorization = "Bearer " + authStore.getState().token;
            }
            return requestObj;
        });
    }
}

const interceptorService = new InterceptorService();

export default interceptorService;