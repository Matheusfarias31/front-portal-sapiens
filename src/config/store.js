//const axios = require('axios');


class store {
    constructor() {
        this.authEndpoints = {
            admin: 'validateAdmin',            
            default: 'validate',
        };
    }

     user() {
        const token = localStorage.getItem("tokenSistema_1017");
        if (token) {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split("")
                    .map((c) => {
                        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                    })
                    .join("")
            );

            return JSON.parse(jsonPayload);
        }
    }

    async authGuard(to, from, next, role) {
        try {
            const token = localStorage.getItem('tokenSistema_1017');
            
            if (!token) {
                return next('/logout');
            }

            console.log(role);

            // const endpoint = this.authEndpoints[role] || this.authEndpoints.default;
            // const Authorization = 'Bearer ' + token;

            // await axios({
            //     method: 'get',
            //     url: `http://192.168.4.45:3020/api.Bernwork/v1/${endpoint}`,
            //     headers: {
            //         Authorization,
            //     },
            // });

            next();
        } catch (error) {
            console.log(error);
            next('/portalplurimas/logout');
        }
    }

     authAdmin = async (to, from, next)=> {
        await this.authGuard(to, from, next, 'admin');
    }

    auth = async (to, from, next)=>{
            await this.authGuard(to, from, next, 'default')
    }
}

module.exports = new store();

