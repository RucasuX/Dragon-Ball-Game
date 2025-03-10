// Inicializa o Telegram WebApp
Telegram.WebApp.ready();
console.log('Telegram.WebApp:', Telegram.WebApp);
console.log('Dados do usuário:', Telegram.WebApp.initDataUnsafe.user);

// Captura os dados do usuário
const userData = Telegram.WebApp.initDataUnsafe.user;
console.log('Dados do usuário:', userData);

// Verifica se os dados do jogador já existem no CloudStorage do Telegram
Telegram.WebApp.CloudStorage.getItem('gameData', function(err, data) {
    if (data) {
        const gameData = JSON.parse(data);
        if (gameData.player && gameData.player.selectedCharacter) {
            console.log('Jogador já escolheu um personagem. Redirecionando para main.html');
            window.location.href = 'main.html';
        }
    }
});

// Lista de personagens disponíveis
const characters = [
    { title: "Goku", image: "imagens/1goku_1.png" },
    { title: "Gohan", image: "imagens/1gohan_1.png" },
    { title: "Vegeta", image: "imagens/1vegeta_1.png" },
    { title: "Trunks", image: "imagens/1trunks_1.png" }
];

let currentCharacterIndex = 0;
const characterImage = document.querySelector('.character-image');
const characterName = document.querySelector('.character-name');

// Função para atualizar o personagem exibido com animação
function updateCharacter(direction) {
    // Aplica a animação de saída
    if (direction === 'left') {
        characterImage.classList.add('slide-out-left');
    } else if (direction === 'right') {
        characterImage.classList.add('slide-out-right');
    }

    // Espera a animação de saída terminar antes de trocar o personagem
    setTimeout(() => {
        // Remove as classes de animação de saída
        characterImage.classList.remove('slide-out-left', 'slide-out-right');

        // Atualiza o personagem
        const character = characters[currentCharacterIndex];
        characterName.textContent = character.title;
        characterImage.src = character.image;

        // Aplica a animação de entrada
        if (direction === 'left') {
            characterImage.classList.add('slide-in-right');
        } else if (direction === 'right') {
            characterImage.classList.add('slide-in-left');
        }

        // Remove a animação de entrada após terminar
        setTimeout(() => {
            characterImage.classList.remove('slide-in-left', 'slide-in-right');
        }, 300); // Duração da animação de entrada
    }, 300); // Duração da animação de saída
}

// Evento para o botão de navegação à esquerda
document.querySelector('.side-button.left').addEventListener('click', () => {
    currentCharacterIndex = (currentCharacterIndex - 1 + characters.length) % characters.length;
    updateCharacter('left');
});

// Evento para o botão de navegação à direita
document.querySelector('.side-button.right').addEventListener('click', () => {
    currentCharacterIndex = (currentCharacterIndex + 1) % characters.length;
    updateCharacter('right');
});

// Evento para o botão de seleção de personagem
document.querySelector('.select-button').addEventListener('click', () => {
    const selectedCharacter = characters[currentCharacterIndex].title;
    const selectedCharacterImage = characters[currentCharacterIndex].image;

    // Cria o objeto com os dados do jogador
    const playerData = {
        selectedCharacter: selectedCharacter,
        selectedCharacterImage: selectedCharacterImage,
        playerName: userData ? userData.first_name : 'Jogador',
        playerPhoto: userData ? userData.photo_url : 'imagens/default_profile.png',
        level: 1,
        dragonCoins: 0,
        energy: 0,
        maxEnergy: 60,
        specialAttackUses: 5,
        maxSpecialAttackUses: 5,
        lastSpecialAttackUse: 0,
        upgradeAttackCost: 100,
        upgradeSpecialCost: 100,
        upgradeEnergyCost: 50,
        power: 0,
        rank: 0,
        lastUpdate: Date.now()
    };

    // Dados iniciais do inimigo (valores padrão)
    const enemyData = {
        currentEnemyIndex: 0, // Índice do primeiro inimigo
        currentEnemyHealth: 1000, // Vida inicial
        currentEnemyMaxHealth: 1000, // Vida máxima inicial
        currentEnemyImage: "imagens/raditz.png", // Imagem inicial
        currentEnemyBackground: "imagens/1_bg.jpg" // Fundo inicial
    };

    // Cria o objeto gameData unificado
    const gameData = {
        player: playerData,
        enemy: enemyData
    };

    // Mostrar um spinner ou mensagem de carregamento
    showLoadingIndicator();

    // Salva os dados no CloudStorage do Telegram
    Telegram.WebApp.CloudStorage.setItem('gameData', JSON.stringify(gameData), function(err) {
        if (err) {
            console.error('Erro ao salvar os dados:', err);
            showError('Erro ao salvar os dados. Tente novamente.');
        } else {
            console.log('Dados salvos com sucesso:', gameData);
            window.location.href = 'main.html';
        }
    });
});

// Função para mostrar um indicador de carregamento
function showLoadingIndicator() {
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.textContent = 'Salvando dados...';
    document.body.appendChild(loadingIndicator);
}

// Função para mostrar uma mensagem de erro
function showError(message) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    document.body.appendChild(errorMessage);

    // Remove a mensagem de erro após alguns segundos
    setTimeout(() => {
        errorMessage.remove();
    }, 5000);
}