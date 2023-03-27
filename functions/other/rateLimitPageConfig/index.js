import RateLimit from '@/functions/other/rateLimit';

const pageConfig = {
    login: {
        maxRequest: 2,
        timeLimit: "15 s",  
        errorMessage: "Kısa zamanda çok fazla istek attınız."
    },

    register: {
        maxRequest: 5, 
        timeLimit: "300 s", 
        errorMessage: "Kısa zamanda çok fazla istek attınız."
    },

    sendVerifyEmail: {
        maxRequest: 2, 
        timeLimit: "600 s", 
        errorMessage: "Kısa zamanda çok fazla istek attınız."
    },

    forgotPassword: {
        maxRequest: 2, 
        timeLimit: "600 s", 
        errorMessage: "Kısa zamanda çok fazla istek attınız."
    }
};

export  default async function rateLimitPageConfig(req) {

    try {
        // kullanıcının gittiği sayfanın path bilgisini alırız.
        const path = req.nextUrl.pathname;
        
        // path adresinin içerisinden yukarıda tanımladığımız "pageConfig" nesnesindeki sayfaların başlangıç kısmını aratırız.
        const currentPage = Object.keys(pageConfig).find(page => path.startsWith(path));
        if (currentPage) {
            // sayfa başlangıç kısmı ile eşleşen sayfa var ise rate limit kontrolü yapılır.
            const {maxRequest, timeLimit, errorMessage} = pageConfig[currentPage];
            const {error, success, reset} = await RateLimit(req, maxRequest, timeLimit);
            console.log(success)
            console.log(path)
            if (error) {
                throw new Error(error);
            }

            if (!success) {
                let error =  new Error();
                error.message = errorMessage;
                error.reset = reset;
                throw error;
            }
            else {
                return {success: true};
            }

        }
        else {
            return {success: true};
        } 

    } catch (error) {
        return {error: error.message, success: false, reset: error.reset, path: req.nextUrl.pathname};
    }
}
