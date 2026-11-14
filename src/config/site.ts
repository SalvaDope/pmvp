/**
 * PMVP — Ficheiro Único de Configuração do Website
 * ----------------------------------------------------------------------------
 * Edite aqui preços, contactos, concelhos, sócios, FAQs, textos legais e
 * identificadores de analytics sem precisar de alterar os templates do site.
 *
 * Nota: Todos os valores entre [PARÊNTESES RETOS] são marcadores provisórios
 * a substituir antes da publicação final.
 */

export interface ProductConfig {
  id: 'raio-x' | 'estudo' | 'valor' | 'pip';
  name: string;
  shortName: string;
  priceDisplay: string;
  vatLabel: string;
  placeholderTag: string;
  turnaround: string;
  notes: string;
  summary: string;
  href: string;
  ctaLabel: string;
  ctaHref: string;
  badge?: string;
}

export interface FounderConfig {
  name: string;
  role: string;
  bioPlaceholder: string;
  imagePlaceholder: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ArticleConfig {
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  publishedLabel: string;
  readingTime: string;
  excerpt: string;
  imagePlaceholder: string;
  keyTakeaways: string[];
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
  placeholderNotice: string;
}

export const SITE_CONFIG = {
  brand: {
    name: 'PMVP',
    descriptor: 'Terrenos & Urbanismo',
    descriptorAlt: 'Consultoria de Terrenos e Urbanismo',
    slogan: 'Descobrimos o potencial. Desenvolvemos o valor.',
    regionLabel: 'Grande Lisboa',
    logoPlaceholder: '[LOGO SVG: PMVP — Terrenos & Urbanismo]',
  },

  /**
   * Contactos, Identificação Fiscal e Marcadores
   */
  contact: {
    domain: '[DOMÍNIO]',
    siteUrl: 'https://pmvp.pt', // URL base técnica para canonicals e sitemap até substituição de [DOMÍNIO]
    teamEmail: '[EMAIL_EQUIPA]',
    privacyEmail: '[EMAIL_PRIVACIDADE]',
    phone: '[TELEFONE]',
    whatsapp: '[TELEFONE]',
    entity: '[ENTIDADE]',
    nif: '[NIF]',
    address: '[MORADA]',
  },

  /**
   * Concelhos-piloto da Grande Lisboa
   */
  geography: {
    pilotPlaceholder: '[CONCELHOS_PILOTO]',
    pilotDescription: 'Grande Lisboa ([CONCELHOS_PILOTO])',
    municipalities: [
      '[CONCELHOS_PILOTO]',
      'Lisboa',
      'Sintra',
      'Cascais',
      'Oeiras',
      'Loures',
      'Mafra',
      'Odivelas',
      'Amadora',
      'Vila Franca de Xira',
      'Almada',
      'Seixal',
      'Sesimbra',
      'Palmela',
      'Setúbal',
      'Montijo',
      'Alcochete',
      'Barreiro',
      'Moita',
    ],
  },

  /**
   * Produtos e Preços (Consumidores — IVA incluído)
   */
  products: {
    raioX: {
      id: 'raio-x',
      name: 'Raio-X do Terreno',
      shortName: 'Raio-X',
      priceDisplay: '190 €',
      vatLabel: '(IVA incl.)',
      placeholderTag: '[a confirmar]',
      turnaround: '5 dias úteis',
      notes: 'O valor desconta no Estudo de Viabilidade se o cliente avançar em 90 dias',
      summary:
        'A primeira leitura técnica da classificação do solo no PDM e das principais condicionantes (RAN, REN, servidões), com semáforo de viabilidade e recomendação do passo seguinte.',
      href: '/raio-x',
      ctaLabel: 'Pedir Raio-X',
      ctaHref: '/submeter-terreno?produto=raio-x',
      badge: 'Produto de entrada',
    } satisfies ProductConfig,

    estudo: {
      id: 'estudo',
      name: 'Estudo de Viabilidade',
      shortName: 'Estudo de Viabilidade',
      priceDisplay: 'desde 1.190 €',
      vatLabel: '(IVA incl.)',
      placeholderTag: '[a confirmar]',
      turnaround: '2–3 semanas',
      notes: 'Inclui reunião de entrega',
      summary:
        'Análise completa do regulamento do PDM, sobreposição cartográfica de condicionantes, verificação documental (cadastro/BUPi, matriz e registo) e cenários viáveis com recomendação estratégica.',
      href: '/estudo-de-viabilidade',
      ctaLabel: 'Pedir Estudo de Viabilidade',
      ctaHref: '/submeter-terreno?produto=estudo',
      badge: 'Análise completa',
    } satisfies ProductConfig,

    valor: {
      id: 'valor',
      name: 'Estimativa de valor por cenário',
      shortName: 'Estimativa de Valor',
      priceDisplay: '+ 690 €',
      vatLabel: '(IVA incl.)',
      placeholderTag: '[a confirmar]',
      turnaround: '+1 semana',
      notes: 'Extra ao Estudo',
      summary:
        'Análise comparativa de mercado para apoio à decisão: quanto vale hoje o terreno no seu estado atual e quanto pode valer em cada cenário de uso viável.',
      href: '/estudo-de-viabilidade#estimativa-valor',
      ctaLabel: 'Pedir Estudo + Valor',
      ctaHref: '/submeter-terreno?produto=estudo',
      badge: 'Complemento ao Estudo',
    } satisfies ProductConfig,

    pip: {
      id: 'pip',
      name: 'Pedido de Informação Prévia (PIP)',
      shortName: 'PIP',
      priceDisplay: 'Sob proposta',
      vatLabel: '',
      placeholderTag: '',
      turnaround: '—',
      notes: 'Só depois do Estudo',
      summary:
        'Preparação, submissão e acompanhamento do Pedido de Informação Prévia junto da Câmara Municipal, com arquitetos parceiros, até à decisão municipal.',
      href: '/servicos#pip',
      ctaLabel: 'Saber mais sobre o PIP',
      ctaHref: '/submeter-terreno?produto=aconselhamento',
      badge: 'Fase de concretização',
    } satisfies ProductConfig,
  },

  /**
   * Opções do Formulário "Submeter Terreno"
   */
  formOptions: {
    profiles: [
      {
        id: 'proprietario',
        label: 'Proprietário',
        description: 'Sou proprietário(a) do terreno e quero conhecer o seu potencial ou valorizá-lo.',
      },
      {
        id: 'comprar',
        label: 'Vou comprar',
        description: 'Estou a avaliar um terreno para compra e quero segurança antes de avançar.',
      },
      {
        id: 'heranca',
        label: 'Herdeiro',
        description: 'Recebi ou partilho um terreno de herança e preciso de saber o que permite e quanto vale.',
      },
      {
        id: 'profissional',
        label: 'Profissional (mediador/advogado/solicitador/outro)',
        description: 'Represento ou assessoro um cliente na compra, venda ou gestão de um terreno.',
      },
    ],
    objectives: [
      { id: 'habitacao', label: 'Construir habitação' },
      { id: 'industria-logistica', label: 'Indústria/logística' },
      { id: 'agricola', label: 'Uso agrícola' },
      { id: 'vender', label: 'Vender' },
      { id: 'comprar', label: 'Comprar' },
      { id: 'nao-sei', label: 'Ainda não sei' },
    ],
    serviceChoices: [
      {
        id: 'raio-x',
        label: 'Raio-X (190 €)',
        sublabel: 'Primeira leitura técnica em 5 dias úteis · valor descontado no Estudo (90 dias) [a confirmar]',
      },
      {
        id: 'estudo',
        label: 'Estudo de Viabilidade (desde 1.190 €)',
        sublabel: 'Análise regulamentar, cartográfica e documental completa + reunião de entrega [a confirmar]',
      },
      {
        id: 'aconselhamento',
        label: 'Não sei, quero aconselhamento',
        sublabel: 'Ajudamo-lo a escolher o serviço adequado após analisar os dados do terreno',
      },
    ],
    contactPreferences: [
      { id: 'email', label: 'E-mail' },
      { id: 'telefone', label: 'Telefone' },
      { id: 'whatsapp', label: 'WhatsApp' },
    ],
  },

  /**
   * Sócios / Equipa (Página Sobre)
   */
  founders: [
    {
      name: 'Francisco Monteiro',
      role: 'Direção técnica',
      bioPlaceholder: '[BIO: experiência em gestão fundiária, condicionantes e licenciamento]',
      imagePlaceholder: '[IMG: Fotografia de Francisco Monteiro — Direção técnica]',
    },
    {
      name: 'Salvador Vaz Pinto',
      role: 'Direção comercial e operações',
      bioPlaceholder: '[BIO]',
      imagePlaceholder: '[IMG: Fotografia de Salvador Vaz Pinto — Direção comercial e operações]',
    },
  ] satisfies FounderConfig[],

  /**
   * Valores da Marca
   */
  values: [
    {
      title: 'Independência',
      description: 'Não prometemos potencial construtivo sem fundamento. Se não der para construir, dizemos com clareza.',
    },
    {
      title: 'Rigor',
      description: 'Cruzamos PDM, cartas de condicionantes, cadastro, BUPi e legislação urbanística atualizada.',
    },
    {
      title: 'Clareza',
      description: 'Traduzimos regulamentos municipais e servidões administrativas em relatórios objetivos e acionáveis.',
    },
    {
      title: 'Concretização',
      description: 'Quando há viabilidade, apoiamos o passo seguinte junto da Câmara Municipal com arquitetos parceiros.',
    },
  ],

  /**
   * Perguntas Frequentes (FAQ)
   */
  faqs: [
    {
      question: 'O Raio-X diz-me se posso construir?',
      answer:
        'Dá-lhe uma primeira leitura fundamentada: em que solo está o terreno, que condicionantes tem e se a viabilidade parece favorável, condicionada ou desfavorável. A confirmação formal só a Câmara a pode dar, através de um PIP.',
    },
    {
      question: 'Os vossos estudos substituem a Câmara Municipal?',
      answer:
        'Não. Baseiam-se em informação oficial e na legislação em vigor, mas não são uma decisão vinculativa. Servem para decidir com conhecimento e preparar bem o passo seguinte.',
    },
    {
      question: 'E se o terreno não tiver cadastro?',
      answer:
        'Trabalhamos com o BUPi e com a documentação que tiver. Se for preciso levantamento topográfico, indicamos o custo antes de avançar.',
    },
    {
      question: 'Trabalham fora da Grande Lisboa?',
      answer:
        'O nosso foco são [CONCELHOS_PILOTO], mas analisamos pedidos de outras zonas caso a caso.',
    },
    {
      question: 'O que acontece se o terreno for viável?',
      answer:
        'Recomendamos o passo seguinte, normalmente um PIP, e podemos acompanhá-lo com arquitetos parceiros.',
    },
    {
      question: 'Fazem avaliações para o banco?',
      answer:
        'Não. A nossa estimativa de valor é um estudo de mercado para apoio à decisão, não uma avaliação bancária.',
    },
  ] satisfies FaqItem[],

  /**
   * Artigos do Blog (/recursos)
   */
  articles: [
    {
      slug: 'posso-construir-num-terreno-rustico-o-que-diz-a-lei',
      title: 'Posso construir num terreno rústico? O que diz a lei',
      category: 'Legislação & PDM',
      publishedAt: '2026-11-10',
      publishedLabel: '10 Nov 2026',
      readingTime: '6 min de leitura',
      excerpt:
        'Ter um terreno classificado como solo rústico não significa automaticamente que nada pode ser edificado, mas as regras são estritas. Perceba o que distingue classificação fiscal de classificação urbanística.',
      imagePlaceholder: '[IMG: Excerto de planta de ordenamento do PDM com distinção entre solo urbano e solo rústico]',
      keyTakeaways: [
        'A classificação na caderneta predial (rústico vs. urbano) é fiscal e não determina por si só a capacidade construtiva.',
        'É o Plano Diretor Municipal (PDM) que define o que pode ser edificado em cada categoria e subcategoria de solo.',
        'Em solo rústico, a edificação é, por regra, excecional e associada a apoio agrícola, turismo em espaço rural, equipamentos ou atividades específicas previstas no PDM.',
      ],
      sections: [
        {
          heading: '1. Prédio rústico nas Finanças não é o mesmo que solo rústico no PDM',
          paragraphs: [
            'Um dos erros mais frequentes na compra ou avaliação de terrenos em Portugal consiste em confundir a classificação inscrita na Caderneta Predial (Autoridade Tributária) com a classificação urbanística do Plano Diretor Municipal (PDM).',
            'Um terreno pode estar inscrito nas Finanças como prédio rústico e, ainda assim, encontrar-se total ou parcialmente inserido em solo urbano no PDM em vigor — ou vice-versa.',
          ],
        },
        {
          heading: '2. Quando é permitida construção em solo rústico?',
          paragraphs: [
            'Nos termos do Regime Jurídico dos Instrumentos de Gestão Territorial (RJIGT) e dos regulamentos municipais, o solo rústico destina-se essencialmente a funções agrícolas, pecuárias, florestais, de conservação da natureza e de exploração de recursos geológicos.',
            'Contudo, muitos PDM admitem edificação em solo rústico sob condições rigorosas: instalações de apoio à atividade agrícola ou agroindustrial, habitação própria do agricultor (quando comprovada e cumprindo áreas mínimas de parcela), empreendimentos de Turismo no Espaço Rural (TER) ou espaços de atividades económicas específicos.',
          ],
        },
        {
          heading: '3. O peso das condicionantes: RAN, REN e servidões',
          paragraphs: [
            'Mesmo quando o regulamento do PDM prevê determinado índice de construção, a presença de Reserva Agrícola Nacional (RAN), Reserva Ecológica Nacional (REN), linhas de água do domínio hídrico ou faixas de proteção a infraestruturas pode inviabilizar ou restringir a implantação.',
          ],
        },
      ],
      placeholderNotice: '[ARTIGO EM REVISÃO EDITORIAL — Conteúdo técnico marcador a validar antes da publicação]',
    },
    {
      slug: 'ran-e-ren-explicadas-o-que-sao-e-como-afetam-o-seu-terreno',
      title: 'RAN e REN explicadas: o que são e como afetam o seu terreno',
      category: 'Condicionantes',
      publishedAt: '2026-11-08',
      publishedLabel: '8 Nov 2026',
      readingTime: '7 min de leitura',
      excerpt:
        'A Reserva Agrícola Nacional (RAN) e a Reserva Ecológica Nacional (REN) são duas das condicionantes mais determinantes na viabilidade de um terreno. Saiba como funcionam e que exceções existem.',
      imagePlaceholder: '[IMG: Carta de condicionantes com manchas de RAN e REN sobrepostas a ortofoto]',
      keyTakeaways: [
        'A RAN protege os solos de maior aptidão agrícola; a REN protege ecossistemas fundamentais, linhas de água, zonas ameaçadas pelas cheias e escarpas.',
        'Ambas constituem restrições de utilidade pública que se sobrepõem ao zonamento do PDM.',
        'Existem regimes de utilização não agrícola (RAN) e de ações compatíveis (REN), mas exigem cumprimento de requisitos legais estritos e pareceres de entidades externas.',
      ],
      sections: [
        {
          heading: '1. O que é a Reserva Agrícola Nacional (RAN)?',
          paragraphs: [
            'A RAN abrange os solos que apresentam maior aptidão para a produção agrícola. Em regra, os solos integrados na RAN estão afetos à agricultura, sendo interditas ações que diminuam ou destruam as suas potencialidades.',
            'A lei prevê, porém, exceções sujeitas a parecer prévio vinculativo da Entidade Regional da Reserva Agrícola — por exemplo, obras com finalidade agrícola, ampliação de construções existentes ou habitação para residência própria de agricultores sob condições específicas.',
          ],
        },
        {
          heading: '2. O que é a Reserva Ecológica Nacional (REN)?',
          paragraphs: [
            'A REN é uma estrutura biofísica que integra áreas de valor e sensibilidade ecológicos ou expostas a riscos naturais (como leitos de cursos de água, zonas ameaçadas pelas cheias, cabeceiras de linhas de água e áreas de máxima infiltração).',
            'Dependendo da tipologia de REN afetada, determinadas ações podem ser interditas, enquanto outras podem ser admitidas mediante comunicação prévia ou autorização da CCDR territorialmente competente.',
          ],
        },
        {
          heading: '3. Porque importa verificar a sobreposição exata da parcela',
          paragraphs: [
            'Em muitos terrenos de média ou grande dimensão, a RAN ou a REN ocupam apenas parte da parcela. Identificar com rigor cartográfico a zona livre de condicionantes é frequentemente a chave para encontrar o polígono onde é viável implantar uma edificação.',
          ],
        },
      ],
      placeholderNotice: '[ARTIGO EM REVISÃO EDITORIAL — Conteúdo técnico marcador a validar antes da publicação]',
    },
    {
      slug: 'o-que-e-um-pip-e-quando-vale-a-pena-pedi-lo',
      title: 'O que é um PIP e quando vale a pena pedi-lo',
      category: 'Licenciamento',
      publishedAt: '2026-11-05',
      publishedLabel: '5 Nov 2026',
      readingTime: '5 min de leitura',
      excerpt:
        'O Pedido de Informação Prévia (PIP) vincula a Câmara Municipal quanto à viabilidade de uma operação urbanística. Perceba quando compensa avançar e porque não deve fazê-lo às cegas.',
      imagePlaceholder: '[IMG: Planta de implantação esquemática para instrução de Pedido de Informação Prévia]',
      keyTakeaways: [
        'O PIP permite obter uma decisão formal e vinculativa da Câmara Municipal sobre a viabilidade de construir ou alterar o uso de um terreno.',
        'Qualquer interessado (mesmo quem ainda não é proprietário) pode requerer um PIP sobre um terreno.',
        'Submeter um PIP sem um estudo prévio de viabilidade aumenta o risco de parecer desfavorável por falhas no enquadramento regulamentar.',
      ],
      sections: [
        {
          heading: '1. Para que serve o Pedido de Informação Prévia?',
          paragraphs: [
            'Previsto no Regime Jurídico da Urbanização e Edificação (RJUE), o PIP é o instrumento através do qual qualquer interessado pede à Câmara Municipal informação sobre a viabilidade de realizar determinada operação urbanística e respetivos condicionalismos legais ou regulamentares.',
            'Quando favorável, a decisão do PIP vincula as entidades competentes durante o prazo legalmente estabelecido, conferindo segurança jurídica para comprar, vender ou avançar para projeto de arquitetura.',
          ],
        },
        {
          heading: '2. Quando vale a pena pedir um PIP?',
          paragraphs: [
            'O PIP é especialmente útil antes de celebrar a escritura de compra de um terreno (ou como condição suspensiva num CPCV), na valorização de um terreno para venda a promotores ou particulares, e sempre que o enquadramento no PDM exija consulta a entidades externas.',
          ],
        },
        {
          heading: '3. O papel do Estudo de Viabilidade antes do PIP',
          paragraphs: [
            'Um PIP mal instruído ou que peça parâmetros incompatíveis com o PDM recebe resposta negativa. Analisar primeiro o regulamento, as condicionantes e os usos admissíveis permite desenhar a estratégia certa antes de dar entrada na Câmara.',
          ],
        },
      ],
      placeholderNotice: '[ARTIGO EM REVISÃO EDITORIAL — Conteúdo técnico marcador a validar antes da publicação]',
    },
    {
      slug: 'lei-dos-solos-reclassificacao-de-rustico-para-urbano-em-linguagem-simples',
      title: 'Lei dos solos: reclassificação de rústico para urbano, em linguagem simples',
      category: 'Legislação & PDM',
      publishedAt: '2026-11-02',
      publishedLabel: '2 Nov 2026',
      readingTime: '8 min de leitura',
      excerpt:
        'Como funciona a reclassificação de solo rústico para solo urbano à luz das regras atuais? Explicamos os critérios legais, os limites e o que mudou na legislação recente.',
      imagePlaceholder: '[IMG: Limite de perímetro urbano sobre ortofoto e áreas de expansão contíguas]',
      keyTakeaways: [
        'A reclassificação de solo rústico para urbano tem carácter excecional e depende de decisão municipal fundamentada.',
        'A contiguidade com o solo urbano existente, a existência de infraestruturas e a demonstração de viabilidade económico-financeira são critérios centrais.',
        'Áreas abrangidas por determinadas condicionantes críticas continuam sujeitas a fortes restrições.',
      ],
      sections: [
        {
          heading: '1. A regra geral: distinção entre solo urbano e solo rústico',
          paragraphs: [
            'A legislação portuguesa de ordenamento do território assenta na distinção direta entre solo urbano (já urbanizado ou programado) e solo rústico. A passagem de solo rústico para urbano não é um direito automático do proprietário: exige um procedimento formal de reclassificação.',
          ],
        },
        {
          heading: '2. Que terrenos têm potencial para reclassificação?',
          paragraphs: [
            'Apenas parcelas que cumpram requisitos específicos de localização (como contiguidade com a malha urbana consolidada), acesso a infraestruturas gerais e enquadramento nos objetivos de habitação ou atividades económicas do município têm condições técnicas para serem ponderadas.',
          ],
        },
        {
          heading: '3. Como avaliar se o seu terreno cumpre os requisitos',
          paragraphs: [
            'Antes de iniciar contactos formais, é essencial verificar a carta de ordenamento, a carta de condicionantes e o regulamento municipal para aferir se existem alternativas mais diretas no próprio regime atual do PDM.',
          ],
        },
      ],
      placeholderNotice: '[ARTIGO EM REVISÃO EDITORIAL — Conteúdo técnico marcador a validar antes da publicação]',
    },
    {
      slug: 'como-consultar-o-pdm-do-seu-concelho',
      title: 'Como consultar o PDM do seu concelho',
      category: 'Guias Práticos',
      publishedAt: '2026-10-28',
      publishedLabel: '28 Out 2026',
      readingTime: '6 min de leitura',
      excerpt:
        'O Plano Diretor Municipal é composto por plantas e por um regulamento extenso. Veja que documentos deve procurar no portal da Câmara e porque a leitura isolada do mapa pode induzir em erro.',
      imagePlaceholder: '[IMG: Legenda técnica de Planta de Ordenamento de PDM municipal]',
      keyTakeaways: [
        'Um PDM nunca se lê apenas pelo mapa: é indispensável cruzar a Planta de Ordenamento, a Planta de Condicionantes e o Regulamento.',
        'Cada cor ou trama no mapa remete para artigos específicos do Regulamento onde constam índices, cérceas, afastamentos e áreas mínimas.',
        'Alterações, revisões ou suspensões parciais do PDM podem modificar as regras aplicáveis a uma parcela específica.',
      ],
      sections: [
        {
          heading: '1. Os três elementos fundamentais de qualquer PDM',
          paragraphs: [
            'Para analisar um terreno no PDM do seu concelho, precisa sempre de consultar três peças em simultâneo: a Planta de Ordenamento (que define a classificação e qualificação do solo), a Planta de Condicionantes (que identifica servidões e restrições de utilidade pública) e o Regulamento do PDM.',
          ],
        },
        {
          heading: '2. O perigo de olhar apenas para a cor da planta',
          paragraphs: [
            'Duas parcelas com a mesma cor na Planta de Ordenamento podem ter viabilidades completamente distintas devido à dimensão mínima de parcela exigida pelo regulamento, à frente mínima para via pública infraestruturada ou à sobreposição de uma condicionante.',
          ],
        },
        {
          heading: '3. Quando recorrer a uma análise técnica independente',
          paragraphs: [
            'Se está prestes a tomar uma decisão de compra, partilha ou investimento, o Raio-X do Terreno ou o Estudo de Viabilidade sintetizam toda esta informação em linguagem clara e com cartografia rigorosa.',
          ],
        },
      ],
      placeholderNotice: '[ARTIGO EM REVISÃO EDITORIAL — Conteúdo técnico marcador a validar antes da publicação]',
    },
    {
      slug: 'terreno-sem-cadastro-o-que-e-o-bupi-e-como-funciona',
      title: 'Terreno sem cadastro? O que é o BUPi e como funciona',
      category: 'Documentação & Cadastro',
      publishedAt: '2026-10-22',
      publishedLabel: '22 Out 2026',
      readingTime: '5 min de leitura',
      excerpt:
        'Muitos proprietários não sabem onde começam e acabam formalmente as estremas do seu terreno. Descubra a diferença entre cadastro predial, BUPi, matriz e registo predial.',
      imagePlaceholder: '[IMG: Polígono cadastral georreferenciado sobre fotografia aérea]',
      keyTakeaways: [
        'A Caderneta Predial e a Certidão do Registo Predial frequentemente têm áreas desatualizadas ou divergentes da realidade física.',
        'Nos concelhos com Cadastro Geométrico da Propriedade Rústica (CGPR) ou SiNErGIC, os limites oficiais constam das secções cadastrais da DGT.',
        'O BUPi (Balcão Único do Prédio) permite georreferenciar a representação gráfica dos prédios rústicos e mistos nos concelhos aderentes.',
      ],
      sections: [
        {
          heading: '1. Cadastro Predial vs. BUPi: qual a diferença?',
          paragraphs: [
            'Em Portugal coexistem concelhos com cadastro predial oficial (onde cada parcela rústica tem uma secção e número cadastral na Direção-Geral do Território) e concelhos sem cadastro geométrico anterior, onde o BUPi permite a Representação Gráfica Georreferenciada (RGG).',
          ],
        },
        {
          heading: '2. E se as áreas da caderneta e do registo não coincidirem?',
          paragraphs: [
            'Divergências de área entre a matriz fiscal, a descrição predial na Conservatória e o levantamento no terreno são muito comuns. Antes de vender, partilhar ou submeter um pedido à Câmara, é fundamental verificar se a divergência está dentro das tolerâncias legais ou se exige retificação.',
          ],
        },
      ],
      placeholderNotice: '[ARTIGO EM REVISÃO EDITORIAL — Conteúdo técnico marcador a validar antes da publicação]',
    },
    {
      slug: 'comprar-um-terreno-7-verificacoes-antes-do-cpcv',
      title: 'Comprar um terreno: 7 verificações antes do CPCV',
      category: 'Comprar Terreno',
      publishedAt: '2026-10-15',
      publishedLabel: '15 Out 2026',
      readingTime: '7 min de leitura',
      excerpt:
        'Assinar um Contrato-Promessa de Compra e Venda sem confirmar a viabilidade urbanística e documental é o erro mais caro na compra de um terreno. Conheça a lista de verificação essencial.',
      imagePlaceholder: '[IMG: Sobreposição de limites de parcela, acessos viários e condicionantes]',
      keyTakeaways: [
        'Nunca confie apenas na descrição comercial do anúncio ("terreno com viabilidade de construção").',
        'Confirme sempre a classificação no PDM, as condicionantes (RAN, REN, servidões), o acesso a via pública infraestruturada e a harmonia documental.',
        'Considere incluir cláusulas de salvaguarda ou realizar um Estudo de Viabilidade antes de entregar o sinal no CPCV.',
      ],
      sections: [
        {
          heading: '1.As 7 verificações essenciais antes de assinar',
          paragraphs: [
            '1) Classificação e qualificação no PDM em vigor; 2) Ausência de condicionantes impeditivas (RAN, REN, domínio hídrico, linhas de alta tensão); 3) Frente e acesso por via pública habilitante; 4) Coerência de áreas entre Caderneta Predial, Certidão Permanente e Cadastro; 5) Inexistência de ónus, encargos ou direitos de preferência; 6) Declives, orientação solar e custos de infraestruturação; 7) Validade de eventual PIP anunciado pelo vendedor.',
          ],
        },
        {
          heading: '2. Como proteger o seu investimento em 5 dias úteis',
          paragraphs: [
            'Antes de fazer uma proposta ou avançar para CPCV, o Raio-X do Terreno permite descartar rapidamente terrenos inviáveis, enquanto o Estudo de Viabilidade aprofunda todos os parâmetros regulamentares e documentais.',
          ],
        },
      ],
      placeholderNotice: '[ARTIGO EM REVISÃO EDITORIAL — Conteúdo técnico marcador a validar antes da publicação]',
    },
    {
      slug: 'herdei-um-terreno-por-onde-comecar',
      title: 'Herdei um terreno: por onde começar',
      category: 'Heranças & Património',
      publishedAt: '2026-10-08',
      publishedLabel: '8 Out 2026',
      readingTime: '6 min de leitura',
      excerpt:
        'Recebeu um terreno por herança e não sabe onde fica exatamente, o que lá se pode fazer ou quanto vale? Veja os passos práticos para identificar, regularizar e avaliar o património.',
      imagePlaceholder: '[IMG: Identificação cartográfica de parcelas rústicas familiares sobre ortofoto]',
      keyTakeaways: [
        'O primeiro passo é reunir a Caderneta Predial e localizar geograficamente a parcela através da secção cadastral, BUPi ou confrontações.',
        'Conhecer o potencial urbanístico real evita vender abaixo do valor ou criar expectativas irreais entre herdeiros.',
        'Um relatório técnico independente ajuda todos os herdeiros a decidirem sobre a mesma base factual: partilhar, vender ou valorizar.',
      ],
      sections: [
        {
          heading: '1. Localizar e atualizar a documentação do terreno',
          paragraphs: [
            'Em muitas heranças, os herdeiros dispõem apenas de uma relação de bens ou de cadernetas prediais antigas. Identificar os limites no mapa e cruzar a matriz com a Conservatória do Registo Predial é o ponto de partida indispensável.',
          ],
        },
        {
          heading: '2. Avaliar com critério antes de partilhar ou vender',
          paragraphs: [
            'O valor de um terreno depende diretamente do que o PDM permite fazer nele. Uma análise técnica acompanhada de estimativa de valor por cenário permite que todos os herdeiros tomem decisões informadas e justas.',
          ],
        },
      ],
      placeholderNotice: '[ARTIGO EM REVISÃO EDITORIAL — Conteúdo técnico marcador a validar antes da publicação]',
    },
  ] satisfies ArticleConfig[],

  /**
   * Textos Legais e Regulamentares (Rodapé e Páginas Legais)
   */
  legal: {
    validationBanner:
      '[TEXTO MARCADOR — A VALIDAR POR UM ADVOGADO ANTES DE PUBLICAR]',
    complaintsBookUrl: 'https://www.livroreclamacoes.pt',
    ralNotice:
      'Em caso de litígio de consumo, o consumidor pode recorrer a uma Entidade de Resolução Alternativa de Litígios de Consumo (RAL), nomeadamente ao Centro de Arbitragem de Conflitos de Consumo de Lisboa (CACCL — www.centroarbitragemlisboa.pt) ou consultar a lista atualizada no Portal do Consumidor (www.consumidor.gov.pt), nos termos da Lei n.º 144/2015.',
    privacy: {
      controllerEntity: '[ENTIDADE, NIF, MORADA]',
      privacyEmail: '[EMAIL_PRIVACIDADE]',
      retentionPeriod:
        'Os dados relativos a pedidos de proposta sem adjudicação são conservados durante 12 meses; os dados relativos a serviços prestados e faturação são conservados pelo prazo legal de 10 anos; os dados para comunicações informativas são conservados até retirada do consentimento.',
      subprocessors: [
        'Alojamento web e infraestrutura serverless (Vercel / Netlify)',
        'Serviço de envio transacional de e-mail',
        'Base de gestão de pedidos (Google Workspace / Airtable / Supabase)',
        'Ferramentas de analítica web e publicidade (Google Analytics 4, Google Ads, Meta Pixel — apenas mediante consentimento)',
      ],
    },
  },

  /**
   * Configuração de Analytics & Pixels (só disparam após consentimento RGPD)
   */
  analytics: {
    ga4MeasurementId: 'G-XXXXXXXXXX', // Substituir pelo ID real GA4
    googleAdsId: 'AW-XXXXXXXXXX', // Substituir pelo ID real Google Ads
    googleAdsConversionLabel: 'AW-XXXXXXXXXX/YYYYYYYYYY',
    metaPixelId: '000000000000000', // Substituir pelo ID real Meta Pixel
  },
} as const;
