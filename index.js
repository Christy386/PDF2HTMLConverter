const express = require('express');
const pdf = require('html-pdf');
const qr = require('qrcode');

const app = express();

// Define a route that receives parameters in the URL
app.get('/pdf/', (req, res) => {

    const name = req.query.name;
    const age = req.query.age;
    const pedidoId = req.query.pedidoId;
    const pedidoNome = req.query.pedidoNome;
    const usuario = req.query.usuario;
    const endereco = req.query.endereco;
    const dataIn = req.query.dataIn;
    const dataOut = req.query.dataOut;
    const tipo = req.query.tipo;
    const material = req.query.material;
    const cor = req.query.cor;
    const quantidade = req.query.quantidade;
    const list = req.query.quantidade
    

    
    // Define the HTML that you want to convert to PDF
    qr.toDataURL(name, { errorCorrectionLevel: 'H' }, function(err, qrCodeDataUrl) {
        if (err) {
          console.log(err);
          return res.status(500).send('Error generating QR code');
        }
        //console.log()
        //qrURL = qrCodeDataUrl;
    
        const html = `
            <html>
            <head>
                <style>
                @page{
                    margin: 50px;
                }
                body{
                    font-family: Helvetica;
                    font-size: 8px;
                }
                div{
                    margin:0;
                }
                mark{
                    font-size: 10px;
                }
                .qrcodeDiv{
                    position:fixed; 
                    margin-left: 170px; 
                    margin-top: 15px;
                }
                .qrcodeImg{
                    width:80px; 
                    height:80px;
                }
                .solicitationInfo{
                    margin-top: 5px;
                    
                }
                .soliInfoTitle{
                    
                    margin-bottom: 5px;
                }
                .info{
                    max-width: 120px;
                }
                .tableTitle{
                    background-color: #000;
                    margin-top: 10px; 
                    margin-bottom: 10px;
                }
                .titleText{
                    color: #fff;
                    margin-left: 2px;
                    font-size: 11px;
                }
                .fileName{
                    #background-color: #aaa;
                    margin-top: 2px;
                    margin-left: 12px;
                    border-color: #000;
                    
                    border-bottom: 1px solid #aaa;
                }
                </style>
                
    
                <title>${name}'s PDF Document</title>
            </head>
            <body>
                <div>
                    <div>
                        <img src="http://www.labpronto.com.br/hub/blue.png" align="left" style="width: 80px;">
                    <div>
                    <div class="endereco" align="right">
                        <div><b>CNPJ:</b> 37.605.824/0001-03</div>
                        <div>Av. Amintas Barros, 3700 Sala 1907</div>
                        <div>Lagoa Nova - Natal/RN</div>
                        <div>(84) 98634-6730<br></div>
                    </div>
                </div>
                <div class="qrcodeDiv" >
                    <img class="qrcodeImg" src="${qrCodeDataUrl}" />
                </div>
                <div>
                    <div class="solicitationInfo">
                        <div class="soliInfoTitle" align="center">
                            <b>SOLICITAÇÃO Nº ${pedidoId} - ${pedidoNome}</b>
                        </div>
                    </div>
                    <div class="info">
                        <b>Solicitante: </b><mark>${usuario}</mark>
                    </div>
                    <div class="info">
                        <b>Endereço: </b><mark>${endereco}</mark>
                    </div>
                    <div class="info">
                        <b>Solicitação: </b>${dataIn}
                        <b>  Finalização: </b>${dataOut}
                    </div class="info">
                    <div>
                        <b>Tipo de impressão: </b>${tipo}
                    </div>
                    <div>
                        <b>Material: </b> ${material} - ${cor}
                    </div>
                    
                    <div class="tableTitle">
                        
                        <a class="titleText" >
                            ${quantidade} Modelos - Nº ${pedidoId} - ${pedidoNome} .
                        </a>
                    </div>
                    <div>
                        ${list}
                    </div>
                    
                </div>
                
            </body>
            </html>
        `;

        // Define the PDF conversion options
        const options = {
            format: 'A6',
            border: {
                top: '0.3in',
                right: '0.3in',
                bottom: '0.3in',
                left: '0.3in'
            }
        };

        // Generate the PDF buffer using html-pdf
        pdf.create(html, options).toBuffer(function(err, buffer) {
            if (err) {
                console.log(err);
                return res.status(500).send('Error generating PDF');
            }

        // Set the Content-Disposition header to display the PDF in the browser
            // and include the filename parameter to set the name of the PDF in the title of the browser window
            res.set('Content-Disposition', `inline; filename=${name}.pdf`);

            // Set the Content-Type header to 'application/pdf'
            res.set('Content-Type', 'application/pdf');

            // Send the PDF buffer as the response
            res.send(buffer);
        });
    });
});

    // Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});