import moment = require('moment');
export function NewOrderTemplate(order: any) {
    const m = moment;
    const startdate = m();
    const new_date = m(startdate).add(21, 'days');
    const deliveryDay = new_date.format('MMMM Do YYYY');

    const products: any = order.product.map((product: any) => {
        return `
        <tr>
            <td>
                <img src="https://tai-dye-studios.com/${product.images[0].src}" alt="${product.title}" width="80">
            </td>
            <td valign="top" style="padding-left: 15px;">
                <h5 style="margin-top: 15px;">${product.sku} </h5>
            </td>
            <td valign="top" style="padding-left: 15px;">
                <h5 style="font-size: 14px; color:#444;margin-top:15px;    margin-bottom: 0px;">Size : <span> ${product.size}</span> </h5>
                <h5 style="font-size: 14px; color:#444;margin-top: 10px;">QTY : <span>${product.quantity}</span></h5>
            </td>
            <td valign="top" style="padding-left: 15px;">
                <h5 style="font-size: 14px; color:#444;margin-top:15px"><b>$${product.price}</b></h5>
            </td>
        </tr>
        `
    });
    return `
    <!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" href="https://tai-dye-studios.com/favicon.ico" type="image/x-icon">
        <link rel="shortcut icon" href="https://tai-dye-studios.com/favicon.ico" type="image/x-icon">
        <title>Tai-Dye Studios New Customer Order</title>
        <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900" rel="stylesheet">

        <style type="text/css">
            body{
            	text-align: center;
            	margin: 0 auto;
            	width: 650px;
            	font-family: 'Open Sans', sans-serif;
            	background-color: #e2e2e2;
            	display: block;
            }
            ul{
            	margin:0;
            	padding: 0;
            }
            li{
            	display: inline-block;
            	text-decoration: unset;
            }
            a{
            	text-decoration: none;
            }
            p{
                margin: 15px 0;
            }

            h5{
            	color:#444;
                text-align:left;
                font-weight:400;
            }

            .text-center{
            	text-align: center
            }
            .main-bg-light{
            	background-color: #fafafa;
            }
            .title{
            	color: #444444;
            	font-size: 22px;
            	font-weight: bold;
            	margin-top: 10px;
            	margin-bottom: 10px;
            	padding-bottom: 0;
            	text-transform: uppercase;
            	display: inline-block;
            	line-height: 1;
            }
            table{
                margin-top:30px
            }
            table.top-0{
                margin-top:0;
            }
            table.order-detail {
                border: 1px solid #ddd;
                border-collapse: collapse;
            }
            table.order-detail tr:nth-child(even) {
              border-top:1px solid #ddd;
              border-bottom:1px solid #ddd;
            }
            table.order-detail tr:nth-child(odd) {
                border-bottom:1px solid #ddd;
            }
            .pad-left-right-space{
                border: unset !important;
            }
            .pad-left-right-space td{
                padding: 5px 15px;
            }
            .pad-left-right-space td p{
                margin: 0;
            }
            .pad-left-right-space td b{
                font-size:15px;
                font-family: 'Roboto', sans-serif;
            }
            .order-detail th{
                font-size:16px;
                padding:15px;
                text-align:center;
                background: #fafafa;
            }
            .footer-social-icon tr td img{
                margin-left:5px;
                margin-right:5px;
            }
        </style>
    </head>
    <body style="margin: 20px auto;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" style="padding: 0 30px;background-color: #fff; -webkit-box-shadow: 0px 0px 14px -4px rgba(0, 0, 0, 0.2705882353);box-shadow: 0px 0px 14px -4px rgba(0, 0, 0, 0.2705882353);width: 100%;">
            <tbody>
                <tr>
                    <td>
                        <table align="left" border="0" cellpadding="0" cellspacing="0" style="text-align: left;" width="100%">
                            <tr>
                                <td style="text-align: center;">
                                    <img src="https://tai-dye-studios.com/assets/images/icon/logo-shirt_230x93.png" alt="" style=";margin-bottom: 30px;">
                                </td>
                            </tr>
                           <tr>
                                <td>
                                    <p style="font-size: 14px;"><b>Customer Name: ${order.shippingDetails.firstname} ${order.shippingDetails.lastname},</b></p>
                                    <p style="font-size: 14px;">A New Order Has Been Placed For ${order.forPickup ? 'Local Pickup' : 'Delivery'}.</p>
                                    <p style="font-size: 14px;">Order ID : ${order.orderId}</p>
                                </td>
                            </tr>
                        </table>

                        <table cellpadding="0" cellspacing="0" border="0" align="left" style="width: 100%;margin-top: 10px;    margin-bottom: 10px;">
                                <tbody>
                                    <tr>
                                    <td style="background-color: #fafafa;border: 1px solid #ddd;padding: 15px;letter-spacing: 0.3px;width: 100%;">
                                        <h5 style="font-size: 16px; font-weight: 600;color: #000; line-height: 16px; padding-bottom: 13px; border-bottom: 1px solid #e6e8eb; letter-spacing: -0.65px; margin-top:0; margin-bottom: 13px;">Ship To</h5>
                                        <p style="text-align: left;font-weight: normal; font-size: 14px; color: #000000;line-height: 21px; margin-top: 0;">
                                        ${order.shippingDetails.firstname} ${order.shippingDetails.lastname}<br>${order.shippingDetails.street} <br>${order.shippingDetails.city}
                                        ${order.shippingDetails.state}<br> ${order.shippingDetails.zipcode}<br>Phone: ${order.shippingDetails.phone}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="order-detail" border="0" cellpadding="0" cellspacing="0"  align="left" style="width: 100%;    margin-bottom: 50px;">
                            <tr align="left">
                                <th>PRODUCT</th>
                                <th style="padding-left: 15px;">SKU</th>
                                <th>QUANTITY</th>
                                <th>PRICE </th>
                            </tr>
                            ${products.join('')}
                            <tr class="pad-left-right-space ">
                                <td class="m-t-5" colspan="2" align="left">
                                    <p style="font-size: 14px;">Subtotal : </p>
                                </td>
                                <td class="m-t-5" colspan="2" align="right">
                                    <b style>$${order.subTotal}</b>
                                </td>
                            <tr class="pad-left-right-space">
                                <td colspan="2" align="left">
                                    <p style="font-size: 14px;">TAX :</p>
                                </td>
                                <td colspan="2" align="right">
                                    <b>$${order.salesTax}</b>
                                </td>
                            </tr>
                            <tr class="pad-left-right-space">
                                <td colspan="2" align="left">
                                    <p style="font-size: 14px;">SHIPPING Charge :</p>
                                </td>
                                <td colspan="2" align="right">
                                    <b>$${order.shippingTotal}</b>
                                </td>
                            </tr>
                            <tr class="pad-left-right-space">
                                <td colspan="2" align="left">
                                    <p style="font-size: 14px;">Discount :</p>
                                </td>
                                <td colspan="2" align="right">
                                   <b> ${order.coupon ? order.coupon.save : '$0.00'}</b>
                                </td>
                            </tr>
                            <tr class="pad-left-right-space ">
                                <td class="m-b-5" colspan="2" align="left">
                                    <p style="font-size: 14px;">Total :</p>
                                </td>
                                <td class="m-b-5" colspan="2" align="right">
                                    <b>$${order.grandTotal}</b>
                                </td>
                            </tr>
                            <tr class="pad-left-right-space ">
                                <td class="m-b-5" colspan="2" align="left">
                                    <p style="font-size: 14px;">${order.forPickup ? 'Est. Pickup Date' : 'Est. Delivery Date'} :</p>
                                </td>
                                <td class="m-b-5" colspan="2" align="right">
                                    <b>${deliveryDay}</b>
                                </td>
                            </tr>

                        </table>

                    </td>
                </tr>
            </tbody>
        </table>
        <table class="main-bg-light text-center top-0"  align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td style="padding: 30px;">
                                    <div>
                                        <h4 class="title" style="margin:0;text-align: center;">Show Some 🤍</h4>
                                    </div>
                                    <table border="0" cellpadding="0" cellspacing="0" class="footer-social-icon" align="center" class="text-center" style="margin-top:20px;">
                                        <tr>
                                            <td>
                                                <p style="padding: 15px; margin 8px 0;">Remember that each customer matters!</p>
                                            </td>
                                        </tr>
                                    </table>
                                    <div style="border-top: 1px solid #ddd; margin: 20px auto 0;"></div>
                                    <table  border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 20px auto 0;" >
                                        <tr>
                                            <td>
                                                <p style="font-size:13px; margin:0;">2021 Copy Right by Tai-Dye Studios</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>Made with 🤍 by <a href="https://suremarketingsolutions.com" style="font-size:13px; margin:0;text-decoration: underline;">Sure Marketing Solutions</a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <script>

                        </script>
    </body>
</html>
    `
}