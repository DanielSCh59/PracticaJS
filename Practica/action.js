const changePokeImg = (url) =>{
    const pokeIm = document.getElementById("pokeImagen");
   pokeIm.src = url;
}
const fetchPokemon = () => {
    const pokeNm = document.getElementById("pokeName");
    let inputPokeNm = pokeNm.value.toLowerCase();

    const url = `https://pokeapi.co/api/v2/pokemon/${inputPokeNm}`;
    fetch(url).then((res) =>{
        console.log(res);
        if(res.status != "200"){
            console.log(res);
            changePokeImg("./pokeDefault.png");
        }else{
            return res.json();
        }
    }).then((data) => {
        console.log(data);
        let pokeImg = data.sprites.front_default;
        let arregloHabilidades= data.abilities;
        let name= data.name;
        let stats= data.stats;

        changePokeImg(pokeImg);
        asignarNombre(name);
        getStats(stats);
        asignarHabilidades(arregloHabilidades);

    })
}

const busquedaTipo = () =>{
    const itemSelected = document.getElementById("casesSelect");
    let valueSelected = itemSelected.value;

    const url = `https://pokeapi.co/api/v2/type/${valueSelected}`;

    fetch(url).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        createTable(data);
    })
}

const asignarNombre = (nm) => {
    const pr=document.getElementById("nombreTxt");
    pr.innerHTML=nm;
}

const createTable = (array) =>{

    let longArr=array.pokemon.length;
    const spaceTb= document.getElementById("sectionTb");
    let tableMain = document.createElement("table");
    let tbBody = document.createElement("tbody");
    let thead = document.createElement("thead");
    

    let row_1 = document.createElement('tr');
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "#";
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = "Tipo";
    let heading_3 = document.createElement('th');
    heading_3.innerHTML = "Nombre";

    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    thead.appendChild(row_1);

    if(array.pokemon && Array.isArray(array.pokemon)){
        for(let i=0; i<20; i++){
            const id = i;
            const type=array.name;
            const nameP=array.pokemon[i].pokemon.name;

            let newRow= document.createElement('tr');
            let row_2_data_1 = document.createElement('td');
            row_2_data_1.innerHTML ="    " +(id+1);
            let row_2_data_2 = document.createElement('td');
            row_2_data_2.innerHTML ="     " +type;
            let row_2_data_3 = document.createElement('td');
            row_2_data_3.innerHTML = "       "+nameP;

            newRow.appendChild(row_2_data_1);
            newRow.appendChild(row_2_data_2);
            newRow.appendChild(row_2_data_3);
            tbBody.appendChild(newRow);
            
        }
    }
    tableMain.appendChild(thead);
    tableMain.appendChild(tbBody);
    spaceTb.appendChild(tableMain);

}

const crearOlsHabilidades = (elemts) => {

    let olIn= document.createElement("ol");
    let tamano=elemts.length;
    if(elemts && Array.isArray(elemts)){
        for(let i=0; i<tamano; i++){
            const element= elemts[i].ability.name;
            let li = document.createElement("li");
            let liText = document.createTextNode(element);
            li.appendChild(liText);
            olIn.appendChild(li);
        }
    }
    return olIn;
}
const asignarHabilidades = (array) => {
    let miniA= crearOlsHabilidades(array);
    const olPrin= document.getElementById("txtHabilidades");
    olPrin.append(miniA);
}

const getStats = (array) => {
    let olPr=document.getElementById("txtStats");
    let ulDat=document.createElement("ul");
    let tmn=array.length;
    if(array && Array.isArray(array)){
        for(let i=0; i<tmn; i++){
            const nameSt= array[i].stat.name;
            const valorSt=array[i].base_stat;

            let li=document.createElement("li");
            let liTxt=document.createTextNode(`${nameSt} : ${valorSt}`);
            li.appendChild(liTxt);
            ulDat.appendChild(li);
        }
        olPr.appendChild(ulDat);
    }   
}

const recargo= () =>{
    window.location.reload();
}