//let pdfUrl = '../testingfiles/testpdf.pdf'

let pdfDoc = null,
    pageNum = 1, //current page
    pageIsRendering = false, //rendering
    pageNumIsPending = null //loading

const scale = 1.5,
    canvas = document.querySelector('#pdfRenderer')
    ctx = canvas.getContext('2d')

// Render page

const renderPage = function(num){
    if(pageIsRendering || pdfDoc == null){return}
    pageIsRendering = true
    pdfDoc.getPage(num).then(page => {
        const viewport = page.getViewport({scale});
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        page.render({
            canvasContext: ctx,
            viewport
        }).promise.then(()=>{
            pageIsRendering = false;
            document.getElementById('pageTotal').textContent = pdfDoc.numPages;
            document.getElementById('pageNum').textContent = pageNum        
        })
    }).catch(err => {
        console.error('Unable to render the page')
        console.error(err);
    })
}


const loadDocument = function(url) {
    pageNum = 1
    console.log('Runs');
    pdfjsLib.getDocument(url).promise.then(file => {
        pdfDoc = file;
        renderPage(1)
    }).catch(err => {
        console.error('Failed to load pdf file');
        console.error(err)
    })
    showTab(2)
}


//Get document





const nextPage = function(){
    if(pageNum < pdfDoc.numPages){
        pageNum++
        renderPage(pageNum)
    }
}

const prevPage = function(){
    if(pageNum > 1){
        pageNum--
        renderPage(pageNum)
    }
}


//event listeners
document.getElementById('nextPage').addEventListener('click',nextPage)
document.getElementById('prevPage').addEventListener('click',prevPage)