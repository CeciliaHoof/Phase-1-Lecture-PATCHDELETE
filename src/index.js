fetch("http://localhost:3000/characters")
    .then((resp) => resp.json())
    .then((data) => renderCharacters(data))

function renderCharacters(charArr) {

    const ul = document.querySelector('ul')

    ul.textContent = ""

    charArr.forEach((charObj) => {

        const li = document.createElement('li')

        const p = document.createElement('p')
        let name = charObj.name
        p.textContent = name
        p.style.color = '#7a2d96'

        const img = document.createElement('img')
        let imgURL = charObj.image
        img.src = imgURL
        img.style.margin = '5px'
        img.style.border = 'solid 2px #7a2d96'

        li.appendChild(p)
        li.appendChild(img)

        const form = document.createElement('form');
        const btn = document.createElement('button');
        const input = document.createElement('input');
        
        input.placeholder = "character name";
        input.name = "name";
        btn.textContent = "submit!"

        form.append(input, btn);

        form.addEventListener('submit', e => handleUpdateChar(e))
        
        function handleUpdateChar(e){
            e.preventDefault();
            
            let newCharNameObj = {
                name : e.target.name.value
            }
            
            fetch(`http://localhost:3000/characters/${charObj.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify(newCharNameObj)
            })
                .then(resp => resp.json())
                .then((newCharObj) => renderCharacters(charArr.map((eachCharObj) => eachCharObj.id == charObj.id ? newCharObj : eachCharObj)))
                // .then(newCharNameObj => {
                //     const newCharrArr = charArr.map((eachCharObj) => {
                //         if(eachCharObj.id == charObj.id){
                //             return newCharNameObj;
                //         }
                //         else{
                //             return eachCharObj;
                //         }
                //     })
                //     renderCharacters(newCharrArr);
                // })
        }
        li.appendChild(form);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "delete!";
        
        deleteBtn.addEventListener('click', handleCharDelete)

        function handleCharDelete(){
            fetch(`http://localhost:3000/characters/${charObj.id}`, {
                method: "DELETE"
            })
                .then(resp => resp.json())
                .then(() => renderCharacters(charArr.filter((eachCharObj) => eachCharObj.id == charObj.id ? false : true)))
                    // const newCharArr = charArr.filter((eachCharObj) => {
                    //     if (eachCharObj.id == charObj.id){
                    //         return false
                    //     }
                    //     else {return true}
                    // })
                    // renderCharacters(newCharArr)
                //})
        }

        li.appendChild(deleteBtn);

        ul.append(li)
    })
}