import * as React from "react";
import {
  Collapsible,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { motion, AnimatePresence } from "framer-motion";


const faqs = [
  {
    question: "É possível modificar perguntas ou adicionar novas?",
    answer:
      "Atualmente, as perguntas são pré-definidas, mas ajustes podem ser solicitados ao time de desenvolvimento para atender demandas específicas.",
  },
  {
    question: "Como lidar com respostas contraditórias do cliente?",
    answer:
      "Oriente o cliente a revisar as respostas, buscando consistência e clareza, e registre quaisquer observações para análise detalhada posteriormente.",
  },
  {
    question:
      "O sistema permite acompanhar a evolução da empresa ao longo do tempo?",
    answer:
      "Não, mas temos uma instrução afim de solucionar essa necessidade, contacte ao time de desenvolvedores.",
  },
  {
    question: "Posso exportar os resultados para apresentar ao cliente?",
    answer:
      "Sim, o sistema oferece opções de exportação em formatos como PDF ou Excel, facilitando a elaboração de relatórios personalizados.",
  },
  {
    question: "Como garantir a segurança dos dados inseridos no sistema?",
    answer:
      "O sistema utiliza protocolos de segurança para proteger as informações, e o acesso é controlado por autenticação de usuários autorizados.",
  },
  {
    question:
      "É possível realizar a consultoria remotamente utilizando o sistema?",
    answer:
      "Sim, o sistema é acessível via navegador, permitindo a realização da consultoria presencialmente ou remotamente com o cliente.",
  },
  {
    question:
      "Como proceder se o cliente não souber responder alguma pergunta?",
    answer:
      "O consultor deve auxiliar explicando o contexto da pergunta, utilizando exemplos práticos ou sugerindo uma análise conjunta para encontrar a melhor resposta.",
  },
  {
    question:
      "Existe um limite de usuários que podem acessar o sistema simultaneamente?",
    answer:
      "A capacidade depende da configuração do servidor e plano contratado. Consulte o time técnico para informações específicas sobre limites.",
  },
  {
    question: "Como são atualizadas as perguntas e conteúdos do sistema?",
    answer:
      "As atualizações são realizadas periodicamente pela equipe de desenvolvimento, incorporando melhorias e novos conteúdos conforme necessidades identificadas.",
  },
  {
    question: "O sistema oferece sugestões automáticas de planos de ação?",
    answer:
      "Sim, com base nas respostas negativas, o sistema pode gerar sugestões iniciais de planos de ação para auxiliar o consultor.",
  },
  {
    question:
      "É possível personalizar o sistema para diferentes tipos de empresas ou setores?",
    answer:
      "Atualmente, o sistema é genérico, mas personalizações podem ser discutidas com a equipe de desenvolvimento conforme demanda.",
  },
  {
    question:
      "Como posso corrigir um erro caso tenha salvo uma resposta incorreta?",
    answer:
      "Basta navegar até a pergunta em questão e atualizar a resposta. O sistema salvará automaticamente a alteração.",
  },
  {
    question:
      "Os dados inseridos no sistema ficam armazenados localmente ou na nuvem?",
    answer:
      "Os dados são armazenados de forma segura na nuvem, garantindo acessibilidade e backup contínuo.",
  },
  {
    question: "O sistema possui suporte técnico para dúvidas ou problemas?",
    answer:
      "Sim, o time de suporte está disponível para auxiliar via canais definidos pela empresa, como e-mail ou chat interno.",
  },
  {
    question:
      "Posso integrar os dados do sistema com outras ferramentas da empresa?",
    answer:
      "Atualmente, existem APIs que permitem integração, dependendo da necessidade, é possível coordenar com o time técnico para essa funcionalidade.",
  },
];

export default function FaqCollapsible() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="w-full">
      <h2 className="text-center text-xl font-semibold mb-8 text-gray-700">
        Perguntas Frequentes do Consultor
      </h2>

      <div className="space-y-4">
        {faqs.map(({ question, answer }, idx) => {
          const isOpen = openIndex === idx;

          return (
            <Collapsible
              key={idx}
              open={isOpen}
              onOpenChange={() => setOpenIndex(isOpen ? null : idx)}
            >
              <CollapsibleTrigger
                className={`w-full flex justify-between items-center bg-gray-50 px-5 py-4 rounded-lg cursor-pointer transition 
                hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                  isOpen ? "font-semibold text-gray-900" : "font-medium text-gray-700"
                }`}
              >
                <span>{question}</span>
                <motion.svg
                  className="w-6 h-6 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </CollapsibleTrigger>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto", marginTop: 8 },
                      collapsed: { opacity: 0, height: 0, marginTop: 0 },
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden px-5 bg-white border border-t-0 rounded-b-lg text-gray-900"
                  >
                    <p className="py-4">{answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Collapsible>
          );
        })}
      </div>
    </div>
  );
}
