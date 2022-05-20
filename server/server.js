const express = require('express');
const cors = require('cors');
const pdfkit = require('pdfkit');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cors());

var counter = 0;
var pdfOptions = {
    size: 'LETTER',
    bufferPages: true,
}

function docSetup(doc) {
    // For solid color corner accents
    // top left corner
    // docObj.save()
    //     .moveTo(0, 0)
    //     .lineTo(0, 90)
    //     .lineTo(90, 0)
    //     .fill(`#124b99`);

    // bottom right corner
    // docObj.save()
    //     .moveTo(docObj.page.width, docObj.page.height)
    //     .lineTo(docObj.page.width - 90, docObj.page.height)
    //     .lineTo(docObj.page.height, docObj.page.width - 90)
    //     .fill(`#124b99`);

    // For striped color corner accents
    doc.save()
        .rotate(45, {origin: [30, 150]})
        .rect(-70, -90, 60, 300)
        .fill('#124b99')
        .restore()
    
    doc.save()
        .rotate(45, {origin: [30, 150]})
        .rect(doc.page.width, doc.page.height, 60, 300)
        .fill('#124b99')
        .restore()
    
    // Program header image
    doc.image('./assets/it_logo.png', (doc.page.width - 300) / 2, 20, {width: 300});
}

app.post("/download", (req, res) => {
    const doc = new pdfkit(pdfOptions);
    let buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
        let data = Buffer.concat(buffers);
        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(data),
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment;filename=syllabus.pdf',
        }).end(data);
        console.log("PDF sent");
    });

    doc.font('Times-Roman')
        .fontSize(12)
        .text(`Hello, ${req.body.name}!`, 100, 100)
        .text(`Counter: ${counter++}`, 100, 130);

    docSetup(doc);
    
    doc.end();
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
