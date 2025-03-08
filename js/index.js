const characters = [
    { title: "Goku", image: "imagens/1goku_1.png" },
    { title: "Gohan", image: "imagens/1gohan_1.png" },
    { title: "Vegeta", image: "imagens/1vegeta_1.png" },
    { title: "Trunks", image: "imagens/1trunks_1.png" }
];

let currentCharacterIndex = 0;
const characterImage = document.querySelector('.character-image');
const characterName = document.querySelector('.character-name');

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

document.querySelector('.side-button.left').addEventListener('click', () => {
    currentCharacterIndex = (currentCharacterIndex - 1 + characters.length) % characters.length;
    updateCharacter('left');
});

document.querySelector('.side-button.right').addEventListener('click', () => {
    currentCharacterIndex = (currentCharacterIndex + 1) % characters.length;
    updateCharacter('right');

});

// No arquivo da tela de seleção de personagens
document.querySelector('.select-button').addEventListener('click', () => {
    const selectedCharacter = characters[currentCharacterIndex].title;
    
    const playerData = {
        selectedCharacter: selectedCharacter,
        level: 1,
        dragonCoins: 0,
        //... outros campos necessários
    };

    console.log('Dados salvos:', playerData); // Depuração
    localStorage.setItem('playerProgress', JSON.stringify(playerData));
    window.location.href = 'main.html';
});