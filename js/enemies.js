// Verifica se os dados do jogador já existem no localStorage
const playerData = JSON.parse(localStorage.getItem('playerProgress'));
if (playerData && playerData.selectedCharacter) {
    console.log('Jogador já escolheu um personagem. Redirecionando para main.html');
    window.location.href = 'main.html';
}