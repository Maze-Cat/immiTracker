import type { BilingualVisaInfo } from '@/types/visa-info';

const h4: BilingualVisaInfo = {
  en: {
    slug: 'h4',
    title: 'H-4 Dependent Visa',
    subtitle: 'Dependent visa for spouses and unmarried children under 21 of H-1B holders',
    overview:
      'The H-4 visa is a dependent nonimmigrant visa available to the immediate family members — spouses and unmarried children under 21 — of H-1B, H-1B1, or H-3 visa holders. H-4 holders may live, study, and attend school in the United States. Importantly, eligible H-4 spouses of H-1B holders who are on an employment-based green card path may apply for an H-4 EAD (Employment Authorization Document), allowing them to work for any employer in the US.',
    eligibility: [
      {
        requirement: 'Qualifying relationship to an H-1B holder',
        details: 'You must be the spouse or an unmarried child under 21 of a principal H-1B, H-1B1, or H-3 visa holder.',
      },
      {
        requirement: 'Principal H-1B holder must be in valid status',
        details: 'The primary H-1B holder must maintain valid H-1B status throughout the H-4 beneficiary\'s stay in the US.',
      },
      {
        requirement: 'H-4 EAD: I-140 approval or H-1B extension beyond 6 years',
        details: 'To qualify for an H-4 EAD, the H-1B holder must either have an approved Form I-140 (employment-based immigrant petition) or have been granted an H-1B extension beyond the initial 6-year limit under AC21.',
      },
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: 'Apply for H-4 visa at a US consulate',
        description: 'If you are outside the US, schedule a visa interview at a US embassy or consulate. Bring your DS-160 form, the principal H-1B holder\'s approval notice (I-797), proof of relationship (marriage certificate or birth certificate), and other supporting documents.',
        estimatedTime: '1–8 weeks (varies by consulate)',
      },
      {
        stepNumber: 2,
        title: 'Enter the US in H-4 status',
        description: 'Upon entry, US Customs and Border Protection will admit you in H-4 status. Your I-94 will reflect the authorized period of stay, typically matching the principal H-1B holder\'s status.',
        estimatedTime: 'Upon arrival',
      },
      {
        stepNumber: 3,
        title: 'Apply for H-4 EAD (optional, if eligible)',
        description: 'If eligible, file Form I-765 with USCIS to obtain an H-4 EAD. This requires the I-797 showing the principal H-1B holder\'s I-140 approval or extended status beyond 6 years.',
        estimatedTime: '3–6 months for USCIS processing',
      },
      {
        stepNumber: 4,
        title: 'Study or work (after EAD receipt)',
        description: 'H-4 holders may study at any level without restriction. H-4 EAD holders may work for any employer without restriction on occupation or hours.',
        estimatedTime: 'Ongoing',
      },
    ],
    timeline: 'H-4 visa processing takes 1–8 weeks at a consulate. The H-4 EAD typically takes 3–6 months with USCIS. Plan ahead if the H-1B holder\'s status renewal is upcoming.',
    faqs: [
      {
        question: 'Can H-4 holders work in the US without an EAD?',
        answer: 'No. H-4 holders are not work-authorized by default. Only H-4 EAD holders may be employed in the US. H-4 holders may, however, study without restriction.',
      },
      {
        question: 'Who qualifies for an H-4 EAD?',
        answer: 'H-4 spouses (not children) may apply for an EAD if the principal H-1B holder has an approved I-140 petition or has been granted H-1B status beyond the 6-year maximum under the AC21 law.',
      },
      {
        question: 'Can I start my own business on H-4 EAD?',
        answer: 'Yes. An H-4 EAD grants open work authorization, meaning you can work for any employer, start your own company, or be self-employed — with no restrictions on occupation.',
      },
      {
        question: 'What happens to my H-4 status if we divorce?',
        answer: 'H-4 status is tied to the principal H-1B holder. If you divorce, you lose the basis for H-4 status and must either leave the US or immediately apply for a different immigration status.',
      },
      {
        question: 'Can my child attend public school on H-4?',
        answer: 'Yes. H-4 children may attend public elementary and secondary school (K-12) without restriction. Higher education is also permitted.',
      },
      {
        question: 'How do I extend my H-4 status?',
        answer: 'H-4 status is typically extended concurrently with the principal H-1B holder\'s extension. Your employer\'s immigration attorney should include dependent H-4 holders in the same extension filing (Form I-539 or I-129 with derivatives).',
      },
    ],
  },

  zh: {
    slug: 'h4',
    title: 'H-4随行家属签证',
    subtitle: 'H-1B持有人的配偶及21岁以下未婚子女可申请的家属签证',
    overview:
      'H-4签证是专为H-1B、H-1B1或H-3签证持有人的直系家属（配偶及21岁以下未婚子女）提供的非移民家属签证。H-4持有人可在美国生活、学习及就读学校。此外，符合条件的H-1B配偶（H-1B持有人正在走职业移民绿卡流程）可申请H-4 EAD（就业授权文件），获批后即可在美国任何雇主处自由工作。',
    eligibility: [
      {
        requirement: '与H-1B持有人具有符合条件的亲属关系',
        details: '您必须是H-1B、H-1B1或H-3签证持有人的配偶，或其21岁以下未婚子女。',
      },
      {
        requirement: '主申请人H-1B持有人须保持有效身份',
        details: '在H-4受益人在美期间，H-1B主申请人必须始终保持有效的H-1B身份。',
      },
      {
        requirement: 'H-4 EAD条件：I-140已批准或H-1B已超过6年延期',
        details: '申请H-4 EAD须满足：H-1B持有人已获批I-140（职业移民请愿书），或根据AC21法案已获批超过6年上限的H-1B延期。',
      },
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: '在美国领事馆申请H-4签证',
        description: '如您在美国境外，请在美国大使馆或领事馆预约签证面谈。须携带DS-160表格、H-1B主申请人的批准通知（I-797）、亲属关系证明（结婚证或出生证）及其他支持材料。',
        estimatedTime: '因领事馆而异，约1–8周',
      },
      {
        stepNumber: 2,
        title: '以H-4身份入境美国',
        description: '入境时，美国海关与边境保护局将以H-4身份允许您入境。您的I-94将显示经批准的停留期限，通常与H-1B主申请人的身份有效期相同。',
        estimatedTime: '入境时即生效',
      },
      {
        stepNumber: 3,
        title: '申请H-4 EAD（可选，须符合条件）',
        description: '如符合条件，向USCIS提交I-765表格申请H-4 EAD。需附上证明H-1B持有人I-140已批准或已超6年延期的I-797。',
        estimatedTime: 'USCIS审理约需3–6个月',
      },
      {
        stepNumber: 4,
        title: '学习或工作（获得EAD后）',
        description: 'H-4持有人可在美国任何学校就读，无专业或级别限制。持H-4 EAD者可为任何雇主工作，不受职业类型或工时限制。',
        estimatedTime: '持续有效',
      },
    ],
    timeline: '领事馆H-4签证审理约需1至8周。USCIS审理H-4 EAD通常需要3至6个月。如H-1B主申请人的身份即将到期，请提前安排延期申请。',
    faqs: [
      {
        question: '没有EAD的H-4持有人可以在美工作吗？',
        answer: '不可以。H-4签证默认不包含工作授权。只有持有H-4 EAD者才可在美合法就业。但H-4持有人可以自由就读各级学校，无需额外许可。',
      },
      {
        question: '谁有资格申请H-4 EAD？',
        answer: 'H-4配偶（非子女）可以申请EAD，前提是H-1B主申请人已获批I-140，或根据AC21法案已获得超过6年的H-1B延期。',
      },
      {
        question: '持H-4 EAD可以创业吗？',
        answer: '可以。H-4 EAD属于开放性工作授权，持有人可以为任何雇主工作、创立自己的公司或自雇，不受职业类型限制。',
      },
      {
        question: '离婚后H-4身份会怎样？',
        answer: 'H-4身份依附于H-1B主申请人。一旦离婚，您将失去H-4身份的依据，须立即离境或申请其他移民身份。',
      },
      {
        question: 'H-4身份的子女可以上公立学校吗？',
        answer: '可以。H-4子女可在不受限制的情况下就读K-12公立学校，也可以就读大学及研究生院。',
      },
      {
        question: '如何延续H-4身份？',
        answer: 'H-4身份通常与H-1B主申请人的延期同步办理。雇主的移民律师应在H-1B延期申请（I-539或I-129附随申请）中一并包含家属的H-4延期。',
      },
    ],
  },
};

export default h4;
