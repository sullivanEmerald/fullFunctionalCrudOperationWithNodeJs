
const likeRapper  = document.querySelectorAll('.fa-thumbs-up')
const deleteRapper  = document.querySelectorAll('.fa-delete-left')

Array.from(deleteRapper).forEach((element) => {
    element.addEventListener('click', deleteOne)
})

Array.from(likeRapper).forEach((element) => {
    element.addEventListener('click', addLike)
})

async function addLike(){
    const sName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText
    const rlikes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('/addOneLike', {
            method: 'put',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                'stageNameS' : sName,
                'birthNameS' : bName,
                'likesS' : rlikes
            })
        })

        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(error){
        console.log(error)
    }
    
}


// DELETE BUTTON


async function deleteOne(){
    const sName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText

    try{

        const response = await fetch ('/deleteRapper', {
            method: 'delete',
            headers: {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                'stageNameS' : sName,
                'birthNameS' : bName,
            })

        })

        const data = await response.json()
        console.log(data)
        location.reload()
       
    }catch(error){
        console.log(error)
    }
}




