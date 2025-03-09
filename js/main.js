Telegram.WebApp.ready();
console.log('Telegram.WebApp:', Telegram.WebApp);
console.log('Dados do usuário:', Telegram.WebApp.initDataUnsafe.user);

// Verifica se está rodando no Telegram
const isTelegram = typeof Telegram !== 'undefined' && Telegram.WebApp;

document.addEventListener('DOMContentLoaded', () => {
    const player = window.player || {
        baseDamage: 1,
        level: 1,
        dragonCoins: 0,
        energy: 0,
        maxEnergy: 60,
        specialAttackUses: 5, // Cargas atuais
        maxSpecialAttackUses: 5, // Valor máximo de cargas (pode aumentar com upgrades)
        lastSpecialAttackUse: 0,
        upgradeAttackCost: 100,
        upgradeSpecialCost: 100,
        upgradeEnergyCost: 50,
        power: 0,
        rank: 0,
        selectedCharacter: 'Gohan', // Valor padrão
        playerName: 'Jogador', // Nome padrão
        playerPhoto: 'imagens/default_profile.png' // Foto padrão
    };
   
    // Verifica se está rodando no Telegram
    const isTelegram = typeof Telegram !== 'undefined' && Telegram.WebApp;

    // Função para carregar os dados do jogador
    function loadPlayerData(callback) {
        if (isTelegram) {
            // Usa o CloudStorage do Telegram
            Telegram.WebApp.CloudStorage.getItem('playerProgress', function(err, data) {
                if (data) {
                    callback(JSON.parse(data));
                } else {
                    callback(null);
                }
            });
        } else {
            // Fallback para localStorage (apenas para testes fora do Telegram)
            const data = localStorage.getItem('playerProgress');
            callback(data ? JSON.parse(data) : null);
        }
    }

    // Carrega os dados do jogador
loadPlayerData(function(playerData) {
    if (playerData) {
        console.log('Dados do jogador carregados:', playerData);

        // Atualiza a foto e o nome do jogador
        const profilePicture = document.getElementById('profile-picture');
        const playerName = document.getElementById('player-name');

        if (profilePicture) {
            profilePicture.src = playerData.playerPhoto || 'imagens/default_profile.png';
        }
        if (playerName) {
            playerName.textContent = playerData.playerName || 'Jogador';
        }

        // Atualiza o personagem escolhido
        const characterImage = document.getElementById('characterImage');
        if (characterImage) {
            characterImage.src = playerData.selectedCharacterImage;
        }

        // Atualiza outros dados do jogador
        Object.assign(player, playerData);
    } else {
        console.log('Nenhum dado salvo encontrado. Iniciando com valores padrão.');
    }
});

    const punchSound = new Audio('sounds/punch_1.ogg');
    const specialAttackSound = new Audio('sounds/special_attack.mp3');
    const explosionSound = new Audio('sounds/explosion.ogg');

    const personagens = {
        Gohan: {
            images: [
                "imagens/gohan_1.png", // Níveis 1-9
                "imagens/gohan_2.png", // Níveis 10-19
                "imagens/gohan_3.png", // Níveis 20-29
                "imagens/gohan_4.png", // Níveis 30-39
                "imagens/gohan_5.png", // Níveis 40-49
                "imagens/gohan_6.png", // Níveis 50-59
                "imagens/gohan_7.png", // Níveis 60-69
                "imagens/gohan_8.png"  // Níveis 70+
            ],
            names: [
                "Gohan",       // Níveis 1-9
                "Gohan SSJ", // Níveis 10-19
                "Gohan SSJ2",      // Níveis 20-29
                "Gohan SSJ3",     // Níveis 30-39
                "Gohan Mystik",     // Níveis 40-49
                "Gohan SSJ4",    // Níveis 50-59
                "Gohan SSJG",       // Níveis 60-69
                "Gohan Beast"       // Níveis 70+
            ]
        },
        Vegeta: {
            images: [
                "imagens/vegeta_1.png", // Níveis 1-9 
                "imagens/vegeta_2.png", // Níveis 10-19 
                "imagens/vegeta_3.png", // Níveis 20-29 
                "imagens/vegeta_4.png", // Níveis 30-39 
                "imagens/vegeta_5.png", // Níveis 40-49 
                "imagens/vegeta_6.png", // Níveis 50-59 
                "imagens/vegeta_7.png", // Níveis 60-69
                "imagens/vegeta_8.png"  // Níveis 70+ 
            ],
            names: [
                "Vegeta",      // Níveis 1-9
                "Vegeta SSJ",  // Níveis 10-19
                "Vegeta SSJ2", // Níveis 20-29
                "Vegeta SSJ3", // Níveis 30-39
                "Vegeta SSJ4", // Níveis 40-49
                "Vegeta SSJG", // Níveis 50-59
                "Vegeta SSJB", // Níveis 60-69
                "Vegeta Ultra Ego"  // Níveis 70+
            ]
        },
        Goku: {
            images: [
                "imagens/goku_1.png", // Níveis 1-9
                "imagens/goku_2.png", // Níveis 10-19
                "imagens/goku_3.png", // Níveis 20-29
                "imagens/goku_4.png", // Níveis 30-39
                "imagens/goku_5.png", // Níveis 40-49
                "imagens/goku_6.png", // Níveis 50-59
                "imagens/goku_7.png", // Níveis 60-69
                "imagens/goku_8.png"  // Níveis 70+
            ],
            names: [
                "Goku",      // Níveis 1-9
                "Goku SSJ",  // Níveis 10-19
                "Goku SSJ2", // Níveis 20-29
                "Goku SSJ3", // Níveis 30-39
                "Goku SSJ4", // Níveis 40-49
                "Goku SSJG", // Níveis 50-59
                "Goku SSJB", // Níveis 60-69
                "Goku Ultra Instinct" // Níveis 70+
            ]
        },
        Trunks: {
            images: [
                "imagens/trunks_1.png", // Níveis 1-9
                "imagens/trunks_2.png", // Níveis 10-19
                "imagens/trunks_3.png", // Níveis 20-29
                "imagens/trunks_4.png", // Níveis 30-39
                "imagens/trunks_5.png", // Níveis 40-49
                "imagens/trunks_6.png", // Níveis 50-59
                "imagens/trunks_7.png",  // Níveis 60-69
                "imagens/trunks_8.png"  // Níveis 70+
            ],
            names: [
                "Trunks", // Níveis 1-9
                "Trunks SSJ", // Níveis 10-19
                "Trunks SSJ2", // Níveis 20-29
                "Trunks SSJ3", // Níveis 30-39
                "Trunks SSJ4", // Níveis 40-49
                "Trunks SSJG", // Níveis 50-59
                "Trunks SSJB", // Níveis 60-69
                "Trunks SSJR" // Níveis 70+
            ]
        }
    };

    const enemy = {
        health: 1000,
        maxHealth: 1000
    };

    const enemies = [
            // Saga Saiyajin
            {
                name: "Raditz",
                image: "imagens/raditz.png",
                health: 1000,
                maxHealth: 1000,
                background: "imagens/1_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Saibaiman",
                image: "imagens/saibaman.png",
                health: 1200,
                maxHealth: 1200,
                background: "imagens/2_bg.jpg",
                levelsGained: 1
            },
    ];

    let currentEnemyIndex = 0;

    function loadProgress() {
        const defaultData = {
            selectedCharacter: 'Gohan',
            baseDamage: 1,
            level: 1,
            dragonCoins: 0,
            energy: 0,
            maxEnergy: 60,
            specialAttackUses: 1,
            maxSpecialAttackUses: 1,
            lastSpecialAttackUse: 0,
            upgradeAttackCost: 1000,
            upgradeSpecialCost: 1000,
            upgradeEnergyCost: 500,
            power: 0,
            rank: 0,
            lastUpdate: Date.now()
        };
    
        try {
            const savedData = JSON.parse(localStorage.getItem('playerProgress')) || {};
            Object.assign(player, defaultData, savedData);
            
            // Calcular energia acumulada durante o tempo offline
            const currentTime = Date.now();
            const elapsedSeconds = Math.floor((currentTime - player.lastUpdate) / 1000);
            
            // Calcular energia máxima que pode ser adicionada
            const maxPossibleEnergy = player.maxEnergy - player.energy;
            const energyToAdd = Math.min(elapsedSeconds, maxPossibleEnergy);
            
            player.energy += energyToAdd;
            player.lastUpdate = currentTime; // Atualiza para o momento atual
    
            console.log('Progresso carregado:', player);
        } catch (error) {
            console.error('Erro ao carregar progresso:', error);
            Object.assign(player, defaultData);
        }
    
        // Atualiza a interface
        updateDragonCoins();
        updateEnergy();
        updateUpgradeCosts();
        updatePlayerName();
        updatePlayerLevel();
        updatePlayerPower();
    }
       
    function saveProgress() {
        const saveData = {
            selectedCharacter: player.selectedCharacter,
            baseDamage: player.baseDamage,
            level: player.level,
            dragonCoins: player.dragonCoins,
            energy: player.energy,
            maxEnergy: player.maxEnergy,
            specialAttackUses: player.specialAttackUses,
            maxSpecialAttackUses: player.maxSpecialAttackUses,
            lastSpecialAttackUse: player.lastSpecialAttackUse,
            upgradeAttackCost: player.upgradeAttackCost,
            upgradeSpecialCost: player.upgradeSpecialCost,
            upgradeEnergyCost: player.upgradeEnergyCost,
            power: player.power,
            rank: player.rank,
            lastUpdate: Date.now()
        };
    
        // Verifica se está rodando no Telegram
        const isTelegram = typeof Telegram !== 'undefined' && Telegram.WebApp;
    
        if (isTelegram) {
            // Salva no CloudStorage do Telegram
            Telegram.WebApp.CloudStorage.setItem('playerProgress', JSON.stringify(saveData), function(err) {
                if (err) {
                    console.error('Erro ao salvar os dados:', err);
                } else {
                    console.log('Dados salvos com sucesso no Telegram:', saveData);
                }
            });
        } else {
            // Fallback para localStorage (apenas para testes fora do Telegram)
            localStorage.setItem('playerProgress', JSON.stringify(saveData));
            console.log('Dados salvos com sucesso no localStorage:', saveData);
        }
    }
    
    // Substitua o intervalo de energia por este código
    let lastEnergyUpdate = Date.now(); // Armazena o momento da última atualização

    function updateEnergyOverTime() {
        if (player.energy < player.maxEnergy) {
            player.energy += 1; // Adiciona 1 ponto de energia
            updateEnergy(); // Atualiza a interface
            saveProgress(); // Salva o progresso
        }
    }
        
    // Adicione este listener para salvar ao fechar a janela
    window.addEventListener('beforeunload', () => {
        saveProgress();
    });

    function saveEnemyState() {
        const enemyState = {
            currentEnemyIndex: currentEnemyIndex, // Salva o índice atual
            currentEnemyHealth: enemy.health,
            currentEnemyMaxHealth: enemy.maxHealth
        };
        localStorage.setItem('enemyState', JSON.stringify(enemyState));
        console.log('Estado do inimigo salvo:', enemyState);
    }

    function loadEnemyState() {
        const enemyState = JSON.parse(localStorage.getItem('enemyState'));
        if (enemyState) {
            currentEnemyIndex = enemyState.currentEnemyIndex;
            enemy.health = enemyState.currentEnemyHealth;
            enemy.maxHealth = enemyState.currentEnemyMaxHealth;
            console.log('Estado do inimigo carregado:', enemyState); // Log para depuração
        } else {
            currentEnemyIndex = 0;
            enemy.health = enemies[currentEnemyIndex].health;
            enemy.maxHealth = enemies[currentEnemyIndex].maxHealth;
            console.log('Nenhum estado salvo. Iniciando com o primeiro inimigo.'); // Log para depuração
        }
    }

    // Atualizar Dragon Coins na interface
    function updateDragonCoins() {
        const dragonCoinsElement = document.getElementById('player-coins');
        const upgradeDragonCoinsElement = document.getElementById('upgrade-player-coins');
        if (dragonCoinsElement) dragonCoinsElement.textContent = player.dragonCoins;
        if (upgradeDragonCoinsElement) upgradeDragonCoinsElement.textContent = player.dragonCoins;
    }

    // Atualizar Energia na interface
    function updateEnergy() {
        const energyElement = document.getElementById('player-energy');
        if (energyElement) energyElement.textContent = player.energy;
    }

    function updateHeader() {
        const powerElement = document.getElementById('player-power');
        if (powerElement) {
          powerElement.textContent = `Power ${player.power}`;
        }
    }

    function updateCharacterImage() {
        const characterImageElement = document.getElementById('characterImage');
        const playerNameElement = document.getElementById('player-name'); // Elemento do nome no header
        const upgradePlayerNameElement = document.getElementById('upgrade-player-name'); // Elemento do nome no modal
    
        if (characterImageElement && playerNameElement && upgradePlayerNameElement) {
            const character = player.selectedCharacter || 'Gohan';
            const characterData = personagens[character];
    
            if (!characterData) {
                console.error('Personagem não encontrado:', character);
                return;
            }
    
            // Cálculo do tier com base no nível
            const maxTier = characterData.images.length - 1;
            const currentTier = Math.floor((player.level - 1) / 10);
            const imageIndex = Math.min(currentTier, maxTier);
    
            // Atualiza a imagem
            const imagePath = characterData.images[imageIndex] || characterData.images[0];
            characterImageElement.src = imagePath;
    
            // Atualiza o nome
            const characterName = characterData.names[imageIndex] || characterData.names[0];
            playerNameElement.textContent = characterName; // Atualiza o nome no header
            upgradePlayerNameElement.textContent = characterName; // Atualiza o nome no modal
    
            console.log('Imagem e nome atualizados:', {
                personagem: character,
                nível: player.level,
                tier: imageIndex + 1,
                imagem: imagePath,
                nome: characterName
            });
        }
    }

    function updatePlayerLevel() {
        const playerLevelElement = document.getElementById('upgrade-player-level');
        if (playerLevelElement) {
            playerLevelElement.textContent = `Level: ${player.level}`; // Atualiza o texto com o nível atual
        }
    }

    function updatePlayerName() {
        const playerNameElement = document.getElementById('player-name'); // Elemento do nome no header
        if (playerNameElement) {
            // Exibe o nome do jogador, não o nome do personagem
            playerNameElement.textContent = player.playerName || 'Jogador';
        }
    }

    function updatePlayerPower() {
        const playerPowerElement = document.getElementById('player-power'); // Cabeçalho
        const upgradePlayerPowerElement = document.getElementById('upgrade-player-power'); // Modal
    
        if (playerPowerElement) {
            playerPowerElement.textContent = `Power ${player.power}`; // Atualiza o cabeçalho
        }
        if (upgradePlayerPowerElement) {
            upgradePlayerPowerElement.textContent = `Poder: ${player.power}`; // Atualiza o modal
        }
    }

    // Atualizar os custos dos upgrades na interface
    function updateUpgradeCosts() {
        const upgradeAttackCostElement = document.getElementById('upgrade-attack-cost');
        const upgradeSpecialCostElement = document.getElementById('upgrade-special-cost');
        const upgradeEnergyCostElement = document.getElementById('upgrade-energy-cost');
        if (upgradeAttackCostElement) upgradeAttackCostElement.textContent = player.upgradeAttackCost;
        if (upgradeSpecialCostElement) upgradeSpecialCostElement.textContent = player.upgradeSpecialCost;
        if (upgradeEnergyCostElement) upgradeEnergyCostElement.textContent = player.upgradeEnergyCost;
    }

    // Função para atualizar as informações de um jogador no ranking
    function updateRankingPlayer(playerData) {
        const rankingNameElement = document.getElementById('ranking-player-name');
        const rankingLevelElement = document.getElementById('ranking-player-level');
        const rankingPowerElement = document.getElementById('ranking-player-power');
        const rankingRankElement = document.getElementById('ranking-player-rank');

        if (rankingNameElement) rankingNameElement.textContent = playerData.name;
        if (rankingLevelElement) rankingLevelElement.textContent = `Level: ${playerData.level}`;
        if (rankingPowerElement) rankingPowerElement.textContent = `Power: ${playerData.power}`;
        if (rankingRankElement) rankingRankElement.textContent = `Rank: ${playerData.rank}`;
    }

    // Exemplo de uso
    const rankingPlayer = {
        name: "JogadorRanking10000",
        level: 150,
        power: 50000,
        rank: 2
    };

updateRankingPlayer(rankingPlayer);

    // Gerar energia a cada segundo
    setInterval(() => {
        if (player.energy < player.maxEnergy) {
            player.energy += 1;
            updateEnergy();
        }
    }, 1000);

    function calculateDamage() {
        return player.baseDamage; // Retorna apenas o dano base
    }

    // Atualizar barra de vida do inimigo
    function updateHealthBar() {
        const healthBar = document.getElementById('healthBar');
        const healthText = document.getElementById('healthText');
    
        // Garante que a vida não seja negativa
        enemy.health = Math.max(0, enemy.health);
    
        // Calcula a porcentagem de vida
        const healthPercent = (enemy.health / enemy.maxHealth) * 100;
    
        // Atualiza a largura da barra de vida
        if (healthBar) {
            healthBar.style.width = `${healthPercent}%`;
            healthBar.style.transition = 'width 0.3s ease'; // Adiciona transição suave
        }
    
        // Atualiza o texto da vida
        if (healthText) {
            healthText.textContent = `${enemy.health} / ${enemy.maxHealth}`;
        }
    
        // Define a cor da barra de vida com base na porcentagem
        if (healthBar) {
            healthBar.style.background = getHealthBarColor(healthPercent);
        }
    }
    
    // Função auxiliar para determinar a cor da barra de vida
    function getHealthBarColor(healthPercent) {
        if (healthPercent > 50) {
            return 'linear-gradient(to right, #7ED957, #5CA936)'; // Verde
        } else if (healthPercent > 10) {
            return 'linear-gradient(to right, #FFD700, #FFA500)'; // Amarelo/Laranja
        } else {
            return 'linear-gradient(to right, #FF4500, #8B0000)'; // Vermelho
        }
    }

    // Mostrar número de dano flutuante
    function showDamageNumber(damage, x, y, isSpecialAttack = false) {
        const damageNumber = document.getElementById('damageNumber');
        if (damageNumber) {
            damageNumber.textContent = `-${damage}`;
            damageNumber.style.left = `${x}px`;
            damageNumber.style.top = `${y}px`;
            damageNumber.style.display = 'block';
    
            // Animação de subida do número de dano
            damageNumber.style.transition = 'top 1s ease-out, opacity 1s ease-out';
            damageNumber.style.top = `${y - 100}px`; // Move o número para cima
            damageNumber.style.opacity = '0'; // Desaparece gradualmente
    
            // Toca o som de explosão apenas no ataque especial
            if (isSpecialAttack) {
                explosionSound.currentTime = 0; // Reinicia o som se já estiver tocando
                explosionSound.play();
            }
    
            // Esconde o número de dano após 1 segundo
            setTimeout(() => {
                damageNumber.style.display = 'none';
                damageNumber.style.top = `${y}px`; // Reseta a posição
                damageNumber.style.opacity = '1'; // Reseta a opacidade
            }, 1000);
        }
    }

    function nextEnemy() {
        // Verifica se é o último inimigo
        if (currentEnemyIndex >= enemies.length - 1) {
            console.log('Todos os inimigos foram derrotados!');
            currentEnemyIndex = 0; // Reinicia o loop
        } else {
            currentEnemyIndex += 1; // Avança para o próximo inimigo
        }

        // Atualiza os dados do inimigo atual
        const nextEnemy = enemies[currentEnemyIndex];
        enemy.health = nextEnemy.health;
        enemy.maxHealth = nextEnemy.maxHealth;

        // Atualiza a imagem do inimigo
        const enemyImage = document.querySelector('.enemy-image');
        if (enemyImage) enemyImage.src = nextEnemy.image;

        // Atualiza o fundo
        const backgroundImage = document.getElementById('backgroundImage');
        if (backgroundImage) backgroundImage.src = nextEnemy.background;

        // Atualiza a barra de vida
        updateHealthBar();

        // Salva o estado do inimigo
        saveEnemyState();
        console.log('Próximo inimigo:', nextEnemy.name);
    }

    function attackEnemy(event) {
        const upgradeModal = document.getElementById('upgradeModal');
        const rewardModal = document.getElementById('rewardModal');
    
        // Verifica se algum modal está aberto
        if (
            (upgradeModal && upgradeModal.classList.contains('active')) ||
            (rewardModal && rewardModal.style.display === 'block')
        ) {
            return;
        }
    
        // Verifica se o jogador tem energia para atacar
        if (player.energy < 1) {
            return; // Simplesmente retorna sem fazer nada
        }
    
        // Toca o som de soco
        punchSound.currentTime = 0; // Reinicia o som se já estiver tocando
        punchSound.play();
    
        // Executa o ataque
        const damage = calculateDamage();
        const effectiveDamage = Math.min(damage, enemy.health); // Dano efetivo (não pode ser maior que a vida restante do inimigo)
        enemy.health -= effectiveDamage;
        saveEnemyState(); // Salva o estado do inimigo
        player.dragonCoins += effectiveDamage; // Ganha moedas com base no dano efetivo
        player.energy -= 1;
        updateEnergy();
        updateDragonCoins();
    
        // Mostra o número de dano flutuante
        showDamageNumber(damage, event.clientX, event.clientY);
    
        // Animação de shake no inimigo
        const enemyImage = document.querySelector('.enemy-image');
        if (enemyImage) {
            enemyImage.classList.add('enemy-shake');
            setTimeout(() => {
                enemyImage.classList.remove('enemy-shake');
            }, 200);
        }
    
        // Verifica se o inimigo foi derrotado
        if (enemy.health <= 0) {
            enemy.health = 0;
            defeatEnemy(); // Chama a função de derrota do inimigo
        }
    
        // Atualiza a barra de vida do inimigo
        updateHealthBar();
        saveProgress();
    }

let isSpecialAttackInProgress = false; // Controla se o ataque especial está em andamento

function specialAttack() {
    const now = Date.now();

    // Verifica se o ataque especial já está em andamento
    if (isSpecialAttackInProgress) {
        return; // Impede múltiplos usos simultâneos
    }

    // Verifica se passaram 24 horas desde o último uso e reseta as cargas
    if (now - player.lastSpecialAttackUse >= 86400000) {
        player.specialAttackUses = player.maxSpecialAttackUses; // Reseta para o valor máximo
    }

    // Verifica se o jogador tem cargas de ataque especial
    if (player.specialAttackUses > 0) {
        isSpecialAttackInProgress = true; // Bloqueia o uso do ataque especial

        // Desconta a energia imediatamente ao apertar o botão
        const energyUsed = player.energy; // Armazena a energia gasta
        player.energy = 0; // Zera a energia
        updateEnergy(); // Atualiza a interface

        // Toca o som do ataque especial
        specialAttackSound.currentTime = 0; // Reinicia o som se já estiver tocando
        specialAttackSound.play();

        // Aplica o dano e atualiza a interface após o som terminar
        specialAttackSound.onended = () => {
            // Calcula o dano com base no dano base e na energia gasta
            const damage = player.baseDamage * energyUsed;

            enemy.health -= damage;
            saveEnemyState(); // Salva o estado do inimigo
            player.specialAttackUses -= 1; // Diminui os usos de ataque especial
            player.lastSpecialAttackUse = now;
            updateHealthBar();

            // Mostra o número de dano flutuante e toca o som de explosão
            const enemyContainer = document.getElementById('enemyContainer');
            if (enemyContainer) {
                const rect = enemyContainer.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                showDamageNumber(damage, x, y, true); // true indica que é um ataque especial

                // Toca o som de explosão
                explosionSound.currentTime = 0; // Reinicia o som se já estiver tocando
                explosionSound.play();
            }

            // Aplica a animação de golpe especial ao inimigo
            const enemyImage = document.querySelector('.enemy-image');
            if (enemyImage) {
                // Animação antiga (shake ou pulse)
                enemyImage.classList.add('enemy-shake'); // ou 'enemy-pulse'
                setTimeout(() => {
                    enemyImage.classList.remove('enemy-shake'); // ou 'enemy-pulse'
                }, 200); // Duração da animação antiga

                // Animação nova (brilho/explosão)
                enemyImage.classList.add('enemy-special-effect');
                setTimeout(() => {
                    enemyImage.classList.remove('enemy-special-effect');
                }, 500); // Duração da animação nova
            }

            // Verifica se o inimigo foi derrotado
            if (enemy.health <= 0) {
                enemy.health = 0;
                player.dragonCoins += enemy.maxHealth;
                updateDragonCoins();
                showRewardModal();
                defeatEnemy(); // Chama a função de derrota do inimigo
            }

            saveProgress();
            isSpecialAttackInProgress = false; // Libera o uso do ataque especial
        };
    } else {
        showToast(`Você tem 0/${player.maxSpecialAttackUses} cargas de especial ataque`);
    }
}

function defeatEnemy() {
    // Armazena a recompensa
    const reward = enemy.maxHealth;

    // Ganha níveis ao derrotar o inimigo
    const currentEnemy = enemies[currentEnemyIndex];
    const levelsGained = currentEnemy.levelsGained || 1; // Padrão: 1 nível
    player.level += levelsGained;

    // Adiciona 500 pontos por nível ganho
    player.power += levelsGained * 500; // 500 pontos por nível

    // Atualiza a interface e o personagem
    updatePlayerLevel();
    updatePlayerPower();
    updateCharacterImage();

    // Exibe uma mensagem de nível up
    showToast(`Você subiu ${levelsGained} nível! Ganhou ${levelsGained * 500} pontos. Agora está no nível ${player.level}.`);

    // Exibe o modal de recompensa
    showRewardModal(reward);
}

    // Mostrar modal de recompensa
    function showRewardModal(reward) {
        const rewardModal = document.getElementById('rewardModal');
        const rewardText = document.getElementById('rewardText');
        const rewardAmount = document.getElementById('rewardAmount');
        const currentEnemy = enemies[currentEnemyIndex];
    
        if (rewardModal && rewardText && rewardAmount) {
            rewardText.textContent = `You defeated ${currentEnemy.name}.`;
            rewardAmount.textContent = reward; // Exibe a recompensa no modal
            rewardModal.style.display = 'block';
        }
    }

    // Fechar modal de recompensa ao clicar no botão
 document.getElementById('rewardButton')?.addEventListener('click', () => {
    const rewardModal = document.getElementById('rewardModal');
    if (rewardModal) {
        // Coleta a recompensa
        const rewardAmount = document.getElementById('rewardAmount');
        if (rewardAmount) {
            const reward = parseInt(rewardAmount.textContent, 10);
            player.dragonCoins += reward;
            updateDragonCoins();
        }

        // Fecha o modal
        rewardModal.style.display = 'none';

        // Adiciona a transição para o próximo inimigo AQUI
        nextEnemy(); // Movido para cá
    }
});

    // Próximo inimigo
    function nextEnemy() {
        console.log('Passando para o próximo inimigo...');
        
        // Atualiza o índice circularmente
        currentEnemyIndex = (currentEnemyIndex + 1) % enemies.length;
        const nextEnemy = enemies[currentEnemyIndex];
        
        console.log('Próximo inimigo:', nextEnemy.name);
        console.log('Índice do inimigo atual:', currentEnemyIndex);
    
        // Atualiza dados do inimigo
        enemy.health = nextEnemy.health;
        enemy.maxHealth = nextEnemy.maxHealth;
    
        // Animação de transição suave
        const enemyImage = document.querySelector('.enemy-image');
        const backgroundImage = document.getElementById('backgroundImage');
    
        if (enemyImage && backgroundImage) {
            // Animação de fade out
            enemyImage.style.opacity = '0';
            backgroundImage.style.opacity = '0';
    
            setTimeout(() => {
                // Atualiza as imagens após a transição
                enemyImage.src = nextEnemy.image;
                backgroundImage.src = nextEnemy.background;
    
                // Animação de fade in
                enemyImage.style.opacity = '1';
                backgroundImage.style.opacity = '1';
            }, 500); // Duração igual à transição CSS
        }
    
        updateHealthBar();
        saveEnemyState();
        
        console.log('Estado do inimigo salvo:', {
            currentEnemyIndex,
            health: enemy.health,
            maxHealth: enemy.maxHealth
        });
    }

    // Função para upar o ataque
    function upgradeAttack() {
        if (player.dragonCoins >= player.upgradeAttackCost) {
            player.dragonCoins -= player.upgradeAttackCost;
            player.baseDamage += 1; // Aumenta em 1 o dano base
            player.power += 250; // Aumenta o power
            player.upgradeAttackCost *= 2; // Dobra o custo do próximo upgrade
    
            updateHeader();
            updateDragonCoins();
            updateUpgradeCosts();
            updatePlayerLevel(); // Atualiza o nível no modal
            updatePlayerPower(); // Atualiza o poder no modal
            updateCharacterImage(); // Atualiza a imagem e o nome do personagem
    
            // Verifica se o modal está aberto e atualiza a imagem
            const upgradeModal = document.getElementById('upgradeModal');
            if (upgradeModal && upgradeModal.classList.contains('active')) {
                updateCharacterImage(); // Atualiza a imagem do personagem
            }
        } else {
            showToast("Você não tem DragonCoins suficiente para o upgrade");
        }
        saveProgress();
    }

    // Função para upar o ataque especial
    function upgradeSpecial() {
        if (player.dragonCoins >= player.upgradeSpecialCost) {
            player.dragonCoins -= player.upgradeSpecialCost;
            player.maxSpecialAttackUses += 1; // Aumenta o valor máximo de cargas
            player.specialAttackUses = player.maxSpecialAttackUses; // Atualiza as cargas atuais
            player.power += 500; // Aumenta o power
            player.upgradeSpecialCost *= 2; // Aumenta o custo do próximo upgrade
    
            updateHeader();
            updateDragonCoins();
            updateUpgradeCosts();
            updatePlayerLevel(); // Atualiza o nível no modal
            updatePlayerPower(); // Atualiza o poder no modal
            updateCharacterImage(); // Atualiza a imagem e o nome do personagem
    
            // Verifica se o modal está aberto e atualiza a imagem
            const upgradeModal = document.getElementById('upgradeModal');
            if (upgradeModal && upgradeModal.classList.contains('active')) {
                updateCharacterImage(); // Atualiza a imagem do personagem
            }
        } else {
            showToast("Você não tem DragonCoins suficiente para o upgrade");
        }
        saveProgress();
    }

    // Função para upar a energia
    function upgradeEnergy() {
        if (player.dragonCoins >= player.upgradeEnergyCost) {
          player.dragonCoins -= player.upgradeEnergyCost;
          player.maxEnergy += 10;
          player.upgradeEnergyCost *= 2;
          updateDragonCoins();
          updateUpgradeCosts();
        } else {
          // Mensagem toast quando não há Dragon Coins suficientes
          showToast("Você não tem DragonCoins suficiente para o upgrade");
        }
        saveProgress();
    }

    // Fechar o modal de upgrades ao clicar no botão de fechar
    document.getElementById('closeModalButton')?.addEventListener('click', () => {
        const upgradeModal = document.getElementById('upgradeModal');
        if (upgradeModal) {
            upgradeModal.classList.remove('active'); // Remove a classe 'active' para fechar o modal
        }
    });

    // Event listeners
    const enemyContainer = document.getElementById('enemyContainer');
    if (enemyContainer) {
        enemyContainer.addEventListener('click', attackEnemy);
    }

    const specialAttackButton = document.getElementById('specialAttackButton');
    if (specialAttackButton) {
        specialAttackButton.addEventListener('click', specialAttack);
    }

    const levelUpButton = document.getElementById('levelUpButton');
    if (levelUpButton) {
        levelUpButton.addEventListener('click', () => {
            const upgradeModal = document.getElementById('upgradeModal');
            if (upgradeModal) {
                upgradeModal.classList.add('active'); // Abre o modal
                updatePlayerName(); // Atualiza o nome do personagem
                updatePlayerLevel(); // Atualiza o nível
                updatePlayerPower(); // Atualiza o poder
                updateCharacterImage(); // Atualiza a imagem do personagem
            }
        });
    }

    document.getElementById('upgrade-attack-button')?.addEventListener('click', upgradeAttack);
    document.getElementById('upgrade-special-button')?.addEventListener('click', upgradeSpecial);
    document.getElementById('upgrade-energy-button')?.addEventListener('click', upgradeEnergy);

    // Função para exibir toasts
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

    // Inicializar o jogo
    function initializeGame() {
        // 1. Carrega o estado do inimigo salvo
        loadEnemyState();
    
        // 2. Verifica se o índice do inimigo atual é válido
        if (currentEnemyIndex < 0 || currentEnemyIndex >= enemies.length) {
            console.error('Índice do inimigo inválido. Redefinindo para o primeiro inimigo.');
            currentEnemyIndex = 0; // Define um valor padrão
        }
    
        // 3. Obtém o inimigo atual
        const currentEnemy = enemies[currentEnemyIndex];
    
        // 4. Atualiza a imagem do inimigo
        const enemyImage = document.querySelector('.enemy-image');
        if (enemyImage && currentEnemy.image) {
            enemyImage.src = currentEnemy.image;
        } else {
            console.error('Imagem do inimigo não encontrada ou elemento não existe.');
        }
    
        // 5. Atualiza o fundo
        const backgroundImage = document.getElementById('backgroundImage');
        if (backgroundImage && currentEnemy.background) {
            backgroundImage.src = currentEnemy.background;
        } else {
            console.error('Fundo não encontrado ou elemento não existe.');
        }
    
        // 6. Atualiza a barra de vida
        updateHealthBar();
    }

    loadProgress(); // Carrega o progresso do jogador
    loadEnemyState(); // Carrega o estado do inimigo ANTES de inicializar o jogo
    initializeGame(); // Inicializa o jogo
    
    const profilePicture = document.getElementById('profile-picture');
if (profilePicture) {
    profilePicture.addEventListener('click', () => {
        // Adiciona a animação de clique
        profilePicture.style.animation = 'buttonClick 0.2s ease';

        // Redireciona após a animação terminar
        setTimeout(() => {
            window.location.href = 'leaderboard.html';
        }, 200); // 200ms = duração da animação
    });
}

    // Adicionar redirecionamento ao clicar nos contadores (Dragon Coins e Energia)
    const dragonCoinCounter = document.querySelector('.main-dragoncoin'); // Seleciona o contador de Dragon Coins
    const energyCounter = document.querySelector('.main-energy'); // Seleciona o contador de Energia

    if (dragonCoinCounter) {
        dragonCoinCounter.addEventListener('click', () => {
        // Adiciona a animação de clique
        dragonCoinCounter.style.animation = 'buttonClick 0.2s ease';

        // Redireciona após a animação terminar
        setTimeout(() => {
            window.location.href = 'withdraw.html';
        }, 200); // 200ms = duração da animação
    });
}

    if (energyCounter) {
        energyCounter.addEventListener('click', () => {
        // Adiciona a animação de clique
        energyCounter.style.animation = 'buttonClick 0.2s ease';

        // Redireciona após a animação terminar
        setTimeout(() => {
            window.location.href = 'withdraw.html';
        }, 200); // 200ms = duração da animação
    });
}

});