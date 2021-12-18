

const searchFile = async function(){
    let title = document.getElementById('searchBar').value
    console.log('title', title);
    await fetch('/api/search?title='+title,{method:'get'})
    .then(res => res.json())
    .then(res => {
        template = ''

        res.forEach(item => {
            template += `
            <div class="resultRow">
                <div>
                    <div>${item.firstname} ${item.lastname}</div>
                    <strong> <div>${item.title}</div> </strong>
                </div> 
                <div style="flex-grow: 1;"></div>
                <button type="button" 
                class="btn btn-primary btn-sm"
                onclick="loadDocument('/api/file?id='+'${item.id}')"
                >View</button>    
            </div>
            `
        
        })
        console.log('res: ',res.length);
        if(res.length == 0){template = '<h6>Nothing found </h6>'}

        document.getElementById('results').innerHTML = template

    })
    .catch(err => {console.error(err);})
}

document.getElementById('searchBtn').addEventListener('click',searchFile)

//show the file with an id link
const showFile = function(id){

}



const uploadFile = async function(e){
    e.preventDefault()
    let formData = new FormData()
    let fname = document.getElementById('firstname').value
    let lname = document.getElementById('lastname').value
    let title = document.getElementById('dtitle').value
    let file = document.getElementById('file').files[0]

    if(!fname && !lname && !title && !file){
        //throw error
        return;
    }
    formData.append('firstname',fname)
    formData.append('lastname',lname)
    formData.append('title',title)
    formData.append('file',file)

    await fetch('/api/file',{method:'POST',body: formData})
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err))

    showTab()
}

document.getElementById('upload').addEventListener('click', uploadFile)