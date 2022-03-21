const mercadopago = require("mercadopago");
const { mercadoPagoAccessToken } = require("../constants");

mercadopago.configure({
    access_token: mercadoPagoAccessToken,
});

/**
 * @param {{id:number,name?:string, description?:string, price?:number, stock?:number}[]} products
 * @param {{firstName:string,lastName:string,locality:string,city:string,address:string,email:string,number:string}} userInfo
 */
const generatePayment = async (products, userInfo) => {
    try {
        return await mercadopago.preferences.create({
            items: products.map((product) => ({
                id: product.id,
                title: product.name,
                description: product.description,
                quantity: 1,
                unit_price: Number(product.price),
                currency_id: "ARS",
            })),
            payer: {
                name: `${userInfo.firstName} ${userInfo.lastName}`,
                address: { street_name: userInfo.address },
                email: userInfo.email,
            },
            additional_info: `number ${userInfo.number}`
        });
    } catch (error) {
        return { code: 400, message: error.message };
    }
};


/**
 * @description get all payments
 */
const getPayments = async () => {
    try {
        return await mercadopago.payment.search();
    } catch (error) {
        return { code: 400, message: error.message };
    }
};

module.exports = { generatePayment, getPayments };
