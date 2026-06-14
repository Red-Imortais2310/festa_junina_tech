// cardapio.js

// Banco de Dados completo das 20 receitas com o novo campo "curiosidadeExtra" e imagens HD
const menuData = [
    { 
        title: "Canjica Tech", 
        desc: "Canjica tradicional infusionada com leite condensado cremoso e raspas de canela.", 
        img: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=800",
        curiosidadeExtra: "Em muitas festas juninas do interior, as pessoas adicionam amendoim torrado moído ou casquinhas de laranja fervidas junto ao leite para dar um toque cítrico inconfundível!",
        ingredientes: [
            "250g de milho para canjica branca",
            "1 litro de leite integral",
            "1 lata de leite condensado",
            "1 garrafa de leite de coco (200ml)",
            "Canela em pó para polvilhar e decorar"
        ],
        preparo: "Deixe o milho de molho na água por 12 horas. Escorra e cozinhe na pressão por 30 minutos. Junte o leite integral, leite de coco e o leite condensado. Misture e cozinhe em fogo baixo mexendo sempre até engrossar. Desligue e polvilhe com canela.",
        regiao: "Região Nordeste e Sudeste do Brasil",
        ano: "Século XVII (Período Colonial)",
        servido: "Quente em potes de cerâmica ou fria salpicada de canela.",
        historia: "Conhecida também como 'Mugunzá' no Nordeste, a canjica tem origem na culinária afro-brasileira e indígena. O nome deriva do termo 'Kanjika' do quimbundo. Uniu-se às tradições juninas por ser feita na época da colheita do milho."
    },
    { 
        title: "Pamonha Premium", 
        desc: "Pamonha de milho verde cozida à perfeição, versão doce com recheio de queijo coalho derretido.", 
        img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800",
        curiosidadeExtra: "A palha do milho usada para embalar a pamonha funciona como uma barreira biológica natural de sabor: ela libera óleos essenciais durante a fervura, aromatizando a massa por completo.",
        ingredientes: [
            "12 espigas de milho verde fresco",
            "1 xícara de açúcar refinado",
            "1/2 xícara de manteiga derretida",
            "1 pitada de sal",
            "Fatias de queijo coalho para o recheio",
            "Palhas de milho higienizadas para embalar"
        ],
        preparo: "Rale o milho e passe por uma peneira grossa. Adicione açúcar, manteiga derretida e o sal. Modele copos com a palha, recheie com a massa e uma fatia de queijo. Amarre muito bem e ferva em água por 45 minutos.",
        regiao: "Centro-Oeste e Nordeste",
        ano: "Origem Pré-Colonial",
        servido: "Amornada com queijo coalho derretendo dentro.",
        historia: "Do tupi 'pa'muña' (pegajoso), é um prato indígena ritualístico ligado ao ciclo agrícola do milho verde. Atravessou séculos e hoje é o maior ícone caipira dos festivais juninos."
    },
    { 
        title: "Bolo de Milho Ouro", 
        desc: "Bolo úmido com calda de melaço de cana e amendoim torrado.", 
        img: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?auto=format&fit=crop&q=80&w=800",
        curiosidadeExtra: "No Brasil Colonial, este bolo era um símbolo de resistência econômica: como a farinha de trigo era importada da Europa e extremamente cara, as cozinheiras usavam o milho nativo abundante para criar a base do bolo.",
        ingredientes: [
            "1 lata de milho verde escorrido",
            "1 lata de leite condensado",
            "3 ovos inteiros",
            "1 colher (sopa) de fermento químico",
            "Melaço de cana e amendoim moído para cobertura"
        ],
        preparo: "Bata no liquidificador o milho, o leite condensado e os ovos por 5 minutos. Adicione o fermento e misture suavemente. Asse a 180°C por 40 minutos in forma untada. Desenforme e decore com o melaço e amendoim.",
        regiao: "Interior de São Paulo e Minas Gerais",
        ano: "Século XVIII",
        servido: "Quente ou frio, regado de melaço com café fresco.",
        historia: "Adaptação da doçaria conventual portuguesa ao milho nativo. O melaço representa os engenhos de cana-de-açúcar que dominavam o interior no período colonial."
    },
    { 
        title: "Quentão Molecular", 
        desc: "Bebida clássica à base de cachaça, gengibre, cravo e maçã com finalização de névoa.", 
        img: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800",
        curiosidadeExtra: "O gengibre do quentão era visto antigamente como um santo remédio caseiro. A bebida era preparada para combater resfriados e dar 'energia extra' para que as pessoas aguentassem dançar quadrilha a noite inteira sob o frio de junho.",
        ingredientes: [
            "2 xícaras de cachaça de boa qualidade",
            "1 xícara de água",
            "1 xícara de açúcar",
            "50g de gengibre fatiado",
            "Casca de 1 laranja e de 1 limão",
            "1 maçã cortada em cubos",
            "Especiarias (cravo e canela) a gosto"
        ],
        preparo: "Derreta o açúcar na panela com gengibre, cascas e especiarias para aromatizar o caramelo. Adicione a água, dissolva e junte a cachaça e os pedaços de maçã. Cozinhe em fogo baixo por 15 minutos.",
        regiao: "Sul e Sudeste do Brasil",
        ano: "Século XIX",
        servido: "Em canecas bem quentes exalando fumaça aromática.",
        historia: "Criado originalmente no interior do Brasil para aquecer e prevenir resfriados durante as noites geladas de junho. O nome veio da sensação imediata de calor ao beber."
    },
    { 
        title: "Pé de Moleque", 
        desc: "Doce tradicional feito com amendoim torrado e calda de rapadura.", 
        img: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=800",
        curiosidadeExtra: "A cidade de Piranguinho, em Minas Gerais, é internacionalmente famosa por fazer anualmente o 'Maior Pé de Moleque do Mundo' durante a festa do doce, chegando a produzir uma peça única com mais de 20 metros de comprimento!",
        ingredientes: ["500g de amendoim torrado", "500g de açúcar", "1 lata de leite condensado", "3 colheres de manteiga"],
        preparo: "Leve ao fogo o açúcar, o amendoim e a manteiga, mexendo até caramelizar. Adicione o leite condensado e mexa até desgrudar da panela. Despeje em pia untada, deixe esfriar e corte em pedaços.",
        regiao: "Minas Gerais (Piranguinho)",
        ano: "Século XVI",
        servido: "Em pedaços retangulares, crocante e doce.",
        historia: "O nome surgiu das quituteiras de Minas Gerais. Os meninos roubavam os doces e elas gritavam: 'Pede, moleque!'. Outros dizem que é pelo calçamento de pedras das cidades históricas que lembra os amendoins."
    },
    { 
        title: "Cocada Cremosa", 
        desc: "Doce cremoso feito com coco ralado fresco e calda de açúcar brilhante.", 
        img: "https://images.unsplash.com/photo-1558961309-dbdf717a13d9?auto=format&fit=crop&q=80&w=800",
        curiosidadeExtra: "Originalmente, as cocadas eram vendidas em tabuleiros portados por mulheres negras libertas nas ruas de Salvador, sendo um dos primeiros doces a gerar independência financeira para as mulheres negras no Brasil colonial.",
        ingredientes: ["400g de coco fresco ralado", "2 xícaras de açúcar", "1 xícara de água", "1 lata de leite condensado"],
        preparo: "Cozinhe a água e o açúcar até obter uma calda em ponto de fio. Junte o coco ralado e misture por 10 minutos. Adicione o leite condensado e mexa até engrossar e desgrudar do fundo.",
        regiao: "Bahia e Nordeste",
        ano: "Século XVIII",
        servido: "Em colheradas individuais ou copinhos.",
        historia: "Originária da culinária afro-brasileira, as cocadas eram preparadas por escravizados que misturavam o coco abundante no litoral com o açúcar mascavo restante dos engenhos."
    },
    { 
        title: "Pipoca de Caramelo", 
        desc: "Pipoca crocante estourada na hora e envolta em calda de caramelo brilhante.", 
        img: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&q=80&w=800",
        curiosidadeExtra: "Arqueólogos encontraram grãos de pipoca perfeitamente preservados com cerca de 4.000 anos em cavernas no Novo México. Ao serem testados em laboratório moderno, os grãos históricos ainda conseguiram estourar perfeitamente!",
        ingredientes: ["1 xícara de milho de pipoca", "3 colheres de óleo", "1 xícara de açúcar", "1 colher de manteiga"],
        preparo: "Estoure a pipoca no óleo normalmente. Em outra panela alta, derreta o açúcar e a manteiga até virar caramelo. Despeje sobre as pipocas com cuidado e misture até cobrir todas.",
        regiao: "Todo o Brasil",
        ano: "Século XX",
        servido: "Em sacos de papel pardo rústicos.",
        historia: "A pipoca já era consumida por indígenas na América muito antes da colonização. A versão doce caramelizada virou sinônimo de festejos populares e parques de diversão."
    },
    { 
        title: "Arroz Doce Real", 
        desc: "Arroz cremoso cozido com especiarias e raspas de limão siciliano.", 
        img: "https://images.unsplash.com/photo-1536304997881-a372c179924b?auto=format&fit=crop&q=80&w=800",
        curiosidadeExtra: "A famosa canela salpicada em cima do arroz doce servia originalmente para ostentar riqueza: na Europa medieval e colonial, as especiarias asiáticas (como a canela) eram extremamente caras e demonstravam o poder aquisitivo do anfitrião.",
        ingredientes: ["1 xícara de arroz", "2 xícaras de água", "1 litro de leite quente", "1 lata de leite condensado", "Canela em pau"],
        preparo: "Cozinhe o arroz na água com a canela em pau até secar. Adicione o leite quente e deixe cozinhar até reduzir. Coloque o leite condensado e mexa por 10 minutos até encorpar.",
        regiao: "Nacional (Herança Portuguesa)",
        ano: "Século XVI",
        servido: "Polvilhado com canela em pó formando desenhos geométricos.",
        historia: "Prato de origem asiática trazido pelos portugueses ao Brasil colonial. Era presença garantida nos banquetes reais devido ao açúcar que demonstrava riqueza na época colonial."
    },
    { 
        title: "Curau de Milho", 
        desc: "Creme aveludado de milho verde fresco polvilhado com canela.", 
        img: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&q=80&w=800",
        curiosidadeExtra: "Para obter a cremosidade aveludada perfeita sem empelotar, as quituteiras tradicionais usam colheres exclusivas de madeira e mexem sempre fazendo movimentos em formato de '8' no fundo da panela.",
        ingredientes: ["6 espigas de milho verde", "2 xícaras de leite integral", "1 xícara de açúcar", "1 pitada de sal"],
        preparo: "Corte os grãos de milho e bata no liquidificador com o leite. Peneire muito bem espremendo a massa. Leve ao fogo com açúcar e sal mexendo sem parar até engrossar e cozinhar bem.",
        regiao: "Sudeste e Centro-Oeste",
        ano: "Período Colonial",
        servido: "Gelado em travessas polvilhado de canela.",
        historia: "Derivação direta do 'Kanjika' africano e do mingau de milho tupinambá. Tornou-se um prato de festa junina devido à grande safra de milho no meio do ano."
    },
    { 
        title: "Cuscuz de Tapioca", 
        desc: "Cuscuz doce frio feito com tapioca granulada e leite de coco fresco.", 
        img: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&q=80&w=800",
        curiosidadeExtra: "O cuscuz de tapioca doce é um dos poucos 'cuscuzes' do mundo que não passa por cozimento a vapor ou fogo! Ele atinge sua consistência firme unicamente pela capacidade de hidratação dos grãos de tapioca.",
        ingredientes: ["500g de tapioca granulada", "1 litro de leite quente", "1 lata de leite condensado", "200g de coco ralado"],
        preparo: "Misture a tapioca granulada e o açúcar em um refratário. Adicione o leite quente aos poucos, mexendo sempre. Cubra com metade do coco ralado e deixe descansar por 30 minutos até hidratar.",
        regiao: "Rio de Janeiro e Nordeste",
        ano: "Século XIX",
        servido: "Cortado em quadrados, coberto de coco e regado com leite condensado.",
        historia: "Adaptado do cuscuz de sêmola do norte da África pelas cozinheiras baianas no século XIX, que utilizaram a mandioca nativa para recriar o prato de forma genial."
    },
    { 
        title: "Bolo de Fubá Cremoso", 
        desc: "Bolo clássico de fubá com uma camada cremosa interna de queijo minas.", 
        img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
        curiosidadeExtra: "A 'mágica' da camada cremosa central ocorre sem recheio manual: a densidade física do fubá, misturada à alta quantidade de líquidos e queijo ralado, faz com que os ingredientes se separem perfeitamente durante a temperatura do forno.",
        ingredientes: ["3 ovos", "3 xícaras de leite", "2 xícaras de açúcar", "1 xícara de fubá", "50g de queijo parmesão ralado"],
        preparo: "Bata todos os ingredientes no liquidificador até obter um líquido homogêneo. Despeje em uma forma untada e asse a 180°C por 50 minutos. A massa se separa no forno criando o creme central.",
        regiao: "Minas Gerais e São Paulo",
        ano: "Século XVIII",
        servido: "Morno com café coado da hora.",
        historia: "Os tropeiros transportavam farinha de milho (fubá) e queijo curado nas viagens. As famílias juntaram esses ingredientes fáceis e duradouros, criando um bolo que assa com o próprio recheio."
    },
    { 
        title: "Paçoca de Rolha", 
        desc: "Doce esfarelado de amendoim modelado no formato clássico cilíndrico.", 
        img: "https://images.unsplash.com/photo-1514517604298-cf80e0fb7f1e?auto=format&fit=crop&q=80&w=800",
        curiosidadeExtra: "Originalmente, os bandeirantes paulistas usavam a paçoca salgada (misturada com farinha de mandioca e carne seca) como provisão de viagem por não estragar. O formato doce cilíndrico atual foi adaptado muito tempo depois para as quermesses.",
        ingredientes: ["500g de amendoim torrado e sem pele", "2 xícaras de açúcar", "1 colher de chá de sal"],
        preparo: "Moa o amendoim bem fino no processador ou liquidificador. Junte o açúcar e o sal e processe até que o amendoim solte seu óleo natural. Aperte a massa em fôrmas cilíndricas de rolha.",
        regiao: "Vale do Paraíba (São Paulo)",
        ano: "Século XVIII",
        servido: "Em embalagens individuais de papel colorido.",
        historia: "Do tupi 'poçoc' (esmagar com as mãos). Era feita em pilões rústicos de madeira para alimentar os bandeirantes em suas longas jornadas de exploração territorial no Brasil."
    },
    { 
        title: "Vinho Quente", 
        desc: "Bebida quente de vinho tinto infusionado com frutas e especiarias doces.", 
        img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800",
        curiosidadeExtra: "A receita original romana utilizava carvão quente jogado diretamente dentro do jarro de vinho com mel para remover a acidez excessiva dos vinhos ruins. Hoje, usamos o caramelo de açúcar para dar a doçura aveludada do nosso inverno.",
        ingredientes: ["1 litro de vinho tinto seco", "1 xícara de água", "1 xícara de açúcar", "2 maçãs picadas", "Especiarias"],
        preparo: "Ferva a água com açúcar, cravo e canela até formar uma calda leve. Adicione o vinho tinto e as maçãs picadas. Cozinhe em fogo brando por mais 10 minutos sem deixar ferver totalmente.",
        regiao: "Sul e Sudeste",
        ano: "Século XX (Herança Europeia)",
        servido: "Bem quente, com colher para comer os pedacinhos de maçã ao final.",
        historia: "Versão brasileira do 'Glühwein' europeu. Adaptou-se muito bem ao inverno das Festas de São João no sul do Brasil, onde o frio exige bebidas de teor alcoólico quente."
    },
    { 
        title: "Caldo Verde", 
        desc: "Caldo cremoso à base de batatas, couve cortada fininha e paio defumado.", 
        img: "https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&q=80&w=800",
        curiosidadeExtra: "O grande segredo do autêntico caldo verde está na couve: ela deve ser cortada tão fina quanto fios de cabelo ('cortada à camponesa') e adicionada somente nos últimos 2 minutos de fervura para manter o verde vivo e vibrante.",
        ingredientes: ["500g de batatas", "1 gomo de paio ou linguiça calabresa", "1 maço de couve fatiada bem fina", "Cebola e alho"],
        preparo: "Cozinhe as batatas com água até amolecer. Bata as batatas no liquidificador com a água para fazer um caldo. Refogue o alho, a cebola e a linguiça fatiada. Junte o caldo de batatas e finalize com a couve.",
        regiao: "Nacional (Origem Portuguesa)",
        ano: "Século XV",
        servido: "Em tigelas profundas com um fio de azeite extra virgem.",
        historia: "Originário do Minho, em Portugal, este caldo de camponeses chegou ao Brasil e tornou-se a sopa preferida para as madrugadas frias de fogueira nas festas juninas de rua."
    },
    { 
        title: "Caldo de Mandioca", 
        desc: "Caldo encorpado de mandioca cozida batida com bacon e carne seca desfiada.", 
        img: "https://images.unsplash.com/photo-1608500218900-88f34b5ae8bc?auto=format&fit=crop&q=80&w=800",
        curiosidadeExtra: "A mandioca (aipim ou macaxeira) é considerada pela ONU como uma das fontes alimentares mais resistentes e estratégicas do planeta frente às mudanças climáticas globais, apelidada de 'o alimento do século XXI'.",
        ingredientes: ["1kg de mandioca descascada", "300g de carne seca desfiada", "150g de bacon picado", "Cheiro verde a gosto"],
        preparo: "Cozinhe a mandioca até derreter. Retire as fibras centrais e bata no liquidificador com a água do cozimento. Refogue o bacon e a carne seca. Adicione o creme de mandioca, ferva e ponha cheiro-verde.",
        regiao: "Nordeste e Minas Gerais",
        ano: "Século XVII",
        servido: "Quente, salpicado com torresmo ou cebolinha verde picada.",
        historia: "A mandioca (raiz sagrada dos indígenas) foi associada à carne de sol desidratada típica das secas do Nordeste. Juntas, criaram um caldo altamente calórico e delicioso."
    },
    { 
        title: "Bolo de Mandioca", 
        desc: "Bolo pesado e denso de mandioca ralada fresca com coco e queijo ralado.", 
        img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800",
        curiosidadeExtra: "Por não utilizar nenhum tipo de farinha de trigo ou amido em sua base (apenas a mandioca ralada pura), este bolo possui uma textura densa e naturalmente livre de glúten, perfeita para dietas restritivas rústicas.",
        ingredientes: ["1kg de mandioca ralada", "3 ovos", "2 xícaras de açúcar", "2 colheres de manteiga", "100g de coco ralado"],
        preparo: "Misture em uma tigela grande a mandioca ralada (crua), o açúcar, os ovos batidos, a manteiga derretida e o coco ralado até incorporar. Despeje em fôrma untada e asse a 180°C por 45 minutos.",
        regiao: "Norte e Nordeste",
        ano: "Século XVII",
        servido: "Frio, com textura elástica e úmida deliciosa.",
        historia: "Também conhecido como Bolo de Aipim ou Macaxeira, este bolo dispensa farinha de trigo, celebrando a mandioca em sua textura mais rústica e pura."
    },
    { 
        title: "Milho Cozido", 
        desc: "Milho verde na espiga cozido no sal e servido besuntado de manteiga.", 
        img: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=800",
        curiosidadeExtra: "Civilizações antigas como os Maias e Astecas tinham deuses dedicados exclusivamente ao Milho (como Centeotl) e acreditavam piamente que os primeiros homens e mulheres da Terra foram esculpidos pelos deuses usando massa de milho cozido.",
        ingredientes: ["6 espigas de milho limpas", "Água fervente suficiente para cobrir", "1 colher de sopa de sal", "Manteiga"],
        preparo: "Coloque as espigas de milho inteiras em uma panela grande com água e sal. Cozinhe por 25 a 30 minutos em fogo alto até os grãos ficarem macios. Retire e passe manteiga quente.",
        regiao: "Todo o Brasil",
        ano: "Origem Indígena Milenar",
        servido: "Na própria palha, quente, com sal refinado extra.",
        historia: "O milho é a base de toda a festa junina porque o festival coincide exatamente com o solstício de inverno e o período da grande colheita anual do grão no Brasil."
    },
    { 
        title: "Churros Caipira", 
        desc: "Churros fritos polvilhados em açúcar e canela com doce de leite caseiro.", 
        img: "https://images.unsplash.com/photo-1561626423-a51b45aef0a1?auto=format&fit=crop&q=80&w=800",
        curiosidadeExtra: "A lenda ibérica conta que os pastores espanhóis criaram os churros no alto das montanhas por ser uma massa simples e rápida de fritar em frigideiras sobre fogueiras abertas, imitando o formato dos chifres das ovelhas 'Churra'.",
        ingredientes: ["2 xícaras de água", "2 colheres de manteiga", "2 xícaras de farinha de trigo", "Doce de leite cremoso"],
        preparo: "Ferva a água com a manteiga e pitada de sal. Junte a farinha de uma vez e mexa até soltar do fundo formando uma bola. Modele os churros frios, frite em óleo quente e passe no açúcar.",
        regiao: "Fronteiras do Sul e Sudeste",
        ano: "Século XIX",
        servido: "Quente, recheado com doce de leite mineiro espesso.",
        historia: "De origem ibérica (espanhola), o churros conquistou os circos e quermesses brasileiras no século XIX, unindo-se ao lendário doce de leite das fazendas mineiras."
    },
    { 
        title: "Maria Mole", 
        desc: "Gelatina aerada doce e leve salpicada com flocos finos de coco seco.", 
        img: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&q=80&w=800",
        curiosidadeExtra: "O doce surgiu puramente de um 'acidente' industrial em São Paulo: o mestre doceiro Antonio Bergamo tentava inventar uma receita de marshmallow de baixo custo e errou as dosagens, gerando um doce super elástico que acabou fazendo um sucesso estrondoso!",
        ingredientes: ["1 envelope de gelatina incolor", "2 xícaras de açúcar", "1 xícara de água fervente", "100g de coco ralado"],
        preparo: "Dissolva a gelatina incolor na água quente. Junte o açúcar e bata na batedeira em velocidade máxima por 15 minutos até dobrar e virar um marshmallow firme. Despeje, gela e passe no coco.",
        regiao: "São Paulo",
        ano: "Década de 1950",
        servido: "Em cubos brancos e macios que derretem na boca.",
        historia: "Criada por um fabricante descendente de italianos em São Paulo que tentava fazer marshmallow mas errou a consistência. A receita deu tão certo que virou um doce clássico de quermesse."
    },
    { 
        title: "Pastel de Vento", 
        desc: "Pastel frito de massa caseira crocante recheado com muito queijo derretido.", 
        img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
        curiosidadeExtra: "A cachaça (pinga) adicionada na massa caseira do pastel tem papel químico essencial: ao fritar, o álcool evapora instantaneamente em alta temperatura, criando as famosas bolhas crocantes e impedindo que a massa absorva óleo em excesso.",
        ingredientes: ["3 xícaras de farinha de trigo", "1 dose de pinga de cana (cachaça)", "1 colher de óleo", "300g de queijo muçarela"],
        preparo: "Misture a farinha, sal, óleo, cachaça e água morna até obter uma massa lisa. Deixe descansar por 30 minutos. Abra bem fina, coloque o queijo, feche apertando as bordas e frite em óleo bem quente.",
        regiao: "São Paulo e Paraná",
        ano: "Século XX",
        servido: "Bem quente, estalando de crocante com caldo de cana.",
        historia: "Criado por imigrantes chineses no Brasil adaptando as receitas asiáticas de guioza com os ingredientes locais. Tornou-se o rei absoluto das feiras livres e das barraquinhas de festa caipira."
    }
];

const tray3d = document.getElementById('tray3d');
let currentRotation = 0;
const itemsCount = 4;
let activeIndex = 0; 

// Elementos de Controle do Modal
const modal = document.getElementById('recipe-modal');
const openRecipeBtn = document.getElementById('open-recipe-btn');
const closeRecipeBtn = document.getElementById('close-modal-btn');

// Elementos do Modal (Esquerdo - Receita)
const modalImagem = document.getElementById('modal-imagem');
const modalTitulo = document.getElementById('modal-titulo');
const modalIngredientes = document.getElementById('modal-ingredientes');
const modalPreparo = document.getElementById('modal-preparo');

// Elementos do Modal (Direito - Balão de História + Nova Curiosidade Extra)
const modalCuriosidadeExtra = document.getElementById('modal-curiosidade-extra');
const modalRegiao = document.getElementById('modal-regiao');
const modalAno = document.getElementById('modal-ano');
const modalServido = document.getElementById('modal-servido');
const modalHistoriaTexto = document.getElementById('modal-historia-texto');

// Cria e posiciona os pratos no espaço 3D da bandeja
function create3DMenu() {
    tray3d.innerHTML = "";
    for (let index = 0; index < itemsCount; index++) {
        const dish = menuData[index];
        const angle = (index * 360) / itemsCount;
        const radius = 220; 

        const div = document.createElement('div');
        div.className = "tray-dish";
        div.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
        div.innerHTML = `<img src="${dish.img}" alt="${dish.title}">`;
        
        tray3d.appendChild(div);
    }
    updateActiveDishInfo(0);
}

// Faz o movimento de rotação da bandeja
function rotateTray(direction) {
    if (direction === 'next') currentRotation -= 360 / itemsCount;
    else currentRotation += 360 / itemsCount;

    tray3d.style.transform = `rotateX(75deg) rotateY(${currentRotation}deg)`;

    const normalizedIndex = Math.round(-currentRotation / (360 / itemsCount)) % itemsCount;
    const computedIndex = normalizedIndex < 0 ? normalizedIndex + itemsCount : normalizedIndex;
    updateActiveDishInfo(computedIndex);
}

// Atualiza o cardápio textual abaixo da bandeja flutuante
function updateActiveDishInfo(index) {
    activeIndex = index; 
    document.getElementById('dish-title').textContent = menuData[index].title;
    document.getElementById('dish-desc').textContent = menuData[index].desc;
}

// Abre o modal carregando a receita específica com base no INDEX (0 a 19)
function abrirModal(index) {
    const prato = menuData[index];
    if (prato) {
        // Preenche a imagem HD e detalhes da receita (esquerda)
        modalImagem.src = prato.img;
        modalImagem.alt = prato.title;
        modalTitulo.textContent = prato.title;
        modalPreparo.textContent = prato.preparo;
        
        // Limpa e reinsere a lista de ingredientes
        modalIngredientes.innerHTML = "";
        prato.ingredientes.forEach(ingrediente => {
            const li = document.createElement('li');
            li.textContent = ingrediente;
            modalIngredientes.appendChild(li);
        });

        // Preenche a nova curiosidade de destaque (meio do balão)
        modalCuriosidadeExtra.textContent = prato.curiosidadeExtra;

        // Preenche as curiosidades e história (direita - balão)
        modalRegiao.textContent = prato.regiao;
        modalAno.textContent = prato.ano;
        modalServido.textContent = prato.servido;
        modalHistoriaTexto.textContent = prato.historia;

        // Exibe o modal usando flexbox
        modal.style.display = "flex";
    }
}

function fecharModal() {
    modal.style.display = "none";
}

// Eventos dos botões de navegação da bandeja
document.getElementById('prev-btn').onclick = () => rotateTray('prev');
document.getElementById('next-btn').onclick = () => rotateTray('next');

// Eventos de Abertura e Fechamento do Modal para a bandeja
openRecipeBtn.onclick = () => abrirModal(activeIndex);
closeRecipeBtn.onclick = fecharModal;

// Fecha o modal se o usuário clicar no fundo escuro
window.onclick = (event) => {
    if (event.target === modal) {
        fecharModal();
    }
};

// Fecha o modal caso a tecla "Escape (ESC)" seja pressionada
window.onkeydown = (event) => {
    if (event.key === "Escape" && modal.style.display === "flex") {
        fecharModal();
    }
};

// Inicializa os 20 slots de expansão com dados REAIS e linkados ao modal!
function initSlots() {
    const grid = document.getElementById('slots-grid');
    grid.innerHTML = "";

    menuData.forEach((receita, i) => {
        const slot = document.createElement('div');
        slot.className = "slot-card";
        slot.innerHTML = `
            <strong>Slot #${i + 1}</strong>
            ${receita.title}
            <span>🔍 Ver Receita</span>
        `;
        slot.onclick = () => abrirModal(i);
        grid.appendChild(slot);
    });
}

// Chamadas iniciais
create3DMenu();
initSlots();

