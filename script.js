// Seleciona os elementos necessários
const copyButtons = document.querySelectorAll('.copyButton');
const editTab = document.getElementById('editTab');
const editPanel = document.getElementById('editPanel');
const editOptions = document.querySelectorAll('.editOption');
const fraseEdit = document.getElementById('fraseEdit');
const saveEditButton = document.getElementById('saveEdit');
const message = document.getElementById('message');

let selectedFrase = ''; // Variável para armazenar a frase selecionada para edição

// Função para copiar a frase
copyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const frase = button.getAttribute('data-frase');
        navigator.clipboard.writeText(frase)
            .then(() => {
                message.innerText = `Frase copiada: "${frase}"`;
            })
            .catch(err => {
                console.error('Erro ao copiar: ', err);
            });
    });
});

// Função para alternar a aba de edição
editTab.addEventListener('click', () => {
    editPanel.classList.toggle('active');
    // Alterna a exibição da aba de edição
    if (editPanel.classList.contains('active')) {
        editPanel.style.display = 'block'; // Mostra o painel
    } else {
        editPanel.style.display = 'none'; // Esconde o painel
        fraseEdit.value = ''; // Limpa o campo ao esconder
    }
});

// Função para editar a frase selecionada
editOptions.forEach(option => {
    option.addEventListener('click', () => {
        selectedFrase = option.getAttribute('data-frase'); // Armazena a frase selecionada
        fraseEdit.value = selectedFrase; // Preenche o campo de edição
        document.getElementById('editInput').style.display = 'block'; // Mostra o campo de edição
    });
});

// Função para salvar a edição
saveEditButton.addEventListener('click', () => {
    const newFrase = fraseEdit.value.trim();
    if (newFrase === '') {
        message.innerText = 'Por favor, insira uma nova frase.';
        return;
    }

    // Atualiza a frase copiada dos botões
    copyButtons.forEach(button => {
        if (button.getAttribute('data-frase') === selectedFrase) {
            button.setAttribute('data-frase', newFrase); // Atualiza a frase do botão
        }
    });

    // Limpa o campo de entrada
    fraseEdit.value = '';
    document.getElementById('editInput').style.display = 'none'; // Esconde o campo de edição
    message.innerText = 'Frase editada com sucesso!'; // Mensagem de sucesso
});
