// --- TEXTOS COMPLETOS DE CAPACIDADES E CONHECIMENTOS (MSEP OFICIAL) ---
export const SAMPLE_PLANS: TeachingPlan[] = [
  {
    id: 'fusi-plan-gea',
    courseName: 'Mecânico de Usinagem Convencional',
    profileId: 'ricardo-gea', // Perfil do Ricardo GeA
    units: [
      {
        id: 'fusi',
        name: 'Fundamentos da Usinagem (FUSI)',
        hours: 240,
        capacities: [
          "1. Selecionar ferramentas aplicadas na montagem e desmontagem de elementos de máquina.",
          "2. Relacionar os processos de fabricação à sua aplicação na indústria.",
          "3. Relacionar os tipos de manutenção à sua aplicação na indústria.",
          "4. Elaborar plano de trabalho de acordo com normas e procedimentos de meio ambiente, de saúde e segurança no trabalho.",
          "5. Definir os parâmetros de usinagem de torneamento e fresagem convencional de acordo com as especificações técnicas.",
          "6. Realizar operações de baixa complexidade em torno convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.",
          "7. Realizar operações de baixa complexidade em fresadora convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.",
          "8. Realizar operações de furação de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.",
          "9. Realizar operações de rosqueamento de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.",
          "10. Realizar operações de ajustagem em peças por meio de ferramentas manuais de acordo com as especificações e normas técnicas e de saúde e segurança no trabalho.",
          "11. Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.",
          "12. Aplicar os procedimentos de refrigeração nos processos de torneamento e fresagem convencional."
        ],
        knowledges: [
          "1. ELEMENTOS DE MÁQUINA: 1.1 Elementos de fixação; 1.2 Elementos de transmissão; 1.3 Elementos de vedação; 1.4 Elementos de apoio; 1.5 Elementos de instalação; 1.6 Elementos elásticos.",
          "2. FERRAMENTAS: 2.1 Manuais; 2.2 Elétricas ou eletrônicas; 2.3 Pneumáticas; 2.4 Portáteis.",
          "3. PROCESSOS DE FABRICAÇÃO: 3.1 Definição; 3.2 Injeção; 3.3 Manufatura Subtrativa; 3.4 Manufatura aditiva; 3.5 Conformação mecânica.",
          "4. MANUTENÇÃO: 4.1 Definição; 4.2 Aplicação; 4.3 Tipos de intervenção; 4.4 Tipos de ocorrências; 4.5 Documentação técnica.",
          "5. PLANO DE TRABALHO: 5.1 Definição; 5.2 Tipos; 5.3 Características.",
          "6. SEGURANÇA: 6.1 Riscos; 6.2 Equipamentos de proteção; 6.3 Normas regulamentadoras; 6.4 Sinalização; 6.5 ART; 6.6 APR; 6.7 FDS.",
          "7. MEIO AMBIENTE: 7.1 Definição; 7.2 Normalização; 7.3 Segregação e descarte de resíduos.",
          "8. PARÂMETROS DE CORTE PARA USINAGEM: 8.1 Cálculos (RPM, Vc, f, ap).",
          "9. PARÂMETROS DE FERRAMENTA: 9.1 Material; 9.2 Geometria; 9.3 Número de insertos/dentes (z); 9.4 Raio de ponta (rε).",
          "10. TORNEAMENTO: 10.1 Definição; 10.2 Tipos de tornos; 10.3 Ferramentas; 10.4 Acessórios; 10.5 Cálculos técnicos; 10.6 Operações.",
          "11. FRESAGEM: 11.1 Definição; 11.2 Tipos de fresadora; 11.3 Ferramentas; 11.4 Acessórios; 11.5 Operações.",
          "12. FURAÇÃO: 12.1 Definição; 12.2 Tipos de furadeira; 12.3 Ferramentas; 12.4 Acessórios; 12.5 Parâmetros de corte; 12.6 Operações.",
          "13. ROSQUEAMENTO: 13.1 Definição; 13.2 Ferramentas; 13.3 Acessórios; 13.4 Características; 13.5 Máquina; 13.6 Cálculos técnicos; 13.7 Operação.",
          "14. AJUSTAGEM: 14.1 Definição; 14.2 Ferramentas; 14.3 Acessórios; 14.4 Esmerilhamento; 14.5 Operações.",
          "15. CONTROLE DA QUALIDADE: 15.1 Inspeção visual; 15.2 Inspeção dimensional.",
          "16. REFRIGERAÇÃO: 16.1 Definição; 16.2 Fluidos de corte; 16.3 Procedimentos."
        ],
        schedule: FUSI_SCHEDULE_GEA
      }
    ]
  },
  {
    id: 'fusi-plan-default',
    courseName: 'Mecânico de Usinagem Convencional',
    profileId: 'default', // Perfil Padrão / Beretella
    units: [
      {
        id: 'fusi',
        name: 'Fundamentos da Usinagem (FUSI)',
        hours: 240,
        capacities: [
          "1. Selecionar ferramentas aplicadas na montagem e desmontagem de elementos de máquina.",
          "2. Relacionar os processos de fabricação à sua aplicação na indústria.",
          "3. Relacionar os tipos de manutenção à sua aplicação na indústria.",
          "4. Elaborar plano de trabalho de acordo com normas e procedimentos de meio ambiente, de saúde e segurança no trabalho.",
          "5. Definir os parâmetros de usinagem de torneamento e fresagem convencional de acordo com as especificações técnicas.",
          "6. Realizar operações de baixa complexidade em torno convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.",
          "7. Realizar operações de baixa complexidade em fresadora convencional de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.",
          "8. Realizar operações de furação de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.",
          "9. Realizar operações de rosqueamento de acordo com as especificações, normas técnicas e de saúde e segurança no trabalho.",
          "10. Realizar operações de ajustagem em peças por meio de ferramentas manuais de acordo com as especificações e normas técnicas e de saúde e segurança no trabalho.",
          "11. Controlar a qualidade das peças usinadas em tornos e fresadoras convencionais, visualmente e por meio de instrumentos de acordo com as especificações técnicas.",
          "12. Aplicar os procedimentos de refrigeração nos processos de torneamento e fresagem convencional."
        ],
        knowledges: [
          "1. ELEMENTOS DE MÁQUINA; 2. FERRAMENTAS; 3. PROCESSOS DE FABRICAÇÃO; 4. MANUTENÇÃO; 5. PLANO DE TRABALHO; 6. SEGURANÇA; 7. MEIO AMBIENTE; 8. PARÂMETROS DE CORTE; 9. PARÂMETROS DE FERRAMENTA; 10. TORNEAMENTO; 11. FRESAGEM; 12. FURAÇÃO; 13. ROSQUEAMENTO; 14. AJUSTAGEM; 15. CONTROLE DA QUALIDADE; 16. REFRIGERAÇÃO."
        ],
        schedule: FUSI_SCHEDULE // Usa o array de 36 aulas padrão do Beretella
      }
    ]
  }
];
