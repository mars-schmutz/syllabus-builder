const express = require('express');
const cors = require('cors');
const pdfkit = require('pdfkit');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/download", (req, res) => {
    const doc = new pdfkit({
        bufferPages: true,
        size: 'A7',
    });
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
        .text(`Hello, ${req.body.name}!`, 100, 100);
    doc.end();
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
