import type { BilingualVisaInfo } from '@/types/visa-info';

const l1: BilingualVisaInfo = {
  en: {
    slug: 'l1',
    title: 'L-1 Intracompany Transferee Visa',
    subtitle: 'Work visa for managers, executives, and specialized knowledge employees transferred within a multinational company',
    overview:
      'The L-1 visa allows multinational companies to transfer employees from a foreign affiliate, subsidiary, or parent to a US office. There are two subtypes: L-1A for managers and executives (valid up to 7 years), and L-1B for employees with specialized knowledge (valid up to 5 years). Unlike the H-1B, the L-1 has no annual cap and no lottery, making it a valuable alternative for qualifying companies and employees. It also supports dual intent, allowing holders to pursue a green card simultaneously.',
    eligibility: [
      {
        requirement: 'Qualifying relationship between foreign and US employer',
        details: 'The foreign company and US company must have a qualifying relationship: parent, subsidiary, affiliate, or branch. Both entities must be actively doing business.',
      },
      {
        requirement: 'L-1A: Managerial or executive role',
        details: 'You must have worked in a managerial or executive capacity abroad for at least 1 continuous year within the past 3 years, and the US position must also be managerial or executive.',
      },
      {
        requirement: 'L-1B: Specialized knowledge',
        details: 'You must possess advanced proprietary knowledge of the company\'s products, services, research, systems, or procedures, and have worked for the company abroad for at least 1 continuous year within the past 3 years.',
      },
      {
        requirement: '1-year foreign employment requirement',
        details: 'You must have been continuously employed by the qualifying organization abroad for at least 1 year within the 3 years immediately preceding the US admission.',
      },
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: 'Employer files Form I-129 with L supplement',
        description: 'The US employer files Form I-129 (Petition for Nonimmigrant Worker) with an L classification supplement. For new offices (operating less than 1 year), additional documentation is required.',
        estimatedTime: '2–4 months (standard), 15 business days (premium processing)',
      },
      {
        stepNumber: 2,
        title: 'USCIS adjudicates the petition',
        description: 'USCIS reviews the petition and supporting evidence of the qualifying relationship, your role, and your employment history. RFEs may be issued for L-1B cases requiring proof of specialized knowledge.',
        estimatedTime: '2–4 months standard; 15 business days premium',
      },
      {
        stepNumber: 3,
        title: 'Visa stamping (if outside the US)',
        description: 'If you are outside the US, apply for an L-1 visa stamp at a US consulate with your approved I-129 approval notice (I-797).',
        estimatedTime: '1–6 weeks depending on consulate',
      },
      {
        stepNumber: 4,
        title: 'Enter the US and begin work',
        description: 'Present your visa and I-797 at the port of entry. You may begin working for the US entity upon entry.',
        estimatedTime: 'Immediate upon approval and entry',
      },
    ],
    timeline: 'L-1 processing takes 2–4 months standard, or 15 business days with premium processing. Initial validity is typically 3 years (1 year for new offices), extendable to 7 years for L-1A and 5 years for L-1B.',
    faqs: [
      {
        question: 'Can I change employers on an L-1 visa?',
        answer: 'Generally no. The L-1 is employer-specific. If you change to a different company, you would need a new L-1 petition or a different visa category unless the new employer is a qualifying organization under the blanket L program.',
      },
      {
        question: 'What is a Blanket L petition?',
        answer: 'Large multinationals may file a Blanket L petition to streamline transfers. Individual employees can then apply for an L visa at a consulate without needing a separately approved I-129, as long as they qualify under the blanket.',
      },
      {
        question: 'Can the L-1A lead to a green card?',
        answer: 'Yes. L-1A holders can pursue an EB-1C (multinational manager/executive) green card, which skips the PERM labor certification step. This is one of the fastest employment-based green card paths.',
      },
      {
        question: 'Does my spouse have work authorization?',
        answer: 'Yes. L-2 dependent spouses automatically have work authorization based on their L-2 status, following a 2021 DHS rule change. An EAD card was previously required; now L-2 status itself serves as work authorization.',
      },
      {
        question: 'What counts as "specialized knowledge" for L-1B?',
        answer: 'Specialized knowledge means knowledge of the company\'s products, services, research, equipment, techniques, management, or its application in international markets, that is advanced and not generally known in the industry.',
      },
      {
        question: 'Can I apply for a green card while on L-1?',
        answer: 'Yes. The L-1 allows dual intent, so you can pursue an employment-based green card simultaneously without jeopardizing your L-1 status.',
      },
    ],
  },

  zh: {
    slug: 'l1',
    title: 'L-1跨国公司内部调任签证',
    subtitle: '适用于在跨国公司内部调任的管理人员、高管及专业技术人员',
    overview:
      'L-1签证允许跨国公司将员工从境外关联公司、子公司或母公司调任至美国办公室。分为两种子类型：L-1A适用于管理人员和高管（最长有效期7年），L-1B适用于具有专业知识的员工（最长有效期5年）。与H-1B不同，L-1无年度名额上限，也无需抽签，对符合条件的公司和员工而言是极具价值的选择。L-1同样支持"双重意图"，允许持有人同时申请绿卡。',
    eligibility: [
      {
        requirement: '境外与美国雇主之间存在合格关联关系',
        details: '境外公司与美国公司之间须存在合格关联关系：母公司、子公司、关联公司或分支机构。双方均须在正常经营中。',
      },
      {
        requirement: 'L-1A：管理或高管职务',
        details: '您须在过去3年内，以管理或高管身份在境外公司连续工作至少1年，且在美国的职位同样须为管理或高管职务。',
      },
      {
        requirement: 'L-1B：专业知识',
        details: '您须对公司的产品、服务、研究、系统或流程具有高级专属知识，并在过去3年内在境外公司连续工作至少1年。',
      },
      {
        requirement: '境外任职满1年',
        details: '在进入美国前的3年内，您须在符合条件的跨国组织境外机构连续工作至少1年。',
      },
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: '雇主提交I-129表格（附L类补充材料）',
        description: '美国雇主向USCIS提交I-129表格（非移民工人请愿书）及L类附加材料。若为成立不足1年的新办公室，需提交额外证明材料。',
        estimatedTime: '标准处理2–4个月；加急处理15个工作日',
      },
      {
        stepNumber: 2,
        title: 'USCIS审理请愿书',
        description: 'USCIS审核请愿书及关联关系、您的职务和工作经历等证明材料。L-1B案件可能会收到补充证据要求（RFE），要求提供专业知识证明。',
        estimatedTime: '标准处理2–4个月；加急处理15个工作日',
      },
      {
        stepNumber: 3,
        title: '申请签证贴签（如在境外）',
        description: '如您在美国境外，需持批准通知书（I-797）前往美国领事馆申请L-1签证贴签。',
        estimatedTime: '因领事馆而异，约1–6周',
      },
      {
        stepNumber: 4,
        title: '入境美国并开始工作',
        description: '在入境口岸出示签证和I-797。入境后即可为美国公司开始工作。',
        estimatedTime: '批准并入境后即时生效',
      },
    ],
    timeline: 'L-1标准处理需2–4个月，加急处理仅需15个工作日。初始有效期通常为3年（新办公室1年），L-1A最长可延期至7年，L-1B最长可延期至5年。',
    faqs: [
      {
        question: '持L-1签证可以换工作吗？',
        answer: '通常不可以。L-1签证与雇主绑定。更换公司则需要新的L-1请愿书或其他签证类别，除非新雇主符合"一揽子L"计划的要求。',
      },
      {
        question: '什么是一揽子L请愿？',
        answer: '大型跨国公司可申请一揽子L请愿，简化调任流程。符合资格的员工可直接在领事馆申请L签证，无需每次单独获批I-129。',
      },
      {
        question: 'L-1A可以申请绿卡吗？',
        answer: '可以。L-1A持有人可申请EB-1C（跨国公司高管/管理人员）绿卡，无需PERM劳工认证，是速度最快的职业移民绿卡途径之一。',
      },
      {
        question: '我的配偶可以在美国工作吗？',
        answer: '可以。根据2021年DHS规则变更，L-2随行配偶凭L-2身份本身即具有工作授权，无需再单独申请EAD工卡。',
      },
      {
        question: 'L-1B的"专业知识"如何认定？',
        answer: '专业知识是指对公司产品、服务、研究、设备、技术、管理方式或其国际市场应用具有高级且非业界普遍掌握的专属性了解。',
      },
      {
        question: '持L-1可以同时申请绿卡吗？',
        answer: '可以。L-1允许双重意图，持有人可同时申请职业移民绿卡，不会影响L-1身份的合法性。',
      },
    ],
  },
};

export default l1;
