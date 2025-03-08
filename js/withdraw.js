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

    // Lógica do botão de saque
const withdrawButton = document.getElementById('withdrawButton');
const amountInput = document.getElementById('amount');
const walletInput = document.getElementById('wallet');

if (withdrawButton && amountInput && walletInput) {
    withdrawButton.addEventListener('click', () => {
        // Verifica se o jogador está no nível 10
        if (player.level < 10) {
            showToast('Você precisa estar no nível 10 para sacar.');
            return; // Impede o saque se o nível for inferior a 10
        }

        const amount = parseFloat(amountInput.value);
        const wallet = walletInput.value;
        const saldo = parseFloat(localStorage.getItem('saldo')) || 0;

        if (isNaN(amount) || amount <= 0) {
            showToast('Digite um valor válido');
            return;
        }

        if (!wallet.match(/^[A-Za-z0-9]{44}$/)) {
            showToast('Wallet inválida');
            return;
        }

        if (amount > saldo) {
            showToast('Você não tem saldo suficiente');
            return;
        }

        // Atualiza o saldo e salva o progresso
        localStorage.setItem('saldo', saldo - amount);
        localStorage.setItem('ultimoSaque', JSON.stringify({ amount, wallet }));

        // Atualiza as moedas do jogador
        player.dragonCoins -= amount;
        updateDragonCoins();
        saveProgress();

        showToast('Saque realizado com sucesso!');
    });
}

    // Lógica do botão de copiar endereço
    const copyAddressButton = document.getElementById('copyAddressButton');
    const donationWallet = "SEU_ENDERECO_DE_CARTEIRA_AQUI"; // Substitua pelo endereço real

    if (copyAddressButton) {
        copyAddressButton.addEventListener('click', () => {
            navigator.clipboard.writeText(donationWallet)
                .then(() => {
                    showToast('Endereço copiado!');
                })
                .catch((err) => {
                    console.error('Erro ao copiar o endereço:', err);
                    showToast('Erro ao copiar o endereço');
                });
        });
    }

    // Carregar o progresso ao iniciar a página
    loadProgress();

    // Atualizar a energia a cada segundo
    setInterval(() => {
        if (player.energy < player.maxEnergy) {
            player.energy += 1;
            updateEnergy();
        }
    }, 1000);

    document.addEventListener('DOMContentLoaded', () => {
        const profilePicture = document.getElementById('profile-picture');
        console.log(profilePicture); // Verifique no console se o elemento é encontrado
    
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
});