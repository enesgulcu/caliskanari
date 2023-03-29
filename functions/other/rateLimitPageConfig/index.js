import RateLimit from '@/functions/other/rateLimit';

const pageConfig = {
    login: {
        maxRequest: 2,
        timeLimit: "500 s",  
        errorMessage: "Kısa zamanda çok fazla istek attınız.",
        backUrl: "/",
        targetUrl: process.env.NEXT_PUBLIC_URL + "/auth/login/student"
    },

    register: {
        maxRequest: 5, 
        timeLimit: "300 s", 
        errorMessage: "Kısa zamanda çok fazla istek attınız.",
        backUrl: "/",
        targetUrl: process.env.NEXT_PUBLIC_URL + "/auth/register/student"
    },

    sendVerifyEmail: {
        maxRequest: 2, 
        timeLimit: "600 s", 
        errorMessage: "Kısa zamanda çok fazla istek attınız.",
        backUrl: "/",
        targetUrl: process.env.NEXT_PUBLIC_URL + "/auth/sendVerifyEmail"
    },
    
    forgotPassword: {
        maxRequest: 2, 
        timeLimit: "600 s", 
        errorMessage: "Kısa zamanda çok fazla istek attınız.",
        backUrl: "/",
        targetUrl: process.env.NEXT_PUBLIC_URL + "/auth/forgotPassword"
    }
};

export  default async function rateLimitPageConfig(req, pathname) {

    try {
        // kullanıcının gittiği sayfanın path bilgisini alırız.
        const path = pathname;

        
        // path adresinin içerisinden yukarıda tanımladığımız "pageConfig" nesnesindeki sayfaların başlangıç kısmını aratırız.
        const currentPage = Object.keys(pageConfig).find(page => path.startsWith(path));
        if (currentPage) {
            // sayfa başlangıç kısmı ile eşleşen sayfa var ise rate limit kontrolü yapılır.
            const {maxRequest, timeLimit, errorMessage, backUrl, targetUrl} = pageConfig[currentPage];
            const {error, success, reset} = await RateLimit(req, maxRequest, timeLimit);

            if (error) {
                throw new Error(error);
            }

            if (!success) {
                let error =  new Error();
                error.message = errorMessage;
                error.reset = reset;
                error.backUrl = backUrl;
                error.targetUrl = targetUrl;
                throw error;
            }
            else {
                return {success: true, backUrl:backUrl, targetUrl:targetUrl};
            }

        }
        else {
            return {success: true};
        } 

    } catch (error) {
        return {error: error.message, success: false, reset: error.reset, backUrl: error.backUrl, targetUrl: error.targetUrl};
    }
}
