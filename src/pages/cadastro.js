const VIA_CEP_URL = 'https://viacep.com.br/ws';

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
        document.getElementById('state').value = uf;
        document.getElementById('neighborhood').value = bairro;
    } else {
        return {};
    }
}

function onFurnetureChange(value) {
    if (value) {
        document.getElementById('furniture').textContent = value;
        document.getElementById('furniture').value = value;
    }
}