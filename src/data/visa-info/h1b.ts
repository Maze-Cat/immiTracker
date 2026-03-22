import type { BilingualVisaInfo } from '@/types/visa-info';

const h1b: BilingualVisaInfo = {
  en: {
    slug: 'h1b',
    title: 'H-1B Specialty Occupation Visa',
    subtitle: 'Work visa for professionals in specialty occupations requiring at least a bachelor\'s degree',
    overview:
      'The H-1B visa allows US employers to temporarily employ foreign workers in specialty occupations — roles that require at least a bachelor\'s degree (or equivalent) in a specific field. The H-1B is subject to an annual cap of 65,000 visas, plus 20,000 additional visas for US master\'s degree holders. Due to high demand, USCIS conducts a random lottery each spring to select petitions for processing. The initial H-1B period is typically 3 years, extendable to 6 years and beyond for those on an employment-based green card path.',
    eligibility: [
      {
        requirement: 'Specialty occupation role',
        details: 'The job must require at least a bachelor\'s degree or equivalent in a specific field. Common qualifying fields include IT, engineering, finance, medicine, architecture, and accounting.',
      },
      {
        requirement: 'Qualifying degree or equivalent',
        details: 'You must hold at least a US bachelor\'s degree (or foreign equivalent) in a field directly related to the specialty occupation. Work experience may substitute for a degree in some cases.',
      },
      {
        requirement: 'Employer sponsorship',
        details: 'A US employer must file the petition on your behalf. Individuals cannot self-petition for H-1B.',
      },
      {
        requirement: 'Labor Condition Application (LCA) approval',
        details: 'The employer must obtain a certified LCA from the Department of Labor, attesting to prevailing wage compliance and working conditions.',
      },
      {
        requirement: 'Cap registration or cap exemption',
        details: 'Most petitions are subject to the annual cap and must be selected in the USCIS lottery. Cap-exempt employers include universities, nonprofits affiliated with universities, and government research organizations.',
      },
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: 'Employer files USCIS registration (March lottery)',
        description: 'Each year in March, employers register their intended H-1B beneficiaries in the USCIS online lottery system. The registration fee is $215 per beneficiary.',
        estimatedTime: 'March 1–20 (registration window)',
      },
      {
        stepNumber: 2,
        title: 'USCIS conducts lottery selection',
        description: 'USCIS randomly selects registrations from the regular cap pool (65,000) and the US master\'s cap pool (20,000). Results are typically announced in late March.',
        estimatedTime: 'Late March',
      },
      {
        stepNumber: 3,
        title: 'Employer files LCA with DOL',
        description: 'If selected, the employer must obtain a certified Labor Condition Application from the Department of Labor. The LCA certifies prevailing wage and working conditions.',
        estimatedTime: '7 business days (standard processing)',
      },
      {
        stepNumber: 4,
        title: 'Employer files Form I-129 petition',
        description: 'The employer files Form I-129 (Petition for Nonimmigrant Worker) with USCIS, along with supporting documents such as the LCA, degree credentials, and job description. Premium processing (15 business days) is available for an additional fee.',
        estimatedTime: '2–6 months (standard), 15 business days (premium)',
      },
      {
        stepNumber: 5,
        title: 'Visa stamping (if outside the US)',
        description: 'If you are outside the US, you must apply for an H-1B visa stamp at a US consulate. If you are already in the US in valid H-1B status, you may not need to leave.',
        estimatedTime: '1–8 weeks (varies by consulate)',
      },
      {
        stepNumber: 6,
        title: 'Begin employment',
        description: 'H-1B employment can begin on October 1 of the fiscal year for cap-subject cases. Cap-exempt approvals take effect upon USCIS approval.',
        estimatedTime: 'October 1 (cap-subject)',
      },
    ],
    timeline: 'The H-1B lottery runs in March each year, with employment beginning October 1. The full cycle from registration to start date is about 6 months. Plan well ahead of your OPT or other status expiry.',
    faqs: [
      {
        question: 'What happens if I am not selected in the lottery?',
        answer: 'You must wait until the next lottery cycle the following year. In the meantime, you may remain on OPT (including STEM extension if eligible), seek a cap-exempt employer, or explore other visa options like O-1 or TN.',
      },
      {
        question: 'Can I change employers on H-1B?',
        answer: 'Yes. Under H-1B portability rules, you may start working for a new employer once they file an I-129 petition on your behalf, even before it is approved, as long as you have been in valid H-1B status for at least 180 days.',
      },
      {
        question: 'How long can I stay on H-1B?',
        answer: 'The initial period is 3 years, extendable to 6 years. If you have an approved I-140 (employment-based green card petition) or are in the final stages of adjustment, you may extend beyond 6 years in 1- or 3-year increments.',
      },
      {
        question: 'Can my spouse work in the US on an H-4 visa?',
        answer: 'H-4 dependent spouses may apply for an H-4 EAD (Employment Authorization Document) if the H-1B holder has an approved I-140 petition or has been granted H-1B extensions beyond the initial 6-year limit.',
      },
      {
        question: 'Can I be self-employed on H-1B?',
        answer: 'Generally no. H-1B requires an employer-employee relationship. However, you may be a majority owner of a company and have that company petition for your H-1B if a genuine employer-employee relationship can be established.',
      },
      {
        question: 'What is the prevailing wage requirement?',
        answer: 'Your employer must pay you at least the prevailing wage for your occupation and geographic area, or the actual wage paid to similarly situated employees, whichever is higher. This is certified in the LCA.',
      },
      {
        question: 'Does the H-1B allow dual intent?',
        answer: 'Yes. Unlike many temporary visas, H-1B holders may simultaneously pursue permanent residence (green card) without jeopardising their nonimmigrant status.',
      },
    ],
  },

  zh: {
    slug: 'h1b',
    title: 'H-1B专业技术工作签证',
    subtitle: '适用于从事至少需要学士学位的专业技术职位的工作签证',
    overview:
      'H-1B签证允许美国雇主临时雇用从事"专业职业"的外国员工——即需要在特定领域拥有至少学士学位（或同等学历）的工作岗位。H-1B每年有65,000个名额上限，另外额外提供20,000个名额给持有美国硕士学位的申请者。由于需求远超供给，USCIS每年春季通过随机抽签决定受理名额。初始H-1B有效期通常为3年，可延期至6年，正在申请绿卡者还可进一步延长。',
    eligibility: [
      {
        requirement: '职位属于专业技术职业',
        details: '工作岗位必须要求申请者在特定领域拥有至少学士学位或同等学历。常见合格领域包括信息技术、工程、金融、医学、建筑和会计等。',
      },
      {
        requirement: '持有合格学位或同等学历',
        details: '您必须持有与专业职位直接相关的美国学士学位（或外国同等学历）。在某些情况下，相关工作经验可折算为学历。',
      },
      {
        requirement: '需要雇主担保',
        details: '必须由美国雇主代为提交申请。个人无法自行为自己申请H-1B签证。',
      },
      {
        requirement: '获得劳工条件申请（LCA）批准',
        details: '雇主必须向美国劳工部申请并获得经认证的LCA，证明其提供符合当地标准的薪资和工作条件。',
      },
      {
        requirement: '需参与名额抽签或符合豁免条件',
        details: '大多数申请须参加USCIS年度抽签。高校、与高校附属的非营利组织及政府研究机构的雇主申请无需参与抽签（名额豁免）。',
      },
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: '雇主参与USCIS注册（三月抽签）',
        description: '每年三月，雇主须在USCIS在线系统中为拟申请的H-1B受益人登记注册。每名受益人的注册费为215美元。',
        estimatedTime: '每年3月1日–20日（注册窗口期）',
      },
      {
        stepNumber: 2,
        title: 'USCIS进行抽签选拔',
        description: 'USCIS从普通名额池（65,000个）和美国硕士学位名额池（20,000个）中随机抽取注册申请。结果通常在三月底公布。',
        estimatedTime: '三月底',
      },
      {
        stepNumber: 3,
        title: '雇主向劳工部申请LCA',
        description: '如果被抽中，雇主须向劳工部申请经认证的劳工条件申请（LCA），证明薪资符合当地标准且工作条件合规。',
        estimatedTime: '7个工作日（标准处理）',
      },
      {
        stepNumber: 4,
        title: '雇主向USCIS提交I-129请愿书',
        description: '雇主提交I-129表格（非移民工人请愿书），并附上LCA、学历证明和岗位说明等支持材料。可选加急处理（额外收费），承诺15个工作日内完成。',
        estimatedTime: '标准处理2–6个月；加急处理15个工作日',
      },
      {
        stepNumber: 5,
        title: '在领事馆办理签证贴签（如在境外）',
        description: '如果您在美国境外，须前往美国驻外领事馆申请H-1B签证贴签。已在美国境内持合法H-1B身份者通常无需出境。',
        estimatedTime: '因领事馆而异，约1–8周',
      },
      {
        stepNumber: 6,
        title: '开始工作',
        description: '受名额限制的H-1B申请最早可于财政年度的10月1日开始工作。不受名额限制的申请在USCIS批准后即可生效。',
        estimatedTime: '10月1日（受名额限制申请）',
      },
    ],
    timeline: 'H-1B抽签每年三月开放注册，工作最早可于同年10月1日开始。从注册到正式入职约需6个月。建议提前规划，避免OPT或其他身份到期前出现空档。',
    faqs: [
      {
        question: '抽签未中签怎么办？',
        answer: '需等待下一年度的抽签。在此期间，您可以继续持OPT（符合条件者可申请STEM延期）、寻找不受名额限制的雇主，或考虑O-1、TN等其他签证类型。',
      },
      {
        question: 'H-1B期间可以换工作吗？',
        answer: '可以。根据H-1B身份可携带规则，新雇主提交I-129请愿书后您即可开始为其工作（即使尚未批准），前提是您已持有合法H-1B身份至少180天。',
      },
      {
        question: 'H-1B可以待多久？',
        answer: '初始有效期为3年，最多可延期至6年。如您已获批I-140（职业移民绿卡请愿书）或身处绿卡申请末期，可以以1年或3年为单位继续延期，不受6年总上限约束。',
      },
      {
        question: '配偶可以在美国工作吗？',
        answer: '如果H-1B持有人已获批I-140或已超过6年上限并在延期中，其H-4签证配偶可申请H-4 EAD（就业授权文件）以在美国合法工作。',
      },
      {
        question: '持H-1B可以自雇吗？',
        answer: '一般不可以。H-1B要求存在雇主与员工之间的雇用关系。但在特定条件下，如果可以证明真实的雇用关系，您可以以多数股东身份控股公司，并由该公司为您申请H-1B。',
      },
      {
        question: '什么是当地通行工资要求？',
        answer: '雇主必须向您支付不低于当地同类职位通行工资的薪酬，或不低于公司内同等职位其他员工的实际薪酬，以较高者为准。这一要求须在LCA中作出承诺。',
      },
      {
        question: 'H-1B允许"双重意图"吗？',
        answer: '是的。与许多临时签证不同，H-1B持有人可以在保持非移民身份的同时申请永久居留权（绿卡），这不会影响其非移民身份的合法性。',
      },
    ],
  },
};

export default h1b;
