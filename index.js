
// Mermaid の初期化
mermaid.initialize({startOnLoad:true}); 

// Markdown-it の初期化
const md = window.markdownit();

// CSV を Markdown に変換する関数
function csvToMarkdown(csv) {
const lines = csv.trim().split('\n');
const headers = lines[0].split(',');
const rows = lines.slice(1);

let markdown = '| ' + headers.join(' | ') + ' |\n';
markdown += '| ' + headers.map(() => '---').join(' | ') + ' |\n';

rows.forEach(row => {
    const cells = row.split(',');
    markdown += '| ' + cells.join(' | ') + ' |\n';
});

return markdown;
}




// Markdown を HTML に変換する関数
function renderMarkdown() {
const markdownContent = document.querySelectorAll('.markdown-content');
// console.log(markdownContent);
markdownContent.forEach(content => {
    const htmlContent = md.render(content.textContent);
    const div = document.createElement('div');
    div.innerHTML = htmlContent;
    content.parentNode.insertBefore(div, content.nextSibling);
});
}

// CSV を HTML に変換する関数
function renderCSV() {
const csvContent = document.querySelectorAll('.csv-content');
csvContent.forEach(content => {
    const markdownTable = csvToMarkdown(content.textContent);
    const htmlContent = md.render(markdownTable);
    const div = document.createElement('div');
    div.innerHTML = htmlContent;
    content.parentNode.insertBefore(div, content.nextSibling);
});
}

// Mermaid を HTML に変換する関数
function renderMermaid() {
    const mermaidContent = document.querySelectorAll('.mermaid-content');
    mermaidContent.forEach(content => {
        const div = document.createElement('div');
        div.className = 'mermaid';
        div.innerHTML = content.textContent;
        content.parentNode.insertBefore(div, content.nextSibling);
    });
mermaid.contentLoaded();
}
//plantnmlのurlを取得する
function getURL(sauce){
    return "http://www.plantuml.com/plantuml/svg/"+plantumlEncoder.encode(sauce);
};

//plantnmlをHTMLに変換する関数
function renderPlantuml() {
    const plantumlContent = document.querySelectorAll('.plantuml-content');
    plantumlContent.forEach(content => {
        const img = document.createElement('img');
        img.className = 'view';
        img.src = getURL(content.textContent);
        content.parentNode.insertBefore(img, content.nextSibling);
    });
}

fetch('./index.data')
.then(response => response.text())
.then(text => {
    document.getElementById('root').innerHTML = text;
})
.then(() => {
    // MathJaxで数式をレンダリング 
    MathJax.typesetPromise();
})
.then(() => {
    renderCSV();
})
.then(() => {
    renderMermaid();
})
.then(() => {
    renderMarkdown();
})
.then(() => {
    renderPlantuml();
})
.then(() => {
    document.querySelectorAll('*');
})
.catch(error =>{console.error('エラーが発生しました。',error);
});