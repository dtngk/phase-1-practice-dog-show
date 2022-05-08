document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('dog-form');
    let dogID = null;

    form.addEventListener('submit', (event) =>{
        event.preventDefault();

        const dogObj = {
            id: dogID,
            name: event.target[0].value,
            breed: event.target[1].value,
            sex: event.target[2].value,
        }
        
        if (dogID !== null){
            postDog(dogObj);
            event.target[0].value = null;
            event.target[1].value = null;
            event.target[2].value = null;
        }
    })

    function allDogs(){
        fetch("http://localhost:3000/dogs")
        .then(function(reponse){
        //    console.log(reponse);
            return reponse.json();
        })
        .then(function (object){
            const dog = document.getElementById('table-body');
            for (let index = 0; index < object.length; index++){
                let newDog = document.createElement("tr");
                newDog.id = "dog";
                const dogName = document.createElement("th");
                const dogBreed = document.createElement("th");
                const dogSex = document.createElement("th");
                const btn = document.createElement("button");
                btn.textContent = 'Edit Dog';
                btn.addEventListener("click", (e) => editDog(e));
                btn.id = object[index].id

                dogName.innerHTML = object[index].name;
                dogBreed.innerHTML = object[index].breed;
                dogSex.innerHTML = object[index].sex;

                newDog.appendChild(dogName);
                newDog.appendChild(dogBreed);
                newDog.appendChild(dogSex);
                newDog.appendChild(btn);
                dog.appendChild(newDog);
            }
            //console.log(object);
        })
        .catch(function (error){
            const text = document.createElement("p");
            text.innerHTML = error;
            document.querySelector('body').appendChild(text);
        });
    }

    function editDog(dog){
        dogID = dog.target.id;
        form[0].value = dog.target.parentElement.childNodes[0].innerHTML;
        form[1].value = dog.target.parentElement.childNodes[1].innerHTML;
        form[2].value = dog.target.parentElement.childNodes[2].innerHTML;
    }

    function removeAllDogs(){
        const dog = document.querySelectorAll('#dog');

        for (let index = 0; index < dog.length; index++){
            dog[index].remove();   
        }
    }

    function postDog(dogObj){
        fetch(`http://localhost:3000/dogs/${dogObj.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(dogObj),
        })
        .then(reponse => reponse.json())
        .then(data =>{
            removeAllDogs();
            allDogs();
        });
    }
    allDogs(); 
})

