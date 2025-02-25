let accessLink = '<a href="interactive-technologies-institute.github.io/covid_dashboard/" target="_blank">interactive-technologies-institute.github.io/covid_dashboard/</a>';

document.getElementById('access-link').innerHTML = accessLink;

let introduction = 'O Dashboard SCOPE trata-se de uma ferramenta de visualização geográfica de dados de incidência' +
	' da COVID-19, desenhada para observar a evolução espacial e temporal da doença com elevada resolução ' +
	'espacial (resolução de 2 Km).' +
	'<br><br>' +
	'O Dashboard foi desenhado para ser intuitivo e simples de utilizar. Quando se acede ao link desta ferramenta, ' +
	'por defeito é apresentada uma janela com o mapa da incidência de COVID-19 no dia 15 de maio de 2020, com os limites ' +
	'administrativos dos Agrupamentos de Centros de Saúde (ACES), e informação geográfica de base fornecida pelo ' +
	'<a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a>, que inclui vias de comunicação principais, ' +
	'limites administrativos, toponímia e cursos de água.' +
	'<br><br>' +
	'Para além do mapa de risco com a distribuição espacial da incidência cumulativa de COVID-19, os outros mapas disponíveis' +
	' no Dashboard incluem a incerteza espacial associada à incidência estimada e as probabilidades do risco exceder um ' +
	'determinado valor de referência. Outra informação disponível inclui a curva pandémica nacional e as curvas epidémicas ' +
	'dos municípios da área de influência de cada Agrupamento de Centros de Saúde (ACES).';

document.getElementById('intro-text').innerHTML = introduction;

let methods = 'As medidas de incidência e de incerteza representadas nos mapas do Dashboard SCOPE, são modeladas ' +
	'a partir da distribuição espacial do número de novos casos confirmados de COVID-19 por 100 000 habitantes nos 14 dias ' +
	'anteriores ao dia analisado e por concelho (i.e. incidência cumulativa ou proporção de incidência, por concelho).' +
	'<br><br>' +
	'Os métodos usados para representar a distribuição espacial da incidência cumulativa e a incerteza associada baseiam-se ' +
	'em modelos geoestatísticos e num algoritmo de simulação estocastica conhecido como Simulação Sequencial Directa por Blocos. ' +
	'Os detalhes dos métodos encontram-se em Azevedo e al ' +
	'(<a href="https://doi.org/10.1186/s12942-020-00221-5" target="_blank">https://doi.org/10.1186/s12942-020-00221-5</a>). ' +
	'No resto desta secção cada passo da metodologia será ilustrado com um mapa ou figura e acompanhado por uma breve descrição.'+
	'<br><br>' +
	'Como ponto de partida temos os mapas tradicionais de incidência de doenças (designados usualmente por mapas coropléticos), ' +
	'onde o número de casos é agregado por concelho. Nestes casos, os valores de incidência são constantes dentro de cada ' +
	'concelho e podem apresentar descontinuidades nas fronteiras entre eles (Figura 2.1a).' +
	'<br><br>' +
	'Ao contrário dos mapas tradicionais, os mapas geoestatísticos da incidência permitem uma visualização mais contínua ' +
	'e detalhada da distribuição espacial. Através da suavização da incidência cumulativa, estes mapas captam melhor as ' +
	'variações espaciais, evitando as descontinuidades artificiais geradas pela divisão administrativa em concelhos ' +
	'(Figura 2.1b). Esta diferença contribui para reduzir o viés visual e de perceção produzido pelos mapas tradicionais.';

document.getElementById('methods').innerHTML = methods;

let methods2_1a = 'Os métodos geoestatísticos usados no Dashboard SCOPE usam como dados de entrada os valores ' +
	'da incidência cumulativa por concelho associados às coordenadas dos centros de massa demográfico dos concelho (Figura 2.2). ';

document.getElementById('methods2_1a').textContent = methods2_1a;

let methods2_1b = 'Adicionalmente, para se obterem os mapas com elevada resolução espacial (que no caso do ' +
	'Dashboard SCOPE são 2 Km), as áreas dos concelhos são previamente discretizadas numa malha regular de nós. ' +
	'Para além disso, a discretização das áreas por concelho é crítica para o algoritmo geoestatístico na medida em ' +
	'que fornece a informação sobre as posições relativas, dimensões e geometrias dos concelhos. Na figura seguinte ' +
	'(Figura 2.3) está ilustrada a malha de nós (pontos cinzentos) para um dado concelho.';

document.getElementById('methods2_1b').textContent = methods2_1b;

let methods2_2a = 'Se um par de concelhos está próximo um do outro, em termos de distância euclideana, ' +
	'espera-se que os valores da incidência sejam parecidos (i.e. que a sua diferença seja pequena). À medida que ' +
	'a distância entre pares de concelhos aumenta, espera-se que os valores de incidência tendam a ser cada vez menos ' +
	'semelhantes (i.e. que a sua diferença seja maior). Esta tendência pode ser quantificada através de um semivariograma ' +
	'(Figura 2.4) que reflecte o mais aproximadamente possível a correlação espacial observada na incidência cumulativa dos concelhos.';

document.getElementById('methods2_2a').textContent = methods2_2a;

let methods2_2b = 'No cálculo da correlação espacial é dado maior peso à incidência cumulativa fornecida por ' +
	'pares de concelhos com mais população, e menos peso à fornecida por pares de concelhos com menor população ' +
	'(i.e. a medida de correlação espacial é ponderada pela dimensão da população).';

document.getElementById('methods2_2b').textContent = methods2_2b;

let methods2_3a = 'Partindo das componentes previamente obtidas – dados de entrada, modelo de correlação ' +
	'espacial – implementa-se o algoritmo de simulação estocástica designado por Simulação Sequencial Directa por ' +
	'Blocos que irá gerar mapas simulados de incidência cumulativa na malha regular de nós (Figura 2.5). ';

document.getElementById('methods2_3a').textContent = methods2_3a;

let methods2_3b = 'Os mapas simulados reproduzem as flutuações da incidência cumulativa observada nos valores ' +
	'agregados por concelho, e apresentam estimativas dos parâmetros estatísticos – média, variância, correlação ' +
	'espacial – simillares.';

document.getElementById('methods2_3b').textContent = methods2_3b;

let methods2_4a = 'Vários mapas disponíveis no Dashboard SCOPE podem ser obtidos a partir do conjunto de ' +
	'simulações. Um deles, o mapa de incidência cumulativa mediana, descreve a variabilidade espacial em toda a área ' +
	'do mapa, sem apresentar descontinuidades acentuadas nas fronteiras entre concelhos. Isto contribui para reduzir ' +
	'o viés visual e de perceção produzido pelos mapas tradicionais (Figura 2.6).';

document.getElementById('methods2_4a').textContent = methods2_4a;

let methods2_4b = 'Neste mapa, o valor de cada pixel (i.e. nó da malha regular) é o valor mediano calculado ' +
	'com todos os valores simulados no pixel e fornece uma estimativa da incidência cumulativa em cada pixel do mapa ' +
	'(com uma resolução de 2 Km).' +
	'<br><br>' +
	'Porém, quando se usa um mapa de incidência como uma ferramenta para a tomada de decisão, é muito relevante ter ' +
	'uma medida de incerteza da incidência para uma tomada de decisão mais bem informada. Para responder a esta questão, ' +
	'o Dashboard SCOPE disponibiliza outros mapas que permitem quantificar a incerteza associada a cada valor  mediano estimado.' +
	'<br><br>' +
	'A incerteza num pixel do mapa é quantificada a partir da distribuição dos valores simulados nesse pixel, para ' +
	'extrair um intervalo de confiança de 95% em torno do valor da incidência cumulativa mediana (Figura 2.7).';

document.getElementById('methods2_4b').innerHTML = methods2_4b;

let methods2_4c = 'Outra medida de incerteza da incidência cumulativa disponível no Dashboard SCOPE é ' +
	'dada pelo mapa de incerteza espacial (Figura 2.8). Neste mapa o valor em cada pixel é dado pela amplitude do ' +
	'intervalo interquartil  (3º Quartil – 1º Quartil) das simulações nesse pixel.';

document.getElementById('methods2_4c').textContent = methods2_4c;

let methods2_4d = 'Por fim, o Dashboard SCOPE fornece uma medida de incerteza da incidência cumulativa dada pela ' +
	'probabilidade conjunta (i.e. de todos os pixeis) excederem num determinado dia um valor de corte especificado ' +
	'(neste momento, apenas está implementado para o valor 240 por 100 000 hab.).';

document.getElementById('methods2_4d').textContent = methods2_4d;


