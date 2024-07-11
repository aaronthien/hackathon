document.addEventListener('DOMContentLoaded', () => {
    // const title = document.createElement('h1');
    // document.querySelector('body').appendChild(title);
    // make AJAX call here...

    //data is an object with keys: word, synonyms, and antonyms

    function syn () {
        const newP = document.createElement('p');
        newP.setAttribute('class', 'words');
        return document.getElementById('synonyms').appendChild(newP);
    }
    function ant () {
        const newP = document.createElement('p');
        newP.setAttribute('class', 'words');
        return document.getElementById('antonyms').appendChild(newP);
    }

    //creates the container for words
    function createContainer () {
        //creates container div element
        const container = document.createElement('div');
        document.querySelector('body').appendChild(container);
        container.setAttribute('id', 'container');

        //create synonym div element
        const synonyms = document.createElement('div');
        container.appendChild(synonyms);
        synonyms.setAttribute('id', 'synonyms');
        
        const eleS = document.createElement('h1');
        eleS.append('synonyms');
        synonyms.appendChild(eleS);  
        
        //create antonym div element
        const antonyms = document.createElement('div');
        container.appendChild(antonyms);
        antonyms.setAttribute('id', 'antonyms');

        const eleA = document.createElement('h1');
        eleA.append('antonyms');
        antonyms.appendChild(eleA); 
    }
    

    document.getElementById('input').addEventListener('keydown', (ele) => {
        if (ele.keyCode === 13 && document.getElementById('input').value.length > 0){
            //clear div
            //if theres a container that exists
            if (document.querySelector('body').contains(document.getElementById('container'))) {
                document.getElementById('container').remove();
            };
            //create synonyms and antonyms div
            createContainer();

            //get input
            const input = document.getElementById("input")
            const inputString = input.value;   

            //fetch words
            fetch(`https://api.api-ninjas.com/v1/thesaurus?word=${inputString}`, 
                {
                    method: 'GET',
                    headers: {'X-Api-Key': 'opLsbBcYoH1kzkTcT7NcGA==3IWL9lmvo3LChfrS'},
                })
                .then((data) => data.json())
                .then((data) => {
                    //data is an object with keys: word, synonyms, and antonyms
                    
                    // console.log(data);
                    for (let i = 0; i < data.synonyms.length; i++) {
                        syn().innerText = data.synonyms[i];
                    }
                    for (let i = 0; i < data.antonyms.length; i++) {
                        ant().innerText = data.antonyms[i];
                    }
            })    
        }
    });
});
