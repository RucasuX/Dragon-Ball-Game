document.addEventListener('DOMContentLoaded', () => {
    const playerData = JSON.parse(localStorage.getItem('playerProgress'));
    console.log('Progresso carregado:', playerData); // Log que você compartilhou

    if (!playerData || !playerData.selectedCharacter) {
        console.log('Redirecionando para index.html'); // Verifique se essa mensagem aparece
        window.location.href = 'index.html';
    }

    
window.addEventListener('popstate', () => {
    const playerData = JSON.parse(localStorage.getItem('playerProgress'));
    if (playerData) {
        // Se houver dados, redireciona para main.html
        window.location.href = 'main.html';
    }
});

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
        selectedCharacter: 'Gohan' // Valor padrão
    };

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
            {
                name: "Nappa",
                image: "imagens/nappa.png",
                health: 3500,
                maxHealth: 3500,
                background: "imagens/2_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Vegeta",
                image: "imagens/vegeta_1.png",
                health: 8000,
                maxHealth: 8000,
                background: "imagens/3_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Vegeta Oozaru",
                image: "imagens/vegeta_2.png",
                health: 12000,
                maxHealth: 12000,
                background: "imagens/3_bg.jpg",
                levelsGained: 1
            },
        
            // Saga Freeza
            {
                name: "Cui",
                image: "imagens/cui.png",
                health: 6500,
                maxHealth: 6500,
                background: "imagens/4_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Freeza Soldier",
                image: "imagens/freeza_soldier.png",
                health: 5000, 
                maxHealth: 5000,
                background: "imagens/4_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Dodoria",
                image: "imagens/dodoria.png",
                health: 10000,
                maxHealth: 10000,
                background: "imagens/5_bg.jpg",
                levelsGained: 3
            },
            {
                name: "Zarbon",
                image: "imagens/zarbon_1.png",
                health: 11000,
                maxHealth: 11000,
                background: "imagens/5_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Zarbon Monster",
                image: "imagens/zarbon_2.png",
                health: 15000,
                maxHealth: 15000,
                background: "imagens/5_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Guldo",
                image: "imagens/guldo.png",
                health: 8500,
                maxHealth: 8500,
                background: "imagens/5_bg_1.jpg",
                levelsGained: 1
            },
            {
                name: "Burter",
                image: "imagens/burter.png",
                health: 18000,
                maxHealth: 18000,
                background: "imagens/5_bg_1.jpg",
                levelsGained: 1
            },
            {
                name: "Jeice",
                image: "imagens/jeice.png",
                health: 19000,
                maxHealth: 19000,
                background: "imagens/5_bg_1.jpg",
                levelsGained: 1
            },
            {
                name: "Recoome",
                image: "imagens/recoome.png",
                health: 20000,
                maxHealth: 20000,
                background: "imagens/5_bg_1.jpg",
                levelsGained: 1
            },
            {
                name: "Ginyu",
                image: "imagens/ginyu.png",
                health: 30000,
                maxHealth: 30000,
                background: "imagens/5_bg_1.jpg",
                levelsGained: 1
            },
            {
                name: "Freeza 1 Form",
                image: "imagens/freeza_1.png",
                health: 40000,
                maxHealth: 40000,
                background: "imagens/6_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Freeza 2 Form",
                image: "imagens/freeza_2.png",
                health: 55000,
                maxHealth: 55000,
                background: "imagens/6_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Freeza 3 Form",
                image: "imagens/freeza_3.png",
                health: 70000,
                maxHealth: 70000,
                background: "imagens/6_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Freeza Final Form",
                image: "imagens/freeza_4.png",
                health: 85000,
                maxHealth: 85000,
                background: "imagens/6_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Freeza Final Form 100%",
                image: "imagens/freeza_5.png",
                health: 100000,
                maxHealth: 100000,
                background: "imagens/7_bg.jpg",
                levelsGained: 1
            },
        
            // Saga Cell
            {
                name: "Freeza Mecha",
                image: "imagens/freeza_6.png",
                health: 90000,
                maxHealth: 90000,
                background: "imagens/14_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Rei Cold",
                image: "imagens/kingcold.png",
                health: 95000,
                maxHealth: 95000,
                background: "imagens/14_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Dr. Gero",
                image: "imagens/dr_gero.png",
                health: 30000,
                maxHealth: 30000,
                background: "imagens/8_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Android 19",
                image: "imagens/android19.png",
                health: 30000,
                maxHealth: 30000,
                background: "imagens/8_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Android 16",
                image: "imagens/android16.png",
                health: 60000,
                maxHealth: 60000,
                background: "imagens/9_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Android 17",
                image: "imagens/android17_1.png",
                health: 50000,
                maxHealth: 50000,
                background: "imagens/9_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Android 18",
                image: "imagens/android18.png",
                health: 50000,
                maxHealth: 50000,
                background: "imagens/9_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Cell 1",
                image: "imagens/cell_1.png",
                health: 55000,
                maxHealth: 55000,
                background: "imagens/9_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Cell 2",
                image: "imagens/cell_2.png",
                health: 65000,
                maxHealth: 65000,
                background: "imagens/9_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Mr. Sata",
                image: "imagens/mrsata.png",
                health: 10,
                maxHealth: 10,
                background: "imagens/11_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Cell Jr.",
                image: "imagens/cell_jr.png",
                health: 70000,
                maxHealth: 70000,
                background: "imagens/11_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Cell 3",
                image: "imagens/cell_3.png",
                health: 85000,
                maxHealth: 85000,
                background: "imagens/11_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Cell Perfect",
                image: "imagens/cell_4.png",
                health: 100000,
                maxHealth: 100000,
                background: "imagens/12_bg.jpg",
                levelsGained: 1
            },
        
            // Saga Majin Boo
            {
                name: "Spopovich",
                image: "imagens/spopovich.png",
                health: 1500,
                maxHealth: 1500,
                background: "imagens/13_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Babidi",
                image: "imagens/babidi.png",
                health: 5000,
                maxHealth: 5000,
                background: "imagens/14_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Dabura",
                image: "imagens/dabura.png",
                health: 55000,
                maxHealth: 55000,
                background: "imagens/14_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Majin Boo 1",
                image: "imagens/majinbuu_1.png",
                health: 60000,
                maxHealth: 60000,
                background: "imagens/15_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Majin Boo 2",
                image: "imagens/majinbuu_2.png",
                health: 65000,
                maxHealth: 65000,
                background: "imagens/15_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Majin Boo 3",
                image: "imagens/majinbuu_3.png",
                health: 70000,
                maxHealth: 70000,
                background: "imagens/16_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Super Boo (Gotenks Absorvido)",
                image: "imagens/majinbuu_4.png",
                health: 85000,
                maxHealth: 85000,
                background: "imagens/17_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Super Boo (Gohan Absorvido)",
                image: "imagens/majinbuu_5.png",
                health: 95000,
                maxHealth: 95000,
                background: "imagens/17_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Kid Boo",
                image: "imagens/majinbuu_6.png",
                health: 90000,
                maxHealth: 90000,
                background: "imagens/18_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Uub",
                image: "imagens/uub.png",
                health: 15000,
                maxHealth: 15000,
                background: "imagens/13_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Majuub",
                image: "imagens/majuub.png",
                health: 50000,
                maxHealth: 50000,
                background: "imagens/13_bg.jpg",
                levelsGained: 1
            },
        
            // Filmes e Sagas Especiais
            {
                name: "Garlic Jr.",
                image: "imagens/garlic.png",
                health: 4000,
                maxHealth: 4000,
                background: "imagens/20_bg.jpg",
                levelsGained: 2
            },
            {
                name: "Dr. Wheelo",
                image: "imagens/dr_wheelo.png",
                health: 10000,
                maxHealth: 10000,
                background: "imagens/21_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Lord Slug (Base)",
                image: "imagens/lordslug_1.png",
                health: 15000,
                maxHealth: 15000,
                background: "imagens/22_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Lord Slug (Full Power)",
                image: "imagens/lordslug_2.png",
                health: 30000,
                maxHealth: 30000,
                background: "imagens/22_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Turles",
                image: "imagens/turles.png",
                health: 35000,
                maxHealth: 35000,
                background: "imagens/23_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Cooler (Forma Base)",
                image: "imagens/cooler_1.png",
                health: 60000,
                maxHealth: 60000,
                background: "imagens/24_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Cooler (Forma Final)",
                image: "imagens/cooler_2.png",
                health: 80000,
                maxHealth: 80000,
                background: "imagens/24_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Metal Cooler",
                image: "imagens/cooler_3.png",
                health: 85000,
                maxHealth: 85000,
                background: "imagens/24_bg.jpg",
                levelsGained: 13
            },
            {
                name: "Android 13 (Base)",
                image: "imagens/android13_1.png",
                health: 40000,
                maxHealth: 40000,
                background: "imagens/25_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Android 13 (Fusionado)",
                image: "imagens/android13_2.png",
                health: 70000,
                maxHealth: 70000,
                background: "imagens/25_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Broly (Lendário, Filme 8)",
                image: "imagens/broly_1.png",
                health: 80000,
                maxHealth: 80000,
                background: "imagens/26_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Broly (Zangado, Filme 10)",
                image: "imagens/broly_2.png",
                health: 85000,
                maxHealth: 85000,
                background: "imagens/26_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Broly (Bio, Filme 11)",
                image: "imagens/broly_3.png",
                health: 90000,
                maxHealth: 90000,
                background: "imagens/26_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Bojack (Base)",
                image: "imagens/bojack_1.png",
                health: 55000,
                maxHealth: 55000,
                background: "imagens/27_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Bojack (Full Power)",
                image: "imagens/bojack_2.png",
                health: 80000,
                maxHealth: 80000,
                background: "imagens/27_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Janemba (Forma 1)",
                image: "imagens/janemba_1.png",
                health: 85000,
                maxHealth: 85000,
                background: "imagens/28_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Janemba (Forma Final)",
                image: "imagens/janemba_2.png",
                health: 100000,
                maxHealth: 100000,
                background: "imagens/28_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Hirudegarn",
                image: "imagens/hirudegarn.png",
                health: 95000,
                maxHealth: 95000,
                background: "imagens/29_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Tapion",
                image: "imagens/tapion.png",
                health: 8000,
                maxHealth: 8000,
                background: "imagens/30_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Bardock",
                image: "imagens/bardock.png",
                health: 4500,
                maxHealth: 4500,
                background: "imagens/31_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Baby Vegeta 1",
                image: "imagens/babyvegeta_1.png",
                health: 70000,
                maxHealth: 70000,
                background: "imagens/47_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Baby Vegeta 2",
                image: "imagens/babyvegeta_2.png",
                health: 80000,
                maxHealth: 80000,
                background: "imagens/47_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Baby Vegeta 3",
                image: "imagens/babyvegeta_3.png",
                health: 90000,
                maxHealth: 90000,
                background: "imagens/47_bg.jpg",
                levelsGained: 1
            },
            {
                name: "baby Vegeta 4",
                image: "imagens/babyvegeta_4.png",
                health: 100000,
                maxHealth: 100000,
                background: "imagens/47_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Shenron (Normal)",
                image: "imagens/shenron_1.png",
                health: 90000, // Valor indefinido
                maxHealth: 90000,
                background: "imagens/33_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Shenron (Super)",
                image: "imagens/shenron_2.png",
                health: 100000, // Valor indefinido
                maxHealth: 100000,
                background: "imagens/33_bg.jpg",
                levelsGained: 1
            },
        
            // Saga Dragon Ball Super
            {
                name: "Freeza (Golden, Revival do Filme)",
                image: "imagens/freeza_7.png",
                health: 100000,
                maxHealth: 100000,
                background: "imagens/32_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Beerus",
                image: "imagens/beerus.png",
                health: 100000,
                maxHealth: 100000,
                background: "imagens/34_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Whis",
                image: "imagens/whis.png",
                health: 100000,
                maxHealth: 100000,
                background: "imagens/35_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Frost (Base)",
                image: "imagens/frost.png",
                health: 50000,
                maxHealth: 50000,
                background: "imagens/36_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Cabba (Base)",
                image: "imagens/cabba_1.png",
                health: 40000,
                maxHealth: 40000,
                background: "imagens/37_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Cabba (SSJ)",
                image: "imagens/cabba_2.png",
                health: 60000,
                maxHealth: 60000,
                background: "imagens/37_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Cabba (SSJ2)",
                image: "imagens/cabba_3.png",
                health: 75000,
                maxHealth: 75000,
                background: "imagens/37_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Hit",
                image: "imagens/hit.png",
                health: 80000,
                maxHealth: 80000,
                background: "imagens/37_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Goku Black (Base)",
                image: "imagens/gokublack_1.png",
                health: 50000,
                maxHealth: 50000,
                background: "imagens/38_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Goku Black (SSJ Rose)",
                image: "imagens/gokublack_2.png",
                health: 100000,
                maxHealth: 100000,
                background: "imagens/38_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Zamasu (Base)",
                image: "imagens/zamasu_1.png",
                health: 50000,
                maxHealth: 50000,
                background: "imagens/39_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Zamasu (Fundido)",
                image: "imagens/zamasu_2.png",
                health: 100000,
                maxHealth: 100000,
                background: "imagens/39_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Zamasu Corrompido",
                image: "imagens/zamasu_3.png",
                health: 100000,
                maxHealth: 100000,
                background: "imagens/39_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Bergamo",
                image: "imagens/bergamo.png",
                health: 60000,
                maxHealth: 60000,
                background: "imagens/40_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Kakunsa",
                image: "imagens/kakunsa.png",
                health: 50000,
                maxHealth: 50000,
                background: "imagens/40_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Roasie",
                image: "imagens/roasie.png",
                health: 55000,
                maxHealth: 55000,
                background: "imagens/40_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Ribrianne",
                image: "imagens/ribrianne.png",
                health: 65000,
                maxHealth: 65000,
                background: "imagens/41_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Toppo (Base)",
                image: "imagens/toppo_1.png",
                health: 80000,
                maxHealth: 80000,
                background: "imagens/41_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Toppo (Hakaishin)",
                image: "imagens/toppo_2.png",
                health: 100000,
                maxHealth: 100000,
                background: "imagens/41_bg.jpg",
                levelsGained: 2
            },
            {
                name: "Dyspo",
                image: "imagens/dyspo.png",
                health: 75000,
                maxHealth: 75000,
                background: "imagens/41_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Caulifla (Base)",
                image: "imagens/caulifla_1.png",
                health: 40000,
                maxHealth: 40000,
                background: "imagens/42_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Caulifla (SSJ)",
                image: "imagens/caulifla_2.png",
                health: 60000,
                maxHealth: 60000,
                background: "imagens/42_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Kale (Base)",
                image: "imagens/kale_1.png",
                health: 50000,
                maxHealth: 50000,
                background: "imagens/42_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Kale (Furiosa)",
                image: "imagens/kale_2.png",
                health: 70000,
                maxHealth: 70000,
                background: "imagens/42_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Kale (Lendária)",
                image: "imagens/kale_3.png",
                health: 100000,
                maxHealth: 100000,
                background: "imagens/42_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Kefla (Base)",
                image: "imagens/kefla_1.png",
                health: 80000,
                maxHealth: 80000,
                background: "imagens/42_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Kefla (SSJ)",
                image: "imagens/kefla_2.png",
                health: 90000,
                maxHealth: 90000,
                background: "imagens/42_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Kefla (SSJ2)",
                image: "imagens/kefla_3.png",
                health: 100000,
                maxHealth: 100000,
                background: "imagens/42_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Anilaza",
                image: "imagens/anilaza.png",
                health: 100000,
                maxHealth: 100000,
                background: "imagens/42_bg.jpg",
                levelsGained: 2
            },
            {
                name: "Jiren (Base)",
                image: "imagens/jiren_1.png",
                health: 90000,
                maxHealth: 90000,
                background: "imagens/43_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Jiren (Full Power)",
                image: "imagens/jiren_2.png",
                health: 100000,
                maxHealth: 100000,
                background: "imagens/43_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Gamma 1",
                image: "imagens/gamma_1.png",
                health: 100000,
                maxHealth: 100000,
                background: "imagens/44_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Gamma 2",
                image: "imagens/gamma_2.png",
                health: 100000,
                maxHealth: 100000,
                background: "imagens/44_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Cell (Super Perfeito, Revival do Filme)",
                image: "imagens/cell_5.png",
                health: 100000,
                maxHealth: 100000,
                background: "imagens/44_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Broly (Base, Filme DBS)",
                image: "imagens/broly_4.png",
                health: 80000,
                maxHealth: 80000,
                background: "imagens/45_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Broly (Ikari)",
                image: "imagens/broly_5.png",
                health: 90000,
                maxHealth: 90000,
                background: "imagens/45_bg.jpg",
                levelsGained: 1
            },
            {
                name: "Broly (SSJ Full Power)",
                image: "imagens/broly_6.png",
                health: 100000,
                maxHealth: 100000,
                background: "imagens/46_bg.jpg",
                levelsGained: 1
            }
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
    
        localStorage.setItem('playerProgress', JSON.stringify(saveData));
        console.log('Progresso salvo:', saveData);
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
            playerNameElement.textContent = player.selectedCharacter; // Atualiza o nome do personagem
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
        loadEnemyState(); // Carrega o estado do inimigo salvo
    
        const firstEnemy = enemies[currentEnemyIndex];
        // enemy.health = firstEnemy.health; // REMOVA OU COMENTE
        // enemy.maxHealth = firstEnemy.maxHealth; // REMOVA OU COMENTE
    
        const enemyImage = document.querySelector('.enemy-image');
        if (enemyImage) enemyImage.src = firstEnemy.image;
    
        const backgroundImage = document.getElementById('backgroundImage');
        if (backgroundImage) backgroundImage.src = firstEnemy.background;
    
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