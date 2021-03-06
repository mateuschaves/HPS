const VIA_CEP_URL = 'https://viacep.com.br/ws';
const API_URL = 'http://localhost:3000';


const submitButton = document.getElementById("button-submit");
submitButton.onclick = function(e) {
	e.preventDefault();
    handleFormSubmit();
}

async function getAddressFromCep(cep) {
    try {
        return (await fetch(`${VIA_CEP_URL}/${cep}/json`)).json();
    } catch (error) {
        throw error;
    }
}

async function onCepChange(e) {
    if (e.length === 8) {
        const {logradouro, bairro, localidade, uf} = await getAddressFromCep(e);
        document.getElementById('street').value = logradouro;
        document.getElementById('city').value = localidade;
        document.getElementById('uf').value = uf;
        document.getElementById('neighborhood').value = bairro;
    } else {
        return {};
    }
}

async function listBuildings() {
    try {
        return (await fetch(`${API_URL}/buildings`)).json();
    } catch (error) {
        throw error;        
    }
}

async function createBuilding({
    building,
    owner,
    contact,
    description,
    cep,
    street,
    city,
    uf,
    neighborhood,
    number,
    reference_point,
    price,
}) {
    try {
        return (await fetch(`${API_URL}/buildings`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                building,
                owner,
                contact,
                description,
                cep,
                street,
                city,
                uf,
                neighborhood,
                number,
                reference_point,
                price,
            })
        }))
    } catch (error) {
        throw error;
    }
}

async function handleFormSubmit() {
    const building = document.getElementById('building').value;
    const owner = document.getElementById('owner').value;
    const contact = document.getElementById('contact').value;
    const description = document.getElementById('description').value;
    const street = document.getElementById('street').value;
    const cep = document.getElementById('cep').value;
    const city = document.getElementById('city').value;
    const uf = document.getElementById('uf').value;
    const neighborhood = document.getElementById('neighborhood').value;
    const number = document.getElementById('number').value;
    const reference_point = document.getElementById('reference_point').value;
    const price = document.getElementById('price').value;

    const isValidForm = validateFormValues({
        building,
        owner,
        contact,
        description,
        cep,
        uf,
        street,
        city,
        uf,
        neighborhood,
        number,
        reference_point,
        price,
    });

    if (!isValidForm) return null;


    try {
        await createBuilding({
            building,
            owner,
            contact,
            description,
            cep,
            uf,
            street,
            city,
            uf,
            neighborhood,
            number,
            reference_point,
            price,
        });


        $.toast({
            heading: 'Im??vel cadastrado com sucesso',
            text: 'Parab??ns, seu im??vel foi anunciado',
            icon: 'success',
            loader: true,
            loaderBg: '#FFF',
            bgColor: '#228b22'
        });
    } catch (error) {
        $.toast({
            heading: 'Erro ao cadastrar im??vel',
            text: 'Revise as informa????es e tente novamente',
            icon: 'error',
            loader: true,
            loaderBg: '#FFF',
            bgColor: '#D95B0B'
        });
    }
}


function validateFormValues({
    building,
    owner,
    contact,
    description,
    cep,
    uf,
    street,
    city,
    neighborhood,
    number,
    reference_point,
    price,
}) {
    if (!String(building).trim())
        $.toast({
            heading: 'Preencha o nome do im??vel',
            text: 'Nome do im??vel ?? obrigat??rio',
            icon: 'error',
            loader: true,
            loaderBg: '#FFF',
            bgColor: '#D95B0B'
        });

    if (!String(owner).trim())
        $.toast({
            heading: 'Informe o nome do repons??vel pelo im??vel',
            text: 'O nome do respons??vel pelo im??vel ?? um campo obrigat??rio',
            icon: 'error',
            loader: true,
            loaderBg: '#FFF',
            bgColor: '#D95B0B'
        });

    if (!String(contact).trim())
        $.toast({
            heading: 'Informe o contato do respons??vel',
            text: 'O contato do respons??vel ?? um campo obrigat??rio',
            icon: 'error',
            loader: true,
            loaderBg: '#FFF',
            bgColor: '#D95B0B'
        });

    if (!String(description).trim())
        $.toast({
            heading: 'Informe a descri????o do im??vel',
            text: 'A descri????o do im??vel ?? um campo obrigat??rio',
            icon: 'error',
            loader: true,
            loaderBg: '#FFF',
            bgColor: '#D95B0B'
        });

    if (!String(cep).trim())
        $.toast({
            heading: 'Informe o CEP do im??vel',
            text: 'O CEP do im??vel ?? um campo obrigat??rio',
            icon: 'error',
            loader: true,
            loaderBg: '#FFF',
            bgColor: '#D95B0B'
        });


    if (!String(street).trim())
        $.toast({
            heading: 'Informe a rua do im??vel',
            text: 'A rua do im??vel ?? um campo obrigat??rio',
            icon: 'error',
            loader: true,
            loaderBg: '#FFF',
            bgColor: '#D95B0B'
        });


    if (!String(city).trim())
        $.toast({
            heading: 'Informe a cidade do im??vel',
            text: 'A cidade do im??vel ?? um campo obrigat??rio',
            icon: 'error',
            loader: true,
            loaderBg: '#FFF',
            bgColor: '#D95B0B'
        });

    if (!String(uf).trim())
        $.toast({
            heading: 'Preencha o nome do estado',
            text: 'Nome do estado ?? obrigat??rio',
            icon: 'error',
            loader: true,
            loaderBg: '#FFF',
            bgColor: '#D95B0B'
        });

    if (!String(neighborhood).trim())
            $.toast({
                heading: 'Preencha o nome do bairro',
                text: 'Nome do bairro ?? obrigat??rio',
                icon: 'error',
                loader: true,
                loaderBg: '#FFF',
                bgColor: '#D95B0B'
            });

    if (!String(number).trim())
            $.toast({
                heading: 'Preencha o n??mero do im??vel',
                text: 'N??mero ?? obrigat??rio',
                icon: 'error',
                loader: true,
                loaderBg: '#FFF',
                bgColor: '#D95B0B'
            });

    if (!String(reference_point).trim())
            $.toast({
                heading: 'Preencha o ponto de refer??ncia',
                text: 'Ponto de refer??ncia ?? obrigat??rio',
                icon: 'error',
                loader: true,
                loaderBg: '#FFF',
                bgColor: '#D95B0B'
            });

    if (!String(price).trim())
            $.toast({
                heading: 'Preencha o valor do aluguel',
                text: 'Informar o valor do aluguel ?? obrigat??rio',
                icon: 'error',
                loader: true,
                loaderBg: '#FFF',
                bgColor: '#D95B0B'
            });

    const isValidForm = [
        building,
        owner,
        contact,
        description,
        cep,
        street,
        city,
        uf,
        neighborhood,
        number,
        reference_point,
        price,
    ]
        .filter(field => !String(field).trim().length)
        .length === 0
    
    return isValidForm;
}

$(".form").submit(function(e){
    return false;
    e.preventDefault();
});

