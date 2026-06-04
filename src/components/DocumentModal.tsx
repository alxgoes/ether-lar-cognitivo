import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface DocumentModalProps {
  documentId: 'privacidade' | 'termos' | 'compliance' | null;
  onClose: () => void;
}

export function DocumentModal({ documentId, onClose }: DocumentModalProps) {
  useEffect(() => {
    if (documentId) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [documentId]);

  let title = '';
  let content = null;

  if (documentId === 'privacidade') {
    title = 'POLÍTICA DE PRIVACIDADE E SOBERANIA DE DADOS';
    content = (
      <>
        <p className="subtitle">ETHER AI — ECOSSISTEMAS RESIDENCIAIS AUTÔNOMOS<br/>Última atualização: Junho de 2026.</p>
        <p>Bem-vindo à ETHER AI (etherai.com.br). Para nós, a privacidade não é um termo de conformidade jurídica ou uma configuração opcional; ela é o alicerce fundamental da nossa engenharia e o primeiro pilar da sua soberania residencial.</p>
        <p>Esta Política de Privacidade descreve, de forma transparente, analítica e em estrita conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD), como tratamos as informações coletadas em nossa plataforma digital e reitera a total independência e blindagem dos dados gerados dentro do seu lar.</p>

        <h3>1. DA DISTINÇÃO FUNDAMENTAL: WEBSITE vs. ECOSSISTEMA LOCAL</h3>
        <p>Para fins de clareza jurídica e técnica, dividimos o tratamento de dados em dois escopos completamente distintos:</p>
        <ul>
          <li><strong>Ambiente Digital (Website):</strong> Coleta restrita de informações de contato e navegação, estritamente necessárias para o agendamento de demonstrações privadas e análise de tráfego básico. Neste escopo, a ETHER AI atua como Controladora dos dados.</li>
          <li><strong>Ambiente Físico (Sua Residência):</strong> Todo e qualquer dado biométrico, rotina de convivência, padrões ambientais, gravações de sensores locais ou comandos analíticos gerados dentro do ecossistema ETHER são processados e armazenados exclusivamente in loco, em hardware criptografado e offline. A ETHER AI não possui acesso, não coleta e não armazena em servidores de nuvem as informações do seu lar. Você é o titular e o único controlador de sua própria fortaleza cognitiva.</li>
        </ul>

        <h3>2. DADOS COLETADOS NO WEBSITE E SUAS FINALIDADES</h3>
        <p>Quando você interage com o portal etherai.com.br para solicitar uma demonstração privada ou manifestar interesse em nossos ecossistemas, coletamos apenas os dados essenciais para o atendimento high-ticket:</p>
        <ul>
          <li><strong>Dados de Identificação e Contato:</strong> Nome completo, e-mail institucional ou pessoal, telefone de contato (WhatsApp) e cidade/região de interesse.<br/>
          <em>Finalidade:</em> Autenticar a legitimidade do contato, realizar a triagem de elegibilidade e coordenar o atendimento por nossa equipe de engenharia e relacionamento tático.<br/>
          <em>Base Legal (LGPD):</em> Consentimento do titular (Art. 7º, I) e procedimentos preliminares estritamente vinculados a contratos (Art. 7º, V).</li>
          <li><strong>Dados de Navegação (Cookies e Metadados):</strong> Endereço IP, tipo de navegador, registros de data/hora de acesso e comportamento de navegação nas páginas do site.<br/>
          <em>Finalidade:</em> Otimização da interface, segurança cibernética contra ataques estruturados e análise estatística de interesse.<br/>
          <em>Base Legal (LGPD):</em> Legítimo interesse do controlador (Art. 7º, IX).</li>
        </ul>

        <h3>3. DA RETENÇÃO E DA NÃO-RELAÇÃO COM BIG TECHS (NÃO COMPARTILHAMENTO)</h3>
        <p>A ETHER AI opera sob a premissa do minimalismo de dados. Seus dados de contato fornecidos no site permanecerão arquivados apenas pelo período estritamente necessário para cumprir as finalidades comerciais e de relacionamento, ou até que você solicite a revogação do consentimento.</p>
        <ul>
          <li><strong>Compartilhamento Zero:</strong> Nós não comercializamos, compartilhamos ou transferimos seus dados pessoais para terceiros, corretoras de dados ou agências de publicidade.</li>
          <li><strong>Independência das Big Techs:</strong> Ao contrário dos sistemas de automação comerciais e vulneráveis do mercado tradicional, nossos sistemas não se alimentam de APIs de monitoramento comportamental de gigantes de tecnologia.</li>
        </ul>

        <h3>4. DIREITOS DO TITULAR DOS DADOS (ARTIGO 18 DA LGPD)</h3>
        <p>Em respeito à sua soberania informacional, a ETHER AI assegura a você, a qualquer momento e mediante requisição direta, o pleno exercício dos seus direitos previstos no Art. 18 da LGPD, incluindo:</p>
        <ul>
          <li><strong>Confirmação e Acesso:</strong> Confirmação da existência de tratamento e acesso imediato aos dados que possuímos sobre você.</li>
          <li><strong>Correção:</strong> Retificação de dados incompletos, inexatos ou desatualizados.</li>
          <li><strong>Eliminação e Revogação:</strong> Exclusão definitiva dos dados pessoais tratados com base no seu consentimento, bem como a revogação do mesmo para contatos futuros.</li>
          <li><strong>Portabilidade:</strong> Transferência dos seus dados de cadastro a outro prestador de serviço, mediante requisição expressa, resguardados os segredos comerciais da nossa engenharia.</li>
        </ul>
        <p>Para exercer qualquer um desses direitos, você pode acionar diretamente o nosso Encarregado de Proteção de Dados (DPO) através do canal exclusivo: dpo@etherai.com.br.</p>

        <h3>5. SEGURANÇA E INTEGRIDADE DO AMBIENTE DIGITAL</h3>
        <p>Implementamos os mais rígidos padrões internacionais de segurança da informação no site etherai.com.br, incluindo criptografia de ponta a ponta (SSL/TLS), firewalls de aplicação avançados e monitoramento ativo contra vulnerabilidades. (Para compreender a blindagem física e estrutural offline das nossas residências, consulte o nosso documento oficial de Segurança).</p>

        <h3>6. ALTERAÇÕES NESTA POLÍTICA</h3>
        <p>Como nossa engenharia está em constante evolução tática, esta política poderá ser atualizada para refletir melhorias de segurança ou adequações legislativas. Sempre que houver uma alteração material, a nova versão será publicada neste endereço com a data correspondente.</p>
        <p>Ao continuar navegando ou preenchendo nossos formulários de qualificação, você declara estar ciente dos termos desta política, escolhendo o caminho da Privacidade Soberana.</p>
        <p className="signature">ETHER AI</p>
      </>
    );
  } else if (documentId === 'termos') {
    title = 'TERMOS DE USO E CONDIÇÕES DE ACESSO';
    content = (
      <>
        <p className="subtitle">ETHER AI — ECOSSISTEMAS RESIDENCIAIS AUTÔNOMOS<br/>Última atualização: Junho de 2026.</p>
        <p>O acesso e a interação com o ecossistema digital da ETHER AI (disponível através do endereço etherai.com.br) são regidos por estes Termos de Uso e Condições de Acesso. Ao navegar por este portal, solicitar uma demonstração privada ou interagir com nossos canais de atendimento, você concorda, de forma integral e irrestrita, com as cláusulas aqui estabelecidas.</p>
        <p>Se você não concorda com qualquer disposição deste documento, orientamos que interrompa imediatamente a navegação.</p>

        <h3>1. DO OBJETO E DA ELEGIBILIDADE DE ACESSO</h3>
        <p>O portal etherai.com.br é uma plataforma de posicionamento institucional, triagem e qualificação de clientes interessados na implementação de ecossistemas residenciais offline de alto padrão.</p>
        <ul>
          <li><strong>Critério de Exclusividade (Screening):</strong> Devido à natureza high-ticket e artesanal da nossa engenharia, o preenchimento de formulários de contato não garante o agendamento de uma demonstração privada. A ETHER AI se reserva o direito discricionário de selecionar e homologar as solicitações com base em critérios internos de viabilidade técnica, arquitetônica e comercial.</li>
          <li><strong>Capacidade Civil:</strong> O usuário declara possuir capacidade civil plena (maior de 18 anos ou emancipado) para fornecer dados de contato válidos e anuir com os presentes termos.</li>
        </ul>

        <h3>2. DA PROPRIEDADE INTELECTUAL E DIREITOS AUTORAIS</h3>
        <p>Todo o conteúdo material e imaterial exibido neste website — incluindo, mas não se limitando a: textos, slogans, manifestos de marca, designs de interface, códigos-fonte, logotipos (incluindo a identidade visual do Eclipse e a marca ETHER AI), vídeos explicativos (como maquetes táticas e teasers cinematográficos) e arquitetura de informação — é de propriedade exclusiva da ETHER AI ou de seus licenciantes, protegido pelas leis nacionais e internacionais de Propriedade Intelectual (Lei nº 9.609/98 e Lei nº 9.610/98).</p>
        <ul>
          <li><strong>Vedação de Cópia ou Engenharia Reversa:</strong> É expressamente proibida a reprodução, duplicação, modificação, distribuição, "framing", extração de dados (data scraping) ou engenharia reversa de qualquer elemento estrutural ou de copywriting deste site para fins comerciais, associativos ou de concorrência de mercado, sob pena de responsabilização civil e criminal.</li>
        </ul>

        <h3>3. DA LIMITAÇÃO DE RESPONSABILIDADE (BLINDAGEM JURÍDICA)</h3>
        <p>A ETHER AI preza pela perfeição técnica, contudo, a navegação em ambiente digital externo possui variáveis alheias ao nosso controle absoluto. Portanto, aplicam-se as seguintes regras de exclusão de responsabilidade:</p>
        <ul>
          <li><strong>Indisponibilidade do Site:</strong> Nós não nos responsabilizamos por instabilidades temporárias, interrupções de acesso, ataques de negação de serviço (DDoS) ou falhas no servidor de hospedagem do site que possam impedir a navegação do usuário.</li>
          <li><strong>Inviolabilidade do Ecossistema Local vs. Redes Externas:</strong> A engenharia residencial física da ETHER AI baseia-se na Autonomia Cognitiva e Segurança Tática Offline. Por consequência, a ETHER AI exime-se de qualquer responsabilidade legal por danos, invasões, interceptações ou falhas de segurança decorrentes de falhas nas provedoras de internet do cliente, modems externos não homologados, quedas na rede elétrica pública ou vulnerabilidades existentes em dispositivos móveis pessoais (smartphones e tablets) de propriedade do usuário.</li>
          <li><strong>Links de Terceiros:</strong> Eventuais links para plataformas externas (como players de vídeo ou portfólios de arquitetura) são fornecidos puramente para conveniência. Não endossamos, controlamos ou assumimos responsabilidade pelo conteúdo ou políticas dessas páginas externas.</li>
        </ul>

        <h3>4. DAS CONDUTAS PROIBIDAS NO PORTAL</h3>
        <p>Ao utilizar nosso ambiente digital, o usuário compromete-se a abster-se de:</p>
        <ul>
          <li>Inserir informações falsas, incompletas ou de terceiros sem autorização expressa nos formulários de qualificação.</li>
          <li>Utilizar ferramentas automatizadas (robôs, spiders, scripts) para coletar dados ou tentar violar as defesas de segurança cibernética do site.</li>
          <li>Praticar qualquer ato que possa denegrir a reputação da marca ou causar danos à infraestrutura tecnológica da ETHER AI.</li>
        </ul>
        <p>A violação de qualquer uma dessas condutas ensejará o bloqueio imediato do IP do usuário e a adoção das medidas judiciais cabíveis.</p>

        <h3>5. MODIFICAÇÕES UNILATERAIS DOS TERMOS</h3>
        <p>A ETHER AI, em busca de constante evolução e proteção de sua marca, poderá revisar e alterar estes Termos de Uso a qualquer momento, sem aviso prévio. A nova versão passará a vigorar imediatamente após sua publicação no rodapé deste site. Recomendamos a consulta periódica deste documento.</p>

        <h3>6. FORO DE ELEIÇÃO</h3>
        <p>Estes Termos de Uso são regidos e interpretados em conformidade com as leis da República Federativa do Brasil. Para dirimir quaisquer controvérsias ou litígios decorrentes do acesso a este portal ou da interpretação destes termos, as partes elegem, com exclusão de qualquer outro por mais privilegiado que seja, o Foro da Comarca de domicílio da sede da ETHER AI.</p>
        <p className="signature">ETHER AI</p>
      </>
    );
  } else if (documentId === 'compliance') {
    title = 'COMPLIANCE & LGPD';
    content = (
      <>
        <p className="subtitle">DECLARAÇÃO DE CONFORMIDADE ESTRUTURAL E GOVERNANÇA DE DADOS<br/>ETHER TECHNOLOGIES — COMPLIANCE RIGOROSO & DIRETRIZES DA LGPD<br/>Última atualização: Junho de 2026.</p>
        <p>Na era da vigilância digital, a conformidade jurídica não pode ser uma mera camada superficial de termos de uso; ela deve estar enraizada na arquitetura do código e do hardware. Grandes corporações expõem seus clientes ao centralizarem bancos de dados em nuvem, transformando informações privadas em ativos vulneráveis a incidentes de segurança.</p>
        <p>A Ether Technologies (Ether AI) adota uma postura de vanguarda jurídica e técnica. Sob as diretrizes da Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD), estruturamos nossa governança sob o princípio da Soberania Informacional Definitiva, garantindo a impossibilidade técnica e jurídica de vazamento de dados residenciais partindo da nossa organização.</p>

        <h3>1. AUSÊNCIA DE CUSTÓDIA E O PRINCÍPIO DA MINIMIZAÇÃO (ART. 6º, III, LGPD)</h3>
        <p>A base do nosso programa de compliance baseia-se em uma premissa matemática simples: o risco de vazamento corporativo é zero porque a custódia de dados é zero.</p>
        <ul>
          <li><strong>Minimização Absoluta:</strong> Em estrita observância ao Art. 6º, inciso III da LGPD, a Ether Technologies aplica o princípio da necessidade e suficiência. Nós não coletamos, não transmitimos e não armazenamos em servidores centrais qualquer dado biométrico, comportamental, analítico ou de rotina gerado dentro das propriedades homologadas.</li>
          <li><strong>Inexistência de Repositório Central:</strong> Por não haver centralização de dados de usuários em infraestruturas de nuvem sob nossa posse, nossa empresa elimina o risco de ataques cibernéticos em massa (data breaches). Se a infraestrutura corporativa da Ether Technologies for alvo de um ataque de negação de serviço ou intrusão, o ecossistema do seu lar permanecerá absolutamente intocado, invisível e inacessível.</li>
        </ul>

        <h3>2. ARQUITETURA PRIVACY BY DESIGN E BY DEFAULT (ART. 46, LGPD)</h3>
        <p>O Artigo 46 da LGPD exige que os agentes de tratamento adotem medidas de segurança, técnicas e administrativas aptas a proteger os dados pessoais. A Ether Technologies eleva essa exigência ao nível de engenharia física local:</p>
        <ul>
          <li><strong>Processamento Core Local:</strong> Toda a inteligência artificial, processamento de contexto e armazenamento criptografado ocorrem de forma descentralizada, dentro de um hardware industrial exclusivo instalado no perímetro físico da sua propriedade.</li>
          <li><strong>Corte de Telemetria Externa:</strong> O sistema foi projetado para operar de forma autônoma e offline. Não existem pipelines de telemetria ou fluxos contínuos de envio de dados para a nossa sede. Uma vez concluída a implementação técnica, as chaves de criptografia são geradas in loco e entregues exclusivamente ao proprietário.</li>
        </ul>

        <h3>3. DEFINIÇÃO MATRICIAL DE PAPÉIS: O TITULAR COMO CONTROLADOR SOBERANO</h3>
        <p>Para fins de delimitação de responsabilidade civil e jurídica, a Ether Technologies estabelece critérios claros sobre as figuras de tratamento dispostas no Artigo 5º da LGPD:</p>
        <ul>
          <li><strong>O Cliente como Controlador Exclusivo (Art. 5º, VI):</strong> O proprietário do ecossistema detém o controle total e exclusivo sobre as decisões de tratamento de dados dentro do seu lar. A infraestrutura física pertence a você; logo, o gerenciamento de permissões, perfis e exclusão de históricos locais é uma prerrogativa sua.</li>
          <li><strong>A Ether Technologies como Desenvolvedora, Não Operadora:</strong> Nossa atuação restringe-se à engenharia, fabricação e licenciamento do software local. A Ether Technologies não atua como operadora ou controladora de fluxo contínuo de dados residenciais pós-instalação, pois não possui portas traseiras (backdoors) ou credenciais master de acesso remoto ao sistema.</li>
        </ul>

        <h3>4. GARANTIA JURÍDICA CONTRA MONETIZAÇÃO E COMPARTILHAMENTO DE TERCEIROS</h3>
        <p>A governança corporativa da Ether Technologies veda, de forma irrevogável e sob cláusulas de responsabilidade civil contratual, qualquer forma de compartilhamento, cessão, cruzamento ou comercialização de metadados com agências de publicidade, corretoras de dados ou provedores externos de Big Tech.</p>
        <p>Nossos ecossistemas ignoram as APIs de monitoramento mundanas para entregar o que a legislação exige e o mercado de alto padrão demanda: privacidade real, blindagem tática e conformidade inabalável.</p>
        <p className="signature">Ether Technologies</p>
      </>
    );
  }

  return (
    <AnimatePresence>
      {documentId && (
        <motion.div
          data-drag-zone="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9000,
            background: 'rgba(0,0,0,0.95)',
            backdropFilter: 'blur(24px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.9 }}
            style={{
              position: 'absolute', top: '2rem', right: '2rem',
              width: '48px', height: '48px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              transition: 'background 0.2s',
              zIndex: 10
            }}
          >
            <X size={24} />
          </motion.button>
          
          <motion.div 
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="document-modal-content custom-scrollbar"
            style={{ 
              maxWidth: '800px', width: '100%', maxHeight: '80vh', margin: 'auto',
              background: 'linear-gradient(145deg, rgba(30,30,30,0.8), rgba(15,15,15,0.9))',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '24px',
              padding: '3rem',
              overflowY: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '2rem', color: '#fff' }}>
              {title}
            </h2>
            
            <div style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontSize: '0.95rem' }}>
              {content}
            </div>
            
            <style>{`
              .document-modal-content h3 {
                color: #60a5fa;
                font-size: 1.1rem;
                margin-top: 2rem;
                margin-bottom: 0.75rem;
                font-weight: 700;
              }
              .document-modal-content p {
                margin-bottom: 1rem;
              }
              .document-modal-content ul {
                padding-left: 1.5rem;
                margin-bottom: 1.5rem;
              }
              .document-modal-content li {
                margin-bottom: 0.5rem;
              }
              .document-modal-content .subtitle {
                font-size: 0.85rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                color: rgba(255,255,255,0.4);
                margin-bottom: 2rem;
                border-bottom: 1px solid rgba(255,255,255,0.1);
                padding-bottom: 1rem;
              }
              .document-modal-content .signature {
                margin-top: 3rem;
                font-weight: 700;
                color: #fff;
                font-size: 1.2rem;
              }
            `}</style>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
