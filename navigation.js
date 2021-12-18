const showTab = function(tabId){
    const tabList = ['uploadTab', 'searchTab', 'viewerTab']
    tabList.forEach(tab => {
        document.getElementById(tab).style.display = 'none'    
    })
    if(typeof tabId == 'number'){
        document.getElementById(tabList[tabId]).style.display = 'block'
    }
}

document.getElementById('searchBtn').addEventListener('click',()=>showTab(1))
document.getElementById('uploadBtn').addEventListener('click',()=>showTab(0))


