document.addEventListener('DOMContentLoaded', () => {
    const player = {
        baseDamage: 11500,
        level: 1,
        dragonCoins: 0,
        energy: 0,
        maxEnergy: 60,
        specialAttackUses: 1, // Cargas atuais
        maxSpecialAttackUses: 1, // Valor máximo de cargas (pode aumentar com upgrades)
        lastSpecialAttackUse: 0,
        upgradeAttackCost: 100,
        upgradeSpecialCost: 150,
        upgradeEnergyCost: 200,
        power: 0,
        rank: 0, // Adicionado o rank
        selectedCharacter: 'Gohan' // Valor padrão
    };

    // Carregar progresso salvo
    function loadProgress() {
        const savedProgress = JSON.parse(localStorage.getItem('playerProgress'));
        if (savedProgress) {
            // Atualiza o objeto player com os dados salvos
            Object.assign(player, savedProgress);
        } else {
            console.log('Nenhum progresso salvo encontrado. Usando valores padrão.');
        }

        // Atualiza a interface com os dados carregados
        updateDragonCoins();
        updateEnergy();
        updatePlayerName();
        updateHeader(); // Atualiza o power e o rank no header
    }

    // Atualizar Dragon Coins na interface
    function updateDragonCoins() {
        const dragonCoinsElement = document.getElementById('player-coins');
        if (dragonCoinsElement) dragonCoinsElement.textContent = player.dragonCoins;
    }

    // Atualizar Energia na interface
    function updateEnergy() {
        const energyElement = document.getElementById('player-energy');
        if (energyElement) energyElement.textContent = player.energy;
    }

    // Atualizar o header (power e rank)
    function updateHeader() {
        const powerElement = document.getElementById('player-power');
        const rankElement = document.getElementById('player-rank');
        
        if (powerElement) {
            powerElement.textContent = `Power ${player.power}`;
        }
        if (rankElement) {
            rankElement.textContent = `Rank ${player.rank}`;
        }
    }

    // Atualizar o nome do jogador
    function updatePlayerName() {
        const playerNameElement = document.getElementById('player-name');
        if (playerNameElement) {
            playerNameElement.textContent = player.selectedCharacter;
        }
    }

    // Função para exibir mensagens toast
    function showToast(message) {
        const toastContainer = document.getElementById('toastContainer');
        if (toastContainer) {
            const toast = document.createElement('div');
            toast.className = 'toast-message';
            toast.textContent = message;
            toastContainer.appendChild(toast);

            setTimeout(() => {
                toast.remove();
            }, 3000);
        }
    }

    // Função para carregar o ranking de jogadores
    async function carregarRanking() {
        try {
            // Simulação de dados da API (substitua pela sua chamada real à API)
            const response = await fetch('/ranking'); // Substitua pela URL da sua API
            const jogadores = await response.json();

            const container = document.querySelector('.leaderboard-container'); // Container principal

            jogadores.forEach(jogador => {
                // Cria o container do jogador
                const playerContainer = document.createElement('div');
                playerContainer.classList.add('player-container');

                // Adiciona a foto do jogador
                const fotoJogador = document.createElement('img');
                fotoJogador.src = jogador.foto_jogador;
                fotoJogador.classList.add('player-photo');
                playerContainer.appendChild(fotoJogador);

                // Adiciona a foto do personagem
                const fotoPersonagem = document.createElement('img');
                fotoPersonagem.src = jogador.foto_personagem;
                fotoPersonagem.classList.add('player-photo');
                playerContainer.appendChild(fotoPersonagem);

                // Adiciona as informações do jogador
                const infoGrid = document.createElement('div');
                infoGrid.classList.add('player-info-grid');

                const nome = document.createElement('p');
                nome.textContent = jogador.nome;
                nome.classList.add('player-text', 'container-name');
                infoGrid.appendChild(nome);

                const level = document.createElement('p');
                level.textContent = `Level: ${jogador.level}`;
                level.classList.add('player-text', 'container-level');
                infoGrid.appendChild(level);

                const power = document.createElement('p');
                power.textContent = `Power: ${jogador.power}`;
                power.classList.add('player-text', 'container-power');
                infoGrid.appendChild(power);

                const rank = document.createElement('p');
                rank.textContent = `Rank: ${jogador.rank}`;
                rank.classList.add('player-text', 'container-rank');
                infoGrid.appendChild(rank);

                playerContainer.appendChild(infoGrid);
                container.appendChild(playerContainer);
            });
        } catch (error) {
            console.error('Erro ao carregar ranking:', error);
        }
    }

    // Carregar o progresso ao iniciar a página
    loadProgress();

    // Carregar o ranking ao iniciar a página
    carregarRanking();

    // Atualizar a energia a cada segundo
    setInterval(() => {
        if (player.energy < player.maxEnergy) {
            player.energy += 1;
            updateEnergy();
        }
    }, 1000);

    // Evento de clique na foto de perfil
    const profilePicture = document.getElementById('profile-picture');
    if (profilePicture) {
        profilePicture.addEventListener('click', () => {
            console.log('Perfil clicado!'); // Verifique se o evento de clique está sendo acionado
            profilePicture.style.animation = 'buttonClick 0.2s ease';

            setTimeout(() => {
                window.location.href = 'leaderboard.html';
            }, 200); // 200ms = duração da animação
        });
    }
});