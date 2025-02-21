let accessLink = '<a href="interactive-technologies-institute.github.io/covid_dashboard/" target="_blank">interactive-technologies-institute.github.io/covid_dashboard/</a>';

document.getElementById('access-link').innerHTML = accessLink;

let introduction = 'O dashboard SCOPE trata-se de uma ferramenta de visualização geográfica ' +
	'de dados de incidência da COVID-19, desenhada para observar a evolução espacial e temporal da doença com ' +
	'elevada resolução espacial (resolução de 2 Km). <br><br>' +
	'O dashboard foi desenhado para ser intuitivo e simples de utilizar. Quando se acede ao link desta ferramenta, ' +
	'por defeito é apresentada uma janela com o mapa de incidência de COVID-19 no dia 1 de Setembro 2020, com os ' +
	'limites administrativos dos Agrupamentos de Centros de Saúde (ACES) e informação geográfica de base fornecida ' +
	'pelo <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a>, que inclui vias ' +
	'de comunicação principais, limites administrativos, toponímia e cursos de água. <br><br>' +
	'Para além do mapa de risco com a distribuição espacial da incidência cumulativa de COVID-19, os outros mapas ' +
	'disponíveis no dashboard incluem a incerteza espacial associada à incidência estimada e as probabilidades do risco ' +
	'exceder um determinado valor de referência. Outra informação disponível inclui a curva pandémica nacional e as ' +
	'curvas epidémicas dos municípios abrangidos por cada Agrupamento de Centros de Saúde (ACES).';

document.getElementById('intro-text').innerHTML = introduction;

let methods = 'As medidas de incidência e de incerteza representadas nos mapas do dashboard SCOPE, ' +
	'são modeladas a partir da distribuição espacial do número de novos casos confirmados de doença COVID-19 por ' +
	'100 000 habitantes nos 14 dias anteriores ao dia analisado e por concelho (i.e. incidência cumulativa ou proporção ' +
	'da incidência, por concelho). <br><br>' +
	'Os métodos usados para representar a distribuição espacial da incidência cumulativa e a incerteza associada ' +
	'baseiam-se em modelos geoestatísticos e num algoritmo de simulação estocastica conhecido como Simulação Sequencial ' +
	'Directa por Blocos. Os detalhes dos métodos encontram-se em Azevedo e al. ' +
	'(<a href="https://doi.org/10.1186/s12942-020-00221-5" target="_blank">https://doi.org/10.1186/s12942-020-00221-5</a>). ' +
	'No resto desta secção cada passo da metodologia será ilustrado com um mapa ou figura e acompanhado por uma breve descrição.<br><br>' +
	'Como ponto de partida temos os mapas tradicionais de incidência de doenças (designados usualmente por mapas coropléticos), ' +
	'onde o numero de casos é agregado por concelho. Nestes casos, os valores de incidência são constantes dentro de cada concelho ' +
	'e podem apresentar descontinuidades nas fronteiras entre elas (Figura 2.1a).<br><br>' +
	'Em alternativa os mapas geoestatísticos da incidência de doenças (mapas isopléticos) permitem visualizar a distribuição ' +
	'espacial da incidência dos valores de incidência com através da suavização da incidência cumulativa na região de estudo ' +
	'(Figura 2.1b). Esta diferença contribui para reduzir o viés visual e de perceção produzido pelos mapas tradicionais.';

document.getElementById('methods').innerHTML = methods;

let methods2_1a = 'Os métodos geoestatísticos usados no dashboard SCOPE usam como dados de entrada os valores da ' +
	'incidência cumulativa por concelho associados às coordenadas dos centros de massa demográfico dos concelho (Figura 2.2).';

document.getElementById('methods2_1a').textContent = methods2_1a;

let methods2_1b = 'Adicionalmente, para se obterem os mapas com elevada resolução espacial (que no caso ' +
	'do dashboard SCOPE são 2 Km), as áreas dos concelhos são previamente discretizadas numa malha regular de nós. ' +
	'Para além disso, a discretização das áreas por concelho é critica para o algoritmo geoestatístico na medida em que fornece ' +
	'a informação sobre as posições relativas, dimensões e geometrias dos concelhos. Na figura seguinte (Figura 2.3) ' +
	'está ilustrada a malha de nós (pontos cinzentos) para um dado concelho.';

document.getElementById('methods2_1b').textContent = methods2_1b;

let methods2_2a = 'Se um par de concelhos está próximo um do outro, em termos de distância euclideana, ' +
	'espera-se que os valores da incidência sejam parecidos (i.e. que a sua diferença seja pequena). À medida que a distância ' +
	'entre pares de concelhos aumenta, espera-se que os valores de incidência tendam a ser cada vez menos semelhantes ' +
	'(i.e. que a sua diferença seja maior). Esta tendência pode ser quantificada através de um semivariograma (Figura 2.4) que ' +
	'reflecte o mais aproximadamente possível a correlação espacial observada na incidencia cumulativa dos concelhos.';

document.getElementById('methods2_2a').textContent = methods2_2a;

let methods2_2b = 'No cálculo da correlação espacial é dado maior peso à incidência cumulativa fornecida ' +
	'por pares de concelhos com mais população, e menos peso à fornecida por pares de concelhos com menor população ' +
	'(i.e. a medida de correlação espacial é ponderada pela dimensão da população).';

document.getElementById('methods2_2b').textContent = methods2_2b;

let methods2_3a = 'Partindo das componentes previamente obtidas – dados de entrada, modelo de correlação ' +
	'espacial – implementa-se o algoritmo de simulação estocástica designado por Simulação Sequencial Directa por ' +
	'Blocos que irá gerar mapas simulados de incidência cumulativa na malha regular de nós (Figura 2.5).';

document.getElementById('methods2_3a').textContent = methods2_3a;

let methods2_3b = 'Os mapas simulados reproduzem as flutuações da incidência cumulativa observada nos valores' +
	' agregados por concelho, e apresentam estimativas dos parâmetros estatísticos – média, variância, correlação ' +
	'espacial – simillares.';

document.getElementById('methods2_3b').textContent = methods2_3b;

let methods2_4a = 'Vários mapas disponíveis no dashboard SCOPE podem ser obtidos a partir do conjunto ' +
	'de simulações. Um deles, o mapa de incidência cumulativa mediana, descreve a variabilidade espacial em toda a área ' +
	'do mapa, sem apresentar descontinuidades acentuadas nas fronteiras entre concelhos. Isto contribui para reduzir o ' +
	'viés visual e de perceção produzido pelos mapas tradicionais (Figura 2.6).';

document.getElementById('methods2_4a').textContent = methods2_4a;

let methods2_4b = 'Neste mapa, o valor de cada pixel (i.e. nó da malha regular) é o valor mediano ' +
	'calculado com todos os valores simulados no pixel e fornece uma estimativa da incidência cumulativa em cada pixel ' +
	'do mapa (com uma resolução de 2 Km).' +
	'<br><br>' +
	'Porém, quando se usa um mapa de incidência como uma ferramenta para a tomada de decisão, é muito relevante ter ' +
	'uma medida de incerteza da incidência para uma tomada de decisão mais bem informada. Para responder a esta questão, ' +
	'o dashboard SCOPE disponibiliza outros mapas que permitem quantificar a incerteza associada a cada valor  mediano estimado.' +
	'<br><br>' +
	'A incerteza num pixel do mapa é quantificada a partir da distribuição dos valores simulados nesse pixel, para ' +
	'extrair um intervalo de confiança de 95% em torno do valor da incidência cumulativa mediana (Figura 2.7).';

document.getElementById('methods2_4b').innerHTML = methods2_4b;

let methods2_4c = 'Outra medida de incerteza da incidência cumulativa disponível no dashboard SCOPE é ' +
	'dada pelo mapa de incerteza espacial (Figura 2.8). Neste mapa o valor em cada pixel é dado pela amplitude do ' +
	'intervalo interquartil  (3º Quartil – 1º Quartil) das simulações nesse pixel.';

document.getElementById('methods2_4c').textContent = methods2_4c;

let methods2_4d = 'Por fim, o dashboard SCOPE fornece uma medida de incerteza da incidência cumulativa ' +
	'dada pela  probabilidade conjunta (i.e. de todos os pixeis) excederem num determinado dia um valor de corte ' +
	'especificado (neste momento, apenas está implementado para o valor 240 por 100 000 hab.).';

document.getElementById('methods2_4d').textContent = methods2_4d;

let navigation = 'Para fazer zoom (zoom in ou zoom out) numa região, posiciona-se o cursor do rato ' +
	'sobre o local desejado e faz-se scroll com a roda do rato para a frente (zoom in) ou para trás (zoom out).';

document.getElementById('navigation').textContent = navigation;



let metadata = {
	covidCases: {
		title: "Casos COVID-19",
		description: "Os dados da COVID-19 utilizados para a construção desta ferramenta não são de acesso público...",
		year: 2020,
		source: "DGS"
	},
	populationEstimate: {
		title: "Estimativa da População residente",
		year: 2020,
		source: "INE"
	},
	healthFacilities: {
		title: "Equipamentos de Saúde",
		year: "2021-2024",
		source: "INSA"
	},
	educationalFacilities: {
		title: "Equipamentos de Ensino",
		year: 2024,
		source: "OpenStreetMap"
	},
	socialFacilities: {
		title: "Equipamentos Sociais",
		year: 2024,
		source: "OpenStreetMap"
	},
	toponymy: {
		title: "Toponímia",
		year: 2024,
		source: "OpenStreetMap"
	}
};

let images = {
	choroplethMap: "image1.png",
	isoplethMap: "image2.png",
	demographicCentersMap: "image3.png",
	gridMeshMap: "image4.png",
	semivariogram: "image5.png",
	stochasticSimulations: "image6.png",
	geostatisticMap: "image7.png",
	confidenceInterval: "image8.png",
	spatialUncertaintyMap: "image9.png",
	probabilityMap: "image10.png",
	dashboardScreenshot: "image11.png"
};

let functionalities = [
	{ id: 1, name: "Ocultar/mostrar menu", description: "Ferramenta que permite alternar entre ocultar e exibir o menu lateral." },
	{ id: 2, name: "Selector de mapa", description: "Pode selecionar um dos três tipos de mapa: Incidência cumulativa, Incerteza espacial, Probabilidade de excedência." },
	{ id: 3, name: "Controlo deslizante transparência", description: "Serve para ajustar a transparência do mapa." },
	{ id: 4, name: "Selectores de camadas temáticas", description: "Permite visualizar no mapa os limites das ACES, Concelhos e Freguesias." },
	{ id: 5, name: "Gráfico da curva epidémica", description: "Apresenta a curva de evolução temporal da incidência cumulativa da COVID-19 em Portugal." },
	{ id: 6, name: "Grafico da curva epidémica por ACES", description: "Apresenta as curvas de evolução temporal da incidência cumulativa nos concelhos de um ACES selecionado." },
	{ id: 7, name: "Procurar Localidade", description: "Caixa de pesquisa para localizar e recentrar o mapa numa localidade." },
	{ id: 8, name: "Mapa", description: "Visualizar qualquer dos mapas disponíveis no seletor de mapas." },
	{ id: 9, name: "Controlo time lapse", description: "Permite ver uma versão animada do mapa com visualização sequencial de mapas diários." },
	{ id: 10, name: "Caixa texto com valor da medida por pixel", description: "Dá informação sobre o valor da medida no pixel, ACES, Município e Freguesia." },
	{ id: 11, name: "Escala gráfica", description: "Representa as distâncias no mapa." },
	{ id: 12, name: "Ocultar/mostrar manual", description: "Permite alternar entre ocultar e exibir o manual de utilização." },
	{ id: 13, name: "Ocultar/mostrar legenda do mapa", description: "Permite alternar entre ocultar e exibir a legenda de cores do mapa." }
];

