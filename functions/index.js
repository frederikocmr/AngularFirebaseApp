/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(
  `smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

const APP_NAME = 'Linguiças Piracanjuba';
const ADMIN_EMAIL = 'frederiko.cmr@gmail.com';
const CC_EMAIL = 'linguicaspiracanjuba@hotmail.com'
/* exports */

exports.sendWelcomeEmail = functions.auth.user().onCreate(event => {

  const user = event.data;

  const email = user.email;
  const displayName = (user.displayName ? user.displayName : '');


  return sendWelcomeEmail(email, displayName);
});

exports.sendByeEmail = functions.auth.user().onDelete(event => {
  const user = event.data;

  const email = user.email;
  const displayName = user.displayName;

  return sendGoodbyEmail(email, displayName);
});

exports.sendContactEmail = functions.firestore.document('contactForms/{document=**}').onCreate(event => {

  var values = event.data.data();
  var email = ADMIN_EMAIL;

  return sendContactedEmail(email, values);
});

exports.sendNewOrderEmail = functions.firestore.document('orders/{document=**}').onCreate(event => {

  var values = event.data.data();
  var email = values.email;

  return sendOrderEmails(email, values);
});

exports.sendOrderStatusEmail = functions.firestore.document('orders/{document=**}').onUpdate(event => {

  var values = event.data.data();
  var email = values.email;

  return sendOrderStatusEmailC(email, values);
});


/* functions */

function sendWelcomeEmail(email, displayName) {
  const mailOptions = {
    from: '"Linguiças Piracanjuba" <suporte.linguicaspiracanjuba@gmail.com>',
    to: email
  };


  mailOptions.subject = `Seja bem vindo a nossa loja virtual ${APP_NAME}!`;

  mailOptions.html = `
<div style="margin:0;padding:0" marginheight="0" marginwidth="0" style="border: 1px dashed #af272d">
  <table border="0" cellspacing="0" cellpadding="0" width="100%">
    <tbody>
      <tr>
        <td style="text-align:center;padding:0px 0px 2px;background:#e0e0e0;border-bottom:1px solid #c6c6c6">
          <img src="https://lh3.googleusercontent.com/-YF0o_INd8cM/AAAAAAAAAAI/AAAAAAAAAAg/2vMzrLcacrI/s90-c-k-no/photo.jpg" alt="Mathway"
            style="vertical-align:bottom">
        </td>
      </tr>
      <tr>
        <td style="background:#e0e0e0">
          <div style="margin: 0 10% 0 10%;background:#fff;padding:40px 20px;border-top: 4px solid #af272d;">
            <span style="font:400 14px/16px Tahoma,Arial,sans-serif;color:#666;">Olá ${displayName}!
              <br>
              <br>
              <h4>Seja <b>bem vindo</b> à nossa loja virtual.
              <br> Esperamos que você goste dos nossos produtos!</h4>
              
              <br>Agradecemos pela preferência,
              <br>Linguiças Piracanjuba</span>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:15px;background:#f0f0f0;border-top:1px solid #c6c6c6;border-bottom:1px solid #e5e5e5">
          <table border="0" width="100%" cellpadding="0" cellspacing="0">
            <tbody>
              <tr>
                <td width="200" style="text-align:center">
                  <a href="https://www.facebook.com/linguicapiracanjuba/" target="_blank">
                    <img src="https://xink.io/wp-content/themes/Xink/assets/images/icons/color/32/facebook_004.png" alt="Facebook" border="0"
                      class="m_-8472941526770889822fb CToWUd" style="vertical-align:bottom;margin:0 5px">
                  </a>&nbsp;
                  <a href="https://www.instagram.com/linguicaspiracanjuba/" target="_blank">
                    <img src="https://xink.io/wp-content/themes/Xink/assets/images/icons/color/32/instagram_004.png" alt="Instagram" border="0"
                      style="vertical-align:bottom;margin:0 5px">
                  </a>&nbsp;
                  <a href="https://www.google.com.br/maps/place/Lingui%C3%A7as+Piracanjuba/@-17.1963012,-49.1536994,15z/data=!4m8!1m2!3m1!2sLingui%C3%A7as+Piracanjuba!3m4!1s0x935f6cc5704248f5:0xbe1debc2e5c1dbcf!8m2!3d-17.1963418!4d-49.1504797" target="_blank">
                    <img src="https://xink.io/wp-content/themes/Xink/assets/images/icons/color/32/gplus_004.png" alt="Google" border="0" style="vertical-align:bottom;margin:0 5px">

                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</div>
  `;

  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('New welcome email sent to:', email);
  });
}

function sendGoodbyEmail(email, displayName) {
  const mailOptions = {
    from: '"Linguiças Piracanjuba" <suporte.linguicaspiracanjuba@gmail.com>',
    to: email
  };


  mailOptions.subject = `Informação sobre sua conta no site ${APP_NAME}!`;
  mailOptions.html = `
<div style="margin:0;padding:0" marginheight="0" marginwidth="0" style="border: 1px dashed #af272d">
  <table border="0" cellspacing="0" cellpadding="0" width="100%">
    <tbody>
      <tr>
        <td style="text-align:center;padding:0px 0px 2px;background:#e0e0e0;border-bottom:1px solid #c6c6c6">
          <img src="https://lh3.googleusercontent.com/-YF0o_INd8cM/AAAAAAAAAAI/AAAAAAAAAAg/2vMzrLcacrI/s90-c-k-no/photo.jpg" alt="Mathway"
            style="vertical-align:bottom">
        </td>
      </tr>
      <tr>
        <td style="background:#e0e0e0">
          <div style="margin: 0 10% 0 10%;background:#fff;padding:40px 20px;border-top: 4px solid #af272d;">
            <span style="font:400 14px/16px Tahoma,Arial,sans-serif;color:#666;">Olá ${displayName}!
              <br>
              <br>
              <h4> A sua conta no site ${APP_NAME} foi <b>excluida</b> do nosso sistema, volte sempre! </h4>
              
              <br>Agradecemos pela preferência,
              <br>Linguiças Piracanjuba</span>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:15px;background:#f0f0f0;border-top:1px solid #c6c6c6;border-bottom:1px solid #e5e5e5">
          <table border="0" width="100%" cellpadding="0" cellspacing="0">
            <tbody>
              <tr>
                <td width="200" style="text-align:center">
                  <a href="https://www.facebook.com/linguicapiracanjuba/" target="_blank">
                    <img src="https://xink.io/wp-content/themes/Xink/assets/images/icons/color/32/facebook_004.png" alt="Facebook" border="0"
                      class="m_-8472941526770889822fb CToWUd" style="vertical-align:bottom;margin:0 5px">
                  </a>&nbsp;
                  <a href="https://www.instagram.com/linguicaspiracanjuba/" target="_blank">
                    <img src="https://xink.io/wp-content/themes/Xink/assets/images/icons/color/32/instagram_004.png" alt="Instagram" border="0"
                      style="vertical-align:bottom;margin:0 5px">
                  </a>&nbsp;
                  <a href="https://www.google.com.br/maps/place/Lingui%C3%A7as+Piracanjuba/@-17.1963012,-49.1536994,15z/data=!4m8!1m2!3m1!2sLingui%C3%A7as+Piracanjuba!3m4!1s0x935f6cc5704248f5:0xbe1debc2e5c1dbcf!8m2!3d-17.1963418!4d-49.1504797" target="_blank">
                    <img src="https://xink.io/wp-content/themes/Xink/assets/images/icons/color/32/gplus_004.png" alt="Google" border="0" style="vertical-align:bottom;margin:0 5px">

                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</div>
  `;

  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('Account deletion confirmation email sent to:', email);
  });
}

function sendContactedEmail(email, values) {
  const mailOptions = {
    from: '"Linguiças Piracanjuba" <suporte.linguicaspiracanjuba@gmail.com>',
    to: email + ", " + CC_EMAIL
  };


  mailOptions.subject = `Novo contato no site ${APP_NAME} - ${values.type}`;
  mailOptions.html = `

<div style="margin:0;padding:0" marginheight="0" marginwidth="0" style="border: 1px dashed #af272d">
  <table border="0" cellspacing="0" cellpadding="0" width="100%">
    <tbody>
      <tr>
        <td style="text-align:center;padding:0px 0px 2px;background:#e0e0e0;border-bottom:1px solid #c6c6c6">
          <img src="https://lh3.googleusercontent.com/-YF0o_INd8cM/AAAAAAAAAAI/AAAAAAAAAAg/2vMzrLcacrI/s90-c-k-no/photo.jpg" alt="Mathway"
            style="vertical-align:bottom">
        </td>
      </tr>
      <tr>
        <td style="background:#e0e0e0">
          <div style="margin: 0 10% 0 10%;background:#fff;padding:40px 20px;border-top: 4px solid #af272d;">
            <span style="font:400 14px/16px Tahoma,Arial,sans-serif;color:#666;"> Um novo formulario de contato foi criado com as seguintes informações:

              <p>  <b>Nome</b>: ${values.name} <br> <b>Email</b>: ${values.email} <br> <b>Tipo</b>: ${values.type} <br> <b>Mensagem</b>: ${values.message} <br> <b>Data</b>: ${values.date} <br><b>ID</b>: ${values.fid} </p>
              
              <br>Este email foi enviado pelo sistema.</span>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:15px;background:#f0f0f0;border-top:1px solid #c6c6c6;border-bottom:1px solid #e5e5e5">
          <table border="0" width="100%" cellpadding="0" cellspacing="0">
            <tbody>
              <tr>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</div>
  `;
  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('New contacted email from:', values.email);
  });
}

function sendOrderEmails(email, values) {
  sendOrderEmail(ADMIN_EMAIL, values);
  sendOrderConfirmationEmail(email, values);
  return 0;
}

function sendOrderEmail(email, values) {
  const mailOptions = {
    from: '"Linguiças Piracanjuba" <suporte.linguicaspiracanjuba@gmail.com>',
    to: email + ", " + CC_EMAIL
  };


  mailOptions.subject = `Novo pedido realizado no site - ${APP_NAME}`;
  mailOptions.html = `
  <div style="margin:0;padding:0" marginheight="0" marginwidth="0" style="border: 1px dashed #af272d">
  <table border="0" cellspacing="0" cellpadding="0" width="100%">
    <tbody>
      <tr>
        <td style="text-align:center;padding:0px 0px 2px;background:#e0e0e0;border-bottom:1px solid #c6c6c6">
          <img src="https://lh3.googleusercontent.com/-YF0o_INd8cM/AAAAAAAAAAI/AAAAAAAAAAg/2vMzrLcacrI/s90-c-k-no/photo.jpg" alt="Mathway"
            style="vertical-align:bottom">
        </td>
      </tr>
      <tr>
        <td style="background:#e0e0e0">
          <div style="margin: 0 10% 0 10%;background:#fff;padding:40px 20px;border-top: 4px solid #af272d;">
            <span style="font:400 14px/16px Tahoma,Arial,sans-serif;color:#666;">Segue os dados do novo pedido realizado no site:
                      <p><b>Itens</b>: ${values.itens}</p>
                      <p><b>Opção de entrega</b>: ${values.deliveryOption}</p>
                      <p><b>Método de pagamento</b>: ${values.paymentMethod}</p>
                      <p><b>Valor a ser pago</b>: R$ ${values.paidValue}</p>
                      <p><b>Nome do contato</b>: ${values.contactName}</p>
                      <p><b>Endereço de entrega</b>: ${values.address}</p>
                      <p><b>CPF/CNPJ (usuário)</b>: ${values.document}</p>
                      <p><b>Email (usuário)</b>: ${values.email}</p>
                      <p><b>Data/hora (registro)</b>: ${values.date}</p>
                      <p><b>ID do pedido (registro)</b>: #${values.id}</p>
                      <br>
                      <p>Este email foi enviado pelo sistema.</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:15px;background:#f0f0f0;border-top:1px solid #c6c6c6;border-bottom:1px solid #e5e5e5">
          <table border="0" width="100%" cellpadding="0" cellspacing="0">
            <tbody>
              <tr>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</div>
`;

  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('New order email from:', values.email);
  });
}

function sendOrderConfirmationEmail(email, values) {
  const mailOptions = {
    from: '"Linguiças Piracanjuba" <suporte.linguicaspiracanjuba@gmail.com>',
    to: email
  };


  mailOptions.subject = `Pedido realizado com sucesso! - ${APP_NAME}`;
  mailOptions.html = `
 <div style="margin:0;padding:0" marginheight="0" marginwidth="0" style="border: 1px dashed #af272d">
  <table border="0" cellspacing="0" cellpadding="0" width="100%">
    <tbody>
      <tr>
        <td style="text-align:center;padding:0px 0px 2px;background:#e0e0e0;border-bottom:1px solid #c6c6c6">
          <img src="https://lh3.googleusercontent.com/-YF0o_INd8cM/AAAAAAAAAAI/AAAAAAAAAAg/2vMzrLcacrI/s90-c-k-no/photo.jpg" alt="Mathway"
            style="vertical-align:bottom">
        </td>
      </tr>
      <tr>
        <td style="background:#e0e0e0">
          <div style="margin: 0 10% 0 10%;background:#fff;padding:40px 20px;border-top: 4px solid #af272d;">
            <span style="font:400 14px/16px Tahoma,Arial,sans-serif;color:#666;">Pedido realizado com sucesso!<br><br>
                    <p><b>Segue os dados do novo pedido realizado no site:</b> </p> 
      <p><b>Itens</b>: ${values.itens}</p>
      <p><b>Opção de entrega</b>: ${values.deliveryOption}</p>
      <p><b>Método de pagamento</b>: ${values.paymentMethod}</p>
      <p><b>Valor a ser pago</b>: R$ ${(values.paidValue.toFixed(2))}</p>
      <p><b>Nome do contato</b>: ${values.contactName}</p>
      <p><b>Endereço de entrega</b>: ${values.address}</p>
      <p><b>ID do pedido (registro)</b>: #${values.id}</p>
      <br>
              Em breve receberá mais informações sobre o status do pedido.
              <br>   <br>
              <hr>
            Agradecemos pela preferência,
              <br>Linguiças Piracanjuba</span>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:15px;background:#f0f0f0;border-top:1px solid #c6c6c6;border-bottom:1px solid #e5e5e5">
          <table border="0" width="100%" cellpadding="0" cellspacing="0">
            <tbody>
              <tr>
                <td width="200" style="text-align:center">
                  <a href="https://www.facebook.com/linguicapiracanjuba/" target="_blank">
                    <img src="https://xink.io/wp-content/themes/Xink/assets/images/icons/color/32/facebook_004.png" alt="Facebook" border="0"
                      class="m_-8472941526770889822fb CToWUd" style="vertical-align:bottom;margin:0 5px">
                  </a>&nbsp;
                  <a href="https://www.instagram.com/linguicaspiracanjuba/" target="_blank">
                    <img src="https://xink.io/wp-content/themes/Xink/assets/images/icons/color/32/instagram_004.png" alt="Instagram" border="0"
                      style="vertical-align:bottom;margin:0 5px">
                  </a>&nbsp;
                  <a href="https://www.google.com.br/maps/place/Lingui%C3%A7as+Piracanjuba/@-17.1963012,-49.1536994,15z/data=!4m8!1m2!3m1!2sLingui%C3%A7as+Piracanjuba!3m4!1s0x935f6cc5704248f5:0xbe1debc2e5c1dbcf!8m2!3d-17.1963418!4d-49.1504797" target="_blank">
                    <img src="https://xink.io/wp-content/themes/Xink/assets/images/icons/color/32/gplus_004.png" alt="Google" border="0" style="vertical-align:bottom;margin:0 5px">

                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</div>`;

  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('New order confirmation email from:', values.email);
  });
}

function sendOrderStatusEmailC(email, values) {
  const mailOptions = {
    from: '"Linguiças Piracanjuba" <suporte.linguicaspiracanjuba@gmail.com>',
    to: email
  };

  const statusName = ((values.status == 1 ? 'Processando' : (values.status == 2 ? 'Confirmado' : (values.status == 3 ? 'Em trânsito' : (values.status == 4 ? 'Entregue' : 'Cancelado')))));
  mailOptions.subject = `Pedido ${statusName}! - ${APP_NAME}`;
  mailOptions.html = `
<div style="margin:0;padding:0" marginheight="0" marginwidth="0" style="border: 1px dashed #af272d">
  <table border="0" cellspacing="0" cellpadding="0" width="100%">
    <tbody>
      <tr>
        <td style="text-align:center;padding:0px 0px 2px;background:#e0e0e0;border-bottom:1px solid #c6c6c6">
          <img src="https://lh3.googleusercontent.com/-YF0o_INd8cM/AAAAAAAAAAI/AAAAAAAAAAg/2vMzrLcacrI/s90-c-k-no/photo.jpg" alt="Mathway"
            style="vertical-align:bottom">
        </td>
      </tr>
      <tr>
        <td style="background:#e0e0e0">
          <div style="margin: 0 10% 0 10%;background:#fff;padding:20px 20px;border-top: 4px solid #af272d;">
            <span style="font:400 14px/16px Tahoma,Arial,sans-serif;color:#666;"> <p><b>Novo status do seu pedido #${values.id}:<br><br> <span style="color:gray;">${statusName}</span></b></p> <br>
                    
    <p><b>Segue os dados do pedido em questão:</b> </p> 
      <p><b>Itens</b>: ${values.itens}</p>
      <p><b>Endereço de entrega</b>: ${values.address}</p>

      <br>

              Em breve receberá mais informações sobre o status do pedido.
              <br>   <br>
              <hr>
            Agradecemos pela preferência,
              <br>Linguiças Piracanjuba</span>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:15px;background:#f0f0f0;border-top:1px solid #c6c6c6;border-bottom:1px solid #e5e5e5">
          <table border="0" width="100%" cellpadding="0" cellspacing="0">
            <tbody>
              <tr>
                <td width="200" style="text-align:center">
                  <a href="https://www.facebook.com/linguicapiracanjuba/" target="_blank">
                    <img src="https://xink.io/wp-content/themes/Xink/assets/images/icons/color/32/facebook_004.png" alt="Facebook" border="0"
                      class="m_-8472941526770889822fb CToWUd" style="vertical-align:bottom;margin:0 5px">
                  </a>&nbsp;
                  <a href="https://www.instagram.com/linguicaspiracanjuba/" target="_blank">
                    <img src="https://xink.io/wp-content/themes/Xink/assets/images/icons/color/32/instagram_004.png" alt="Instagram" border="0"
                      style="vertical-align:bottom;margin:0 5px">
                  </a>&nbsp;
                  <a href="https://www.google.com.br/maps/place/Lingui%C3%A7as+Piracanjuba/@-17.1963012,-49.1536994,15z/data=!4m8!1m2!3m1!2sLingui%C3%A7as+Piracanjuba!3m4!1s0x935f6cc5704248f5:0xbe1debc2e5c1dbcf!8m2!3d-17.1963418!4d-49.1504797" target="_blank">
                    <img src="https://xink.io/wp-content/themes/Xink/assets/images/icons/color/32/gplus_004.png" alt="Google" border="0" style="vertical-align:bottom;margin:0 5px">

                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</div>`;

  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('New order status email to:', values.email);
  });
}