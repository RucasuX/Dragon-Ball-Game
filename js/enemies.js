const enemies = [
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