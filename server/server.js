const express = require('express');
const cors = require('cors');
const pdfkit = require('pdfkit');

const app = express();
const port = 3000;

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

var counter = 0;
var pdfOptions = {
    size: 'LETTER',
    bufferPages: true,
    margins: {
        top: 120,
        bottom: 72,
        left: 72,
        right: 72
    }
};
const colors = {
    it_blue: "#124B99",
};
var ruler = {
    doc_start: null,
}
var prefs = {
    header_font_size: 20,
    header_font: 'fonts/BebasNeue.otf',
    body_font_size: 12,
    body_font: 'fonts/HelveticaNeue-Light.ttf',
};

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
        .rect(-70, -90, 55, 300)
        .fill('#124b99')
        .restore()
    
    doc.save()
        .rotate(45, {origin: [doc.page.width, doc.page.height]})
        .rect(doc.page.width - 80, doc.page.height - 200, 55, 300)
        .fill('#124b99')
        .restore()
    
    // Program header image
    let headerImg = doc.image('./assets/it_logo.png', (doc.page.width - 300) / 2, 20, {width: 300});
    ruler.doc_start = headerImg.y + headerImg.height;
}

// Functions to build each layout item
// Returns last created element
function genLargeHeader(item, doc) {
    var text = doc.fontSize(prefs.header_font_size)
                    .fill(colors.it_blue)
                    .font(prefs.header_font)
                    .text(item.details.header, {
                        align: 'left',
                    });
    var line = doc.save()
                    .rect(text.x, text.y, doc.page.width - (pdfOptions.margins.right + pdfOptions.margins.left), 3)
                    .fill(colors.it_blue)
                    .stroke()
                    .restore();
    return line;
}

function genLargeHeaderText(item, doc) {
    var header = doc.fontSize(prefs.header_font_size)
                    .fill(colors.it_blue)
                    .font(prefs.header_font)
                    .text(item.details.header, {
                        align: 'left',
                    });
    var line = doc.save()
                    .rect(header.x, header.y, doc.page.width - (pdfOptions.margins.right + pdfOptions.margins.left), 3)
                    .fill(colors.it_blue)
                    .stroke()
                    .restore();
    var text = doc.moveDown(0.5)
                    .fontSize(prefs.body_font_size) 
                    .font(prefs.body_font)
                    .fill("black")
                    .text(item.details.text, {
                        align: 'left',
                    });
    return text;
}

function genParagraph(item, doc) {
    var text = doc.fontSize(prefs.body_font_size)
                    .fill("black")
                    .font(prefs.body_font)
                    .text(item.details.text, {
                        align: 'left',
                    });
    return text;
}

function applyLayout(layout, doc) {
    var text = null;
    var startx = ruler.doc_start;

    // .moveDown() moves the cursor down, not the object
    for (let i = 0; i < layout.length; i++) {
        switch(layout[i].type) {
            case "LargeHeaderText":
                text = genLargeHeaderText(layout[i], doc);
                break;
            case "LargeHeader":
                text = genLargeHeader(layout[i], doc);
                break;
            case "PlainParagraph":
                text = genParagraph(layout[i], doc);
                break;
            default:
                console.log("Unrecognized layout type: " + layout[i].type);
        }

        if (text !== null) {
            text.moveDown(1);
        }
    }
}

app.post("/download", (req, res) => {
    console.log(req.body);
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

    docSetup(doc);
    applyLayout(req.body, doc);
    
    doc.end();
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
